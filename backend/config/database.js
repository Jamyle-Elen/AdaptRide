import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const syncDatabase = async() => {
        try {
            await db.sync();
        } catch (error) {
            console.error(error);
        }
    }

db.authenticate()
    .then(() => {
        syncDatabase()
        console.log('Database, OK!')
    })
    .catch((error) => {
        console.error('Error Error Error Error, Database')
    })

    
    
export default db
