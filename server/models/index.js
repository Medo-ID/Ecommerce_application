import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: 'postgresql://ecom_restapi_db_user:p9HvjgvDwI8IEiUt0PRs935XmurDWsVK@dpg-cspjes52ng1s73d1u2eg-a/ecom_restapi_db',
  ssl: {
    rejectUnauthorized: false
  }
});