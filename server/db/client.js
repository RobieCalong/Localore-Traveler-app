import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const options = {
  connectionString: process.env.DATABASE_URL,
};

// Always enable SSL if DATABASE_URL is external (not localhost)
if (process.env.DATABASE_URL.includes("render.com")) {
  options.ssl = { rejectUnauthorized: false };
}

const db = new pg.Client(options);
export default db;