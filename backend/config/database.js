import { Sequelize } from 'sequelize'

const db = new Sequelize( {
    // host: process.DB_HOST,
    // dialect: 'mysql'
    dialect: 'sqlite',
    storage: './db/banco.db' 
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
