const express = require('express');
const app = express();
app.use(express.json());

// ===== "Banco" em memória =====
let alunos = [];
let professores = [];

// ===== Funções de validação =====
const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
const isValidPhone = (telefone) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone);

// ===== Rotas =====

// Raiz
app.get('/', (req, res) => {
  res.json({ status: "sucesso", message: "API funcionando! Use /alunos ou /professores" });
});

// ----- Alunos -----
app.post('/alunos', (req, res) => {
  const { nome, email, telefone, arteMarcial } = req.body;
  if (!nome || !email || !telefone || !arteMarcial)
    return res.status(400).json({ error: "Campos obrigatórios faltando." });

  if (!isValidEmail(email)) return res.status(400).json({ error: "E-mail inválido." });
  if (!isValidPhone(telefone)) return res.status(400).json({ error: "Telefone inválido." });

  if (alunos.find(a => a.email === email)) return res.status(400).json({ error: "Aluno já cadastrado." });

  const id = alunos.length + 1;
  const RA = Math.floor(100000 + Math.random() * 900000);
  const aluno = { id, nome, email, telefone, arteMarcial, RA };
  alunos.push(aluno);
  res.status(201).json(aluno);
});

app.get('/alunos', (req, res) => res.json(alunos));
app.get('/alunos/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado." });
  res.json(aluno);
});

// ----- Professores -----
app.post('/professores', (req, res) => {
  const { nome, email, telefone, arteMarcial } = req.body;
  if (!nome || !email || !telefone) return res.status(400).json({ error: "Campos obrigatórios faltando." });

  if (!isValidEmail(email)) return res.status(400).json({ error: "E-mail inválido." });
  if (!isValidPhone(telefone)) return res.status(400).json({ error: "Telefone inválido." });

  if (professores.find(p => p.email === email)) return res.status(400).json({ error: "Professor já cadastrado." });

  const id = professores.length + 1;
  const professor = { id, nome, email, telefone, arteMarcial };
  professores.push(professor);
  res.status(201).json(professor);
});

app.get('/professores', (req, res) => res.json(professores));
app.get('/professores/:id', (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) return res.status(404).json({ error: "Professor não encontrado." });
  res.json(professor);
});

// ===== Servidor =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
