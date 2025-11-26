let alunos = [];

// Criar aluno
const create = async (req, res) => {
  const { nome, email, telefone, arteMarcial } = req.body;

  if (!nome || !email || !telefone || !arteMarcial)
    return res.status(400).json({ error: "Campos obrigatórios faltando." });

  const RA = Math.floor(100000 + Math.random() * 900000);
  const id = alunos.length + 1;
  const aluno = { id, nome, email, telefone, arteMarcial, RA };
  
  // Evita duplicação de e-mail
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

// Login simples
const login = async (req, res) => {
  const { email } = req.body;
  const aluno = alunos.find(a => a.email === email);
  if (!aluno) return res.status(401).json({ error: "Aluno não encontrado" });
  res.status(200).json({ message: "Login bem-sucedido", aluno });
};

module.exports = { create, read, readOne, login };
