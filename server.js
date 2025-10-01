require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { create, read, readOne, update, remove, login } = require('./src/controllers/aluno.js');

const app = express();
const port = process.env.PORT || 3100;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.get('/alunos', read);
app.get('/alunos/:id', readOne);
app.post('/alunos', create);
app.put('/alunos/:id', update);
app.delete('/alunos/:id', remove);

// Login
app.post('/alunos/login', login);


// Rota inicial
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Start do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});