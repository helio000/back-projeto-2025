// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());

// Banco de dados em memória
let alunos = [];
let professores = [];

// Funções auxiliares
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ===== ROTAS =====

// Raiz da API
app.get('/', (req, res) => {
  res.json({
    status: "sucesso",
    message: "API funcionando! Use /alunos ou /professores"
  });
});

// ===== ALUNOS =====

// Criar aluno
app.post('/alunos', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) return res.status(400).json({ error: "Campos obrigatórios faltando." });
  if (!isValidEmail(email)) return res.status(400).json({ error: "E-mail inválido." });

  const existing = alunos.find(a => a.email === email.toLowerCase());
  if (existing) return res.status(400).json({ error: "Aluno já cadastrado." });

  const id = alunos.length + 1;
  const aluno = { id, nome: nome.trim(), email: email.toLowerCase() };
  alunos.push(aluno);

  res.status(201).json({ status: "sucesso", aluno });
});

// Listar alunos
app.get('/alunos', (req, res) => {
  res.json({ status: "sucesso", data: alunos });
});

// Buscar aluno por ID
app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });
  res.json({ status: "sucesso", aluno });
});

// ===== PROFESSORES =====

// Criar professor
app.post('/professores', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) return res.status(400).json({ error: "Campos obrigatórios faltando." });
  if (!isValidEmail(email)) return res.status(400).json({ error: "E-mail inválido." });

  const existing = professores.find(p => p.email === email.toLowerCase());
  if (existing) return res.status(400).json({ error: "Professor já cadastrado." });

  const id = professores.length + 1;
  const professor = { id, nome: nome.trim(), email: email.toLowerCase() };
  professores.push(professor);

  res.status(201).json({ status: "sucesso", professor });
});

// Listar professores
app.get('/professores', (req, res) => {
  res.json({ status: "sucesso", data: professores });
});

// Buscar professor por ID
app.get('/professores/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const professor = professores.find(p => p.id === id);
  if (!professor) return res.status(404).json({ error: "Professor não encontrado." });
  res.json({ status: "sucesso", professor });
});

// Exporta para Vercel
module.exports = serverless(app);
