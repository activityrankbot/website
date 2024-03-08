import { Lucia, type User } from 'lucia';
import { adapter } from './db';
import { parseCookies } from 'oslo/cookie';
import { json, redirect } from '@remix-run/node';
import type { DB } from '~/../db/database';

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: { secure: import.meta.env.PROD },
  },
  getUserAttributes: (attributes) => {
    return {
      discordId: attributes.discord_id,
      username: attributes.discord_username,
      iconURL: attributes.icon_hash
        ? `https://cdn.discordapp.com/avatars/${attributes.discord_id}/${attributes.icon_hash}.png`
        : '/img/default-user-icon.png',
    };
  },
});

export function getSessionId(request: Request) {
  const cookies = request.headers.get('cookie');
  return parseCookies(cookies ?? '').get(lucia.sessionCookieName);
}

export function destroySession() {
  const sessionCookie = lucia.createBlankSessionCookie();

  return redirect('/', {
    headers: { 'Set-Cookie': sessionCookie.serialize() },
  });
}

export async function requireUser(request: Request) {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    throw destroySession();
  }

  const result = await lucia.validateSession(sessionId);

  if (result.session && result.session.fresh) {
    const sessionCookie = lucia.createSessionCookie(result.session.id);

    throw redirect(request.url, {
      headers: { 'Set-Cookie': sessionCookie.serialize() },
    });
  }

  if (!result.session) {
    throw destroySession();
  }

  return result;
}

export async function requireGuest(request: Request) {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    return;
  }

  const result = await lucia.validateSession(sessionId);

  if (result.session) {
    throw redirect('/');
  }
}

export type PotentialUser = User | null;

export async function getPotentialUser(request: Request) {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);

  if (result.session && result.session.fresh) {
    const sessionCookie = lucia.createSessionCookie(result.session.id);

    throw redirect(request.url, {
      headers: { 'Set-Cookie': sessionCookie.serialize() },
    });
  }

  return result;
}

export async function logout(request: Request) {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    throw json(null, { status: 403 });
  }

  await lucia.invalidateSession(sessionId);

  return destroySession();
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DB['user'], 'id'>;
  }
}
