import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const databaseType = process.env.DATABASE_TYPE;
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}
  // database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.database, config.user, config.password, {
  port: config.port,
  host: config.host,
  dialect: databaseType
});

export default sequelize;