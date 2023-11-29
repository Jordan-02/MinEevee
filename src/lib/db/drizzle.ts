import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const url = import.meta.env.VITE_DB_URL;
console.log(url);
if (!url) throw new Error('Missing env variable "DATABASE_URL"');

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(url);
export const db = drizzle(client);
