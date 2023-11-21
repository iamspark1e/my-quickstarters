import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
const myEnv = dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development' })
dotenvExpand.expand(myEnv)

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./db/schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.EXPRESS_DATABASE_URL,
  }
};