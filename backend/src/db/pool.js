import pg from 'pg';
import { getEnvironment } from '../config/environment.js';

let pool;

function shouldUseSsl(databaseUrl) {
  if (process.env.DATABASE_SSL === 'true') {
    return true;
  }

  if (process.env.DATABASE_SSL === 'false') {
    return false;
  }

  return /supabase\.(co|com)/i.test(databaseUrl);
}

export function getPool() {
  if (pool) {
    return pool;
  }

  const { databaseUrl } = getEnvironment();

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.');
  }

  const poolConfig = {
    connectionString: databaseUrl,
    max: 10,
  };

  // Supabase (and most cloud Postgres) requires TLS.
  if (shouldUseSsl(databaseUrl)) {
    poolConfig.ssl = { rejectUnauthorized: false };
  }

  pool = new pg.Pool(poolConfig);

  return pool;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}

export async function checkDatabaseConnection() {
  const dbPool = getPool();
  const result = await dbPool.query('SELECT 1 AS ok');
  return result.rows[0]?.ok === 1;
}
