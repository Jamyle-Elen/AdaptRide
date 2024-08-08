import express from 'express'
import cors from 'cors'
import passengerRoutes from './routes/passenger.routes.js'
import db from './config/database.js'

const app = express();
const port = 3000;

// Vao ser os middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))  

// Rotas
app.use('/passenger', passengerRoutes)

app.listen(port, () => {
    console.log(`running in http://localhost:${port}`)
})

export default app
