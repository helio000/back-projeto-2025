const express = require('express');
const app = express();
app.use(express.json());

let alunos = [];
let professores = [];

// Função para validar se o e-mail é válido
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// ===== Alunos =====
// Criar aluno
app.post('/alunos', (req, res) => {
  const { nome, email, telefone, arteMarcial } = req.body;
  if (!nome || !email || !telefone || !arteMarcial)
    return res.status(400).json({ error: "Campos obrigatórios faltando." });

  if (!isValidEmail(email))
    return res.status(400).json({ error: "E-mail inválido." });

  // Verifica se o e-mail já foi cadastrado
  const existingAluno = alunos.find(a => a.email === email);
  if (existingAluno) return res.status(400).json({ error: "Aluno já cadastrado com esse e-mail." });

  const RA = Math.floor(100000 + Math.random() * 900000);
  const id = alunos.length + 1;
  const aluno = { id, nome, email, telefone, arteMarcial, RA };
  alunos.push(aluno);
  res.status(201).json({ status: "sucesso", message: "Aluno criado com sucesso.", aluno });
});

// Listar alunos
app.get('/alunos', (req, res) => {
  if (alunos.length === 0) {
    return res.status(200).json({ message: "Nenhum aluno cadastrado." });
  }
  res.status(200).json({ status: "sucesso", data: alunos });
});

// Buscar aluno por ID
app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ status: "erro", message: "Aluno não encontrado" });
  res.status(200).json({ status: "sucesso", data: aluno });
});

// ===== Professores =====
// Criar professor
app.post('/professores', (req, res) => {
  const { nome, email, telefone, arteMarcial } = req.body;
  if (!nome || !email || !telefone) 
    return res.status(400).json({ error: "Campos obrigatórios faltando." });

  if (!isValidEmail(email))
    return res.status(400).json({ error: "E-mail inválido." });

  // Verifica se o e-mail já foi cadastrado
  const existingProfessor = professores.find(p => p.email === email);
  if (existingProfessor) return res.status(400).json({ error: "Professor já cadastrado com esse e-mail." });

  const id = professores.length + 1;
  const professor = { id, nome, email, telefone, arteMarcial };
  professores.push(professor);
  res.status(201).json({ status: "sucesso", message: "Professor criado com sucesso.", professor });
});

// Listar professores
app.get('/professores', (req, res) => {
  if (professores.length === 0) {
    return res.status(200).json({ message: "Nenhum professor cadastrado." });
  }
  res.status(200).json({ status: "sucesso", data: professores });
});

// Buscar professor por ID
app.get('/professores/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const professor = professores.find(p => p.id === id);
  if (!professor) return res.status(404).json({ status: "erro", message: "Professor não encontrado" });
  res.status(200).json({ status: "sucesso", data: professor });
});

// ===== Servidor =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
