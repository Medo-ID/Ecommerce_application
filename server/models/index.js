import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DB_URL_PROD,
  ssl: {
    rejectUnauthorized: false
  }
});

console.log('database connected')