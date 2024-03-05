import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import sqlite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import type { DB } from 'kysely-codegen';

const database = sqlite('main.db');

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({ database }),
});

export const adapter = new BetterSqlite3Adapter(database, {
  user: 'user',
  session: 'session',
});
