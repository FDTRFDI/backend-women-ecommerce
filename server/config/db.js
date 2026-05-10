import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isRender = process.env.RENDER === "true";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: isRender
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB Connection Error:", err.message));

export default sequelize;
