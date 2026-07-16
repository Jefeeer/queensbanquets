/**
 * Shared Postgres client options for local Docker and Supabase.
 */
export function createPgClientOptions(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required.');
  }

  const options = { connectionString: databaseUrl };

  const forceSsl = process.env.DATABASE_SSL === 'true';
  const disableSsl = process.env.DATABASE_SSL === 'false';
  const isSupabase = /supabase\.(co|com)/i.test(databaseUrl);

  if (!disableSsl && (forceSsl || isSupabase)) {
    options.ssl = { rejectUnauthorized: false };
  }

  return options;
}
