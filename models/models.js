import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  "1g8zqJZYrlgy7zZEgttlnovj0rvfrasR",
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

export default sequelize;