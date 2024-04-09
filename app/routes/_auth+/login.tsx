/* import { redirect } from '@remix-run/node';
import { generateState } from 'arctic';
import { discord } from '~/lib/discord';
import { serializeCookie } from 'oslo/cookie'; */

import { Link } from '@remix-run/react';

/* export async function loader() {
  const state = generateState();
  const url = await discord.createAuthorizationURL(state, {
    scopes: ['identify'],
  });

  const cookie = serializeCookie('discord_oauth_state', state, {
    path: '/',
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return redirect(url.toString(), {
    headers: { 'Set-Cookie': cookie },
  });
} */

export default function TempPage() {
  return (
    <main className="grid h-screen w-full place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-lg text-slate-500">/login</span>
        <h1 className="bg-gradient-to-r from-fuchsia-300 to-violet-500 bg-clip-text text-3xl font-bold text-transparent">
          Coming soon...
        </h1>
        <span className="bg-gradient-to-l from-ar-light to-ar-dark bg-clip-text font-mono text-sm text-transparent">
          activityrank.me/dashboard
        </span>
        <Link
          to="/"
          className="mt-2 rounded px-4 py-2 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
