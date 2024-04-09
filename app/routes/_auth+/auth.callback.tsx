import type { APIUser } from 'discord-api-types/v10';
import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { OAuth2RequestError } from 'arctic';
import { discord } from '~/lib/discord';
import { parseCookies } from 'oslo/cookie';
import { db } from '~/lib/db';
import { lucia } from '~/lib/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const code = params.get('code') ?? null;
  const errParam = params.get('error') ?? null;
  const state = params.get('state') ?? null;

  const storedState =
    parseCookies(request.headers.get('Cookie') ?? '').get(
      'discord_oauth_state',
    ) ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    console.log(code, state, storedState);
    throw json(`Failed to login [${errParam}]`, { status: 400 });
  }
  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch(
      'https://discord.com/api/v10/users/@me',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const discordUser: APIUser = await discordUserResponse.json();

    const existingUser = await db
      .selectFrom('web_user')
      .select('id')
      .where('id', '=', discordUser.id)
      .executeTakeFirst();

    if (existingUser) {
      // update icon URL
      await db
        .updateTable('web_user')
        .set({ avatar_hash: discordUser.avatar })
        .where('id', '=', existingUser.id)
        .executeTakeFirst();

      const session = await lucia.createSession(existingUser.id, {});
      return redirect('/', {
        headers: {
          'Set-Cookie': lucia.createSessionCookie(session.id).serialize(),
        },
      });
    }

    await db
      .insertInto('web_user')
      .values({
        id: discordUser.id,
        username: discordUser.username,
        avatar_hash: discordUser.avatar,
      })
      .executeTakeFirst();

    const session = await lucia.createSession(discordUser.id, {});
    return redirect('/', {
      headers: {
        'Set-Cookie': lucia.createSessionCookie(session.id).serialize(),
      },
    });
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === 'bad_verification_code'
    ) {
      // invalid code
      throw json(null, { status: 400 });
    }
    console.error('Internal server error on oauth cb', { error: e });
    throw json(null, { status: 500 });
  }
}
