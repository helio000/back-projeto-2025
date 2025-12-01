let alunos = [];

// Criar aluno
const create = async (req, res) => {
  const { nome, email, telefone, arteMarcial } = req.body;

  if (!nome || !email || !telefone || !arteMarcial)
    return res.status(400).json({ error: "Campos obrigatórios faltando." });

  const RA = Math.floor(100000 + Math.random() * 900000);
  const id = alunos.length + 1;
  const aluno = { id, nome, email, telefone, arteMarcial, RA };
  
  if (alunos.find(a => a.email === email))
    return res.status(400).json({ error: "Aluno já cadastrado com esse e-mail." });

  alunos.push(aluno);
  res.status(201).json(aluno);
};

// Listar alunos
const read = async (req, res) => res.status(200).json(alunos);

// Buscar aluno por ID
const readOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
  res.status(200).json(aluno);
};

// Atualizar aluno
const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

  const { nome, email, telefone, arteMarcial } = req.body;

  if (nome) aluno.nome = nome;
  if (email) aluno.email = email;
  if (telefone) aluno.telefone = telefone;
  if (arteMarcial) aluno.arteMarcial = arteMarcial;

  res.status(200).json({ message: "Atualizado com sucesso", aluno });
};

// Remover aluno
const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Aluno não encontrado" });

  alunos.splice(index, 1);
  res.status(200).json({ message: "Aluno removido" });
};

// Atualizar notas
const updateNotas = async (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

  const { notas } = req.body;
  aluno.notas = notas;

  res.status(200).json({ message: "Notas atualizadas", aluno });
};

// Login
const login = async (req, res) => {
  const { email } = req.body;
  const aluno = alunos.find(a => a.email === email);
  if (!aluno) return res.status(401).json({ error: "Aluno não encontrado" });
  res.status(200).json({ message: "Login bem-sucedido", aluno });
};

module.exports = { create, read, readOne, update, remove, updateNotas, login };
