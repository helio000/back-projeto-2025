const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar aluno
const create = async (req, res) => {
  try {
    let { nome, email, telefone, datanasc, arteMarcial, RA } = req.body;

    if (!nome || !email || !telefone || !datanasc || !arteMarcial) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const dataValida = new Date(datanasc);
    if (isNaN(dataValida.getTime())) {
      return res.status(400).json({ error: "Data de nascimento inválida." });
    }

    if (!RA) {
      // Gera RA aleatório de 6 dígitos se não for informado
      RA = Math.floor(100000 + Math.random() * 900000);
    }

    const existingAluno = await prisma.aluno.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existingAluno) {
      return res.status(400).json({ error: "Já existe um aluno cadastrado com este e-mail." });
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone.trim(),
        datanasc: dataValida,
        arteMarcial: arteMarcial.trim(),
        RA: Number(RA)
      },
    });

    res.status(201).json(aluno);
  } catch (error) {
    console.error("Erro em create aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Listar todos os alunos
const read = async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro em read alunos:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Buscar aluno pelo ID
const readOne = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    const aluno = await prisma.aluno.findUnique({ where: { id: idNum } });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.status(200).json(aluno);
  } catch (error) {
    console.error("Erro em readOne aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Atualizar aluno
const update = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    let { nome, email, telefone, datanasc, arteMarcial, RA } = req.body;

    const dataValida = datanasc ? new Date(datanasc) : undefined;
    if (datanasc && isNaN(dataValida.getTime())) {
      return res.status(400).json({ error: "Data de nascimento inválida." });
    }

    const aluno = await prisma.aluno.update({
      where: { id: idNum },
      data: {
        nome: nome?.trim(),
        email: email?.trim().toLowerCase(),
        telefone: telefone?.trim(),
        datanasc: dataValida,
        arteMarcial: arteMarcial?.trim(),
        RA: RA ? Number(RA) : undefined
      },
    });

    res.status(200).json(aluno);
  } catch (error) {
    console.error("Erro em update aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Remover aluno
const remove = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    await prisma.aluno.delete({ where: { id: idNum } });
    res.status(200).json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    console.error("Erro em remove aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Login do aluno
const login = async (req, res) => {
  let { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e e-mail são obrigatórios" });
  }

  nome = nome.trim();
  email = email.trim().toLowerCase();

  try {
    const aluno = await prisma.aluno.findFirst({
      where: { nome, email },
    });

    if (!aluno) {
      return res.status(401).json({ error: "Nome ou e-mail incorretos" });
    }

    res.status(200).json({ message: "Login realizado com sucesso!", aluno });
  } catch (error) {
    console.error("Erro em login aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

module.exports = { create, read, readOne, update, remove, login };
