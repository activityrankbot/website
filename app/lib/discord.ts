import { Discord } from 'arctic';

export const discord = new Discord(
  ENV.DISCORD_CLIENT_ID,
  ENV.DISCORD_CLIENT_SECRET,
  'http://localhost:5173/auth/callback',
);
