import express from 'express'
import bodyParser from 'body-parser'
// importar aqui as rotas (passageiro e motorista)
// se necessario, criar um novo arquivo para ficar com as solicitações de corrida
// a logica vai ser, quando o motorista aceitar a corrida ele vai fazer uma requisição 'put' (a de editar 2 ou mais informaçoes), atualizando o status para "accepted" e exibindo as informações do motorista

const app = express()
app.use(bodyParser.json())

app.use('/api', ) // route dos passageiros

const PORT = import.meta.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
})
