import { Discord } from 'arctic';

export const discord = new Discord(
  ENV.DISCORD_CLIENT_ID,
  ENV.DISCORD_CLIENT_SECRET,
  ENV.DISCORD_REDIRECT,
);
