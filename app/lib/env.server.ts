import { z } from 'zod';

const envSchema = z.object({
  DISCORD_TOKEN: z.string().length(70),
  DISCORD_CLIENT_ID: z.string().min(17).max(20).regex(/^\d+$/),
  DISCORD_CLIENT_SECRET: z.string().length(32),
  DATABASE_URL: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

declare global {
  // eslint-disable-next-line no-var
  var ENV: Env;
  interface Window {
    ENV: Env;
  }
}

export function getEnv() {
  return envSchema.parse(process.env);
}
