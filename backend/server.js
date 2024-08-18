import express, { urlencoded } from "express";
import cors from "cors";
import routes from './routes/routes.js'

const app = express();
const port = 3000;

// Vao ser os middlewares
app.use(express.json());
app.use(cors());

app.use('/', routes)

app.listen(port, () => {
  console.log(`running in http://localhost:${port}`);
});

export default app;
