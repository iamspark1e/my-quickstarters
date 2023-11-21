import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Reference: https://orm.drizzle.team/docs/quick-mysql/mysql2
const connection = await mysql.createConnection(process.env.EXPRESS_DATABASE_URL);

const db = drizzle(connection);

export default db;