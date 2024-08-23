import { Sequelize } from "sequelize";
import mysql from 'mysql2'
import dotenv from 'dotenv'

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db/banco.db",
});

const syncDatabase = async () => {
  try {
    await db.sync();
    console.log('Database sincronizada!');
  } catch (error) {
    console.error('Erro de sicronizacão:', error);
  }
};
db.authenticate()
  .then(() => {
    syncDatabase();
    console.log("Database, OK!");
  })
  .catch((error) => {
    console.error("Error Error Error Error, Database", error);
  });


export default db;
