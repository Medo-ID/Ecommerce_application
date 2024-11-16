import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.ENV === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV
});

console.log('database connected')