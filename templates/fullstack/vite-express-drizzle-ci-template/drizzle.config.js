import * as dotenv from 'dotenv';
const isProd = process.env.NODE_ENV === 'production';
dotenv.config({ path: isProd ? '.env' : '.env.development' })

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./db/schema/*",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.EXPRESS_DATABASE_URL,
  }
};