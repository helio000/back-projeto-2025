// api/index.js
const express = require('express');
const serverless = require('serverless-http'); // precisa instalar: npm install serverless-http
const app = express();
app.use(express.json());

let alunos = [];
let professores = [];

// Funções auxiliares
const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
const isValidPhone = (telefone) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone);

const createEntity = (entityType, data, collection) => {
  const { nome, email, telefone, arteMarcial } = data;
  if (!nome || !email || !telefone || !arteMarcial)
    return { status: 400, message: "Campos obrigatórios faltando." };
  if (!isValidEmail(email)) return { status: 400, message: "E-mail inválido." };
  if (!isValidPhone(telefone)) return { status: 400, message: "Telefone inválido." };
  const existing = collection.find(e => e.email === email);
  if (existing) return { status: 400, message: `${entityType} já cadastrado com esse e-mail.` };
  const id = collection.length + 1;
  const entity = { id, nome, email, telefone, arteMarcial };
  collection.push(entity);
  return { status: 201, message: `${entityType} criado com sucesso.`, entity };
};

// Rota raiz
app.get('/', (req, res) => {
  res.json({ status: "sucesso", message: "API funcionando! Use /alunos ou /professores" });
});

// Rotas alunos
app.post('/alunos', (req, res) => res.status(createEntity('Aluno', req.body, alunos).status).json(createEntity('Aluno', req.body, alunos)));
app.get('/alunos', (req, res) => res.json(alunos));
app.get('/alunos/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
  res.json(aluno);
});

// Rotas professores
app.post('/professores', (req, res) => res.status(createEntity('Professor', req.body, professores).status).json(createEntity('Professor', req.body, professores)));
app.get('/professores', (req, res) => res.json(professores));
app.get('/professores/:id', (req, res) => {
  const prof = professores.find(p => p.id === parseInt(req.params.id));
  if (!prof) return res.status(404).json({ error: "Professor não encontrado" });
  res.json(prof);
});

// Exportar para Vercel
module.exports.handler = serverless(app);
