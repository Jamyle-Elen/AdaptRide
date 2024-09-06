import mysql from 'mysql2/promise'
import { Sequelize } from "sequelize";


// const db = mysql.createPool({
//   host: process.env.DB_HOST ||'localhost',
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'root',
//   database: process.env.DB_NAME || 'adaptride'
// })



const db = new Sequelize(
  process.env.DB_NAME || 'adaptride',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root', 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  }
);

export default db;





