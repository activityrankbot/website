import { Mysql2Adapter } from '@lucia-auth/adapter-mysql';
import { createPool } from 'mysql2/promise';
import { Kysely, MysqlDialect } from 'kysely';
import type { DB } from '~/../db/database';

const pool = createPool({
  uri: ENV.DATABASE_URL,
  supportBigNumbers: true,
  bigNumberStrings: true,
});

export const db = new Kysely<DB>({
  dialect: new MysqlDialect({
    // `pool.pool` is required to convert the promise-based pool to the
    // callback format that Kysely requires.
    // Note that BOTH methods will work with TypeScript; forgetting
    // this step will raise runtime errors.
    pool: pool.pool,
  }),
});

const tableNames = { user: 'web_user', session: 'session' };
export const adapter = new Mysql2Adapter(pool, tableNames);
