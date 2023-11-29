import { PRIVATE_DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!PRIVATE_DB_URL) throw new Error('Missing env variable "DATABASE_URL"');

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(PRIVATE_DB_URL);
export const db = drizzle(client);
