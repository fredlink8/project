import { createClient } from '@libsql/client';

const url = import.meta.env.VITE_DATABASE_URL;
const authToken = import.meta.env.VITE_DATABASE_AUTH_TOKEN;

if (!url) throw new Error('Database URL not found');
if (!authToken) throw new Error('Database auth token not found');

export const db = createClient({
  url,
  authToken,
});