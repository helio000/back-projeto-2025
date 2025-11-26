const express = require('express');
const serverless = require('serverless-http'); // npm install serverless-http
const app = express();
app.use(express.json());

// Banco em memória
let alunos = [];
let professores = [];

// Rotas
app.get('/', (req, res) => res.json({ message: "API funcionando!" }));

app.post('/alunos', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ error: "Campos obrigatórios" });
  const id = alunos.length + 1;
  const aluno = { id, nome, email };
  alunos.push(aluno);
  res.status(201).json(aluno);
});

app.get('/alunos', (req, res) => res.json(alunos));

// Exporta como função serverless
module.exports = serverless(app);
