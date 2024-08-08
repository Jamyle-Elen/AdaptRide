// vamos fazer aqui a conexao do msql

import mysql from 'mysql2'
// Import padrao do mysql

const db = mysql.createConnection({
    host: db_HOST,
    user: db_USER,
    password: db_PASSWORD,
    database: db_DATABASE
    // Isso são variáveis de ambiente, pra evitar que dados sensiveis sejam vazados
})

db.connect((err) => {
    err ? console.err('Banco de dados não conectado:', err) : console.log('Conectado ao banco de dados')
    // Tratamento de erros para informar quando conseguir conectar ao banco de dados
})