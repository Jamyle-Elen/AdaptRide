import express from 'express'
import { Router } from 'express'
import Passenger from '../models/Passenger.Model.js'
import db from '../config/database.js'

const router = express.Router()

router.post('/', (req, res) => {
    const { name, cpf , email, phone, dateBirth, password } = req.body
    // Isso aqui é pra que o metodo POST venha como body, no momento da requisição

    const newPassenger = new Passenger(name, cpf, email, phone, dateBirth, password)
    // New é para 'instanciar', lembrem dessa palavra. Então estamos instanciando um novo passageiro e colocando todos os dados deles na variável.

    const query = `INSERT INTO passenger (id, name, cpf, email, phone, dateBirth, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    // Insere os dados na tabela

    db.query(query, [newPassenger.id, newPassenger.name, newPassenger.cpf, newPassenger.email, newPassenger.phone, newPassenger.dateBirth, newPassenger.password], (err, result) => {
    // Isso é um metodo pra execultar uma consulta no MYSQL
        err ? console.error('Erro ao inserir dados', err) && res.status(500).send('Erro ao inserir dados')
        : res.status(201).send('Passageiro cadastrado com sucesso');
        // essa parte vai inserir os dados direto no MYSQL, nosso banco de dados. Essa logica é a mesma de if e else, apenas usei 'Operador ternário' que é uma forma mais direta e bonita.
    })
})

export default router;