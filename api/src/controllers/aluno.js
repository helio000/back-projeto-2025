// Simula o Prisma com arrays em memória
let alunos = [];

// Criar aluno
const create = async (req, res) => {
  try {
    let { nome, email, telefone, datanasc, arteMarcial, RA } = req.body;

    if (!nome || !email || !telefone || !arteMarcial) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    const dataValida = datanasc ? new Date(datanasc) : null;
    if (datanasc && isNaN(dataValida)) return res.status(400).json({ error: "Data inválida." });

    if (!RA) RA = Math.floor(100000 + Math.random() * 900000);

    const existingAluno = alunos.find(a => a.email === email.trim().toLowerCase() || a.RA === Number(RA));
    if (existingAluno) return res.status(400).json({ error: "Aluno já cadastrado." });

    const aluno = {
      id: alunos.length + 1,
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim(),
      datanasc: dataValida,
      arteMarcial: arteMarcial.trim(),
      RA: Number(RA),
      matriculas: []
    };

    alunos.push(aluno);

    res.status(201).json(aluno);
  } catch (error) {
    console.error("Erro criar aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Listar alunos
const read = async (req, res) => {
  try {
    res.status(200).json(alunos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar alunos." });
  }
};

// Buscar aluno por ID
const readOne = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

    res.status(200).json(aluno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Login simples
const login = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email obrigatório" });

  try {
    const aluno = alunos.find(a => a.email === email.trim().toLowerCase());
    if (!aluno) return res.status(401).json({ error: "Aluno não encontrado" });

    res.status(200).json({ message: "Login bem-sucedido", aluno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

module.exports = { create, read, readOne, login };
