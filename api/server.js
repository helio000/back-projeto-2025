const express = require('express');
const app = express();
app.use(express.json());

let alunos = [];
let professores = [];

// Função para validar e-mail
const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// Função para validar telefone (exemplo de regex para telefone brasileiro)
const isValidPhone = (telefone) => {
  const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;  // Exemplo: (11) 98765-4321
  return regex.test(telefone);
};

// Função para evitar duplicação de código para criação de aluno e professor
const createEntity = (entityType, data, collection) => {
  const { nome, email, telefone, arteMarcial } = data;

  if (!nome || !email || !telefone || !arteMarcial)
    return { status: 400, message: "Campos obrigatórios faltando." };

  if (!isValidEmail(email))
    return { status: 400, message: "E-mail inválido." };

  if (!isValidPhone(telefone))
    return { status: 400, message: "Telefone inválido." };

  // Verifica se o e-mail já foi cadastrado
  const existingEntity = collection.find(item => item.email === email);
  if (existingEntity)
    return { status: 400, message: `${entityType} já cadastrado com esse e-mail.` };

  const id = collection.length + 1;
  const entity = { id, nome, email, telefone, arteMarcial };
  collection.push(entity);
  return { status: 201, message: `${entityType} criado com sucesso.`, entity };
};

// ===== Alunos =====
// Criar aluno
app.post('/alunos', (req, res) => {
  const result = createEntity('Aluno', req.body, alunos);
  res.status(result.status).json(result);
});

// Listar alunos
app.get('/alunos', (req, res) => {
  if (alunos.length === 0) {
    return res.status(200).json({ status: "sucesso", message: "Nenhum aluno cadastrado." });
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
  const result = createEntity('Professor', req.body, professores);
  res.status(result.status).json(result);
});

// Listar professores
app.get('/professores', (req, res) => {
  if (professores.length === 0) {
    return res.status(200).json({ status: "sucesso", message: "Nenhum professor cadastrado." });
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
