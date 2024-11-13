import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { NODE_ENV, DB_URL_PROD, DB_URL_DEV } = process.env;

const { Pool } = pg;

export const pool = new Pool({
  connectionString: NODE_ENV === 'production' ? DB_URL_PROD : DB_URL_DEV,
  ssl: {
    rejectUnauthorized: false
  }
});