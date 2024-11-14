import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: 'postgresql://ecom_restapi_db_owner:FJz8EaP5upiS@ep-withered-lab-a2pwtsm7.eu-central-1.aws.neon.tech/ecom_restapi_db?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});