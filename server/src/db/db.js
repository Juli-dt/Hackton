import { createConnection } from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseType = process.env.DATABASE_TYPE;
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
const sequelize = new Sequelize(config.database, config.user, config.password, {
  port: config.port,
  host: config.host,
  dialect: databaseType,
  logging: false,
  native: false
});

export default sequelize;

// import Sequelize from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config()
// const host = process.env.DB_HOST
// const password  = process.env.DB_PASS
// const user = process.env.DB_USER

// const sequelize = new Sequelize(
//     // `postgres://postgres:klaus@localhost/donaciones`,
//     "postgres://"+user+":"+password+"@"+host+"/donaciones",

//     {
//         logging: false, 
//         native: false, 
//     }
// );

// export default sequelize;

