import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// 👇 Debug
console.log("DATABASE_URL =>", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 👈 ده الحل
  }
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  });

export default pool;