const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar professor
const create = async (req, res) => {
  try {
    // Criação do professor no banco de dados
    const professor = await prisma.professor.create({
      data: req.body,
    });

    res.status(201).json(professor);
  } catch (error) {
    res.status(400).json({ error: "Envie pelo menos nome, cpf e email" });
  }
};

// Listar todos os professores
const read = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.status(200).json(professores);
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Buscar professor por ID
const readOne = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    const professor = await prisma.professor.findUnique({ where: { id: idNum }, include: { turmas: true } });
    if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });
    res.status(200).json(professor);
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Atualizar professor
const update = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    const professor = await prisma.professor.update({
      where: { id: idNum },
      data: req.body,
    });

    res.status(202).json(professor);
  } catch (error) {
    res.status(400).json({ error: "Envie um dos campos a ser alterado" });
  }
};

// Remover professor
const remove = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    await prisma.professor.delete({ where: { id: idNum } });
    res.status(200).json({ message: 'Professor removido com sucesso' });
  } catch (error) {
    console.error("Erro ao remover professor:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Login do professor
const loginProfessor = async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) return res.status(400).json({ error: "Nome e e-mail são obrigatórios" });

  try {
    const professor = await prisma.professor.findFirst({
      where: { nome: nome.trim(), email: email.trim().toLowerCase() }
    });

    if (!professor) return res.status(401).json({ error: "Nome ou e-mail incorretos" });

    res.status(200).json({ message: "Login realizado com sucesso!", professor });
  } catch (error) {
    console.error("Erro no login do professor:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

module.exports = { create, read, readOne, update, remove, loginProfessor };
