import  express, {urlencoded } from 'express'
import cors from 'cors'
import db from './config/database.js'
import dotenv from 'dotenv'
import Driver from './models/Driver.Model.js'

dotenv.config()

const app = express();
const port = 3000;

// Vao ser os middlewares
app.use(express.json());
app.use(cors());


app.post('/drivers', (req, res) => {
    const teste = req.body
    const newDriver = Driver.create(teste)
    res.status(201).send(teste)
    console.log(teste)
})

app.listen(port, () => {
    console.log(`running in http://localhost:${port}`)
})

export default app
