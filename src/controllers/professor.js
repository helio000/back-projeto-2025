const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar professor
const create = async (req, res) => {
  try {
    const professor = await prisma.professor.create({
      data: req.body,
    });
    res.status(201).json(professor);
  } catch (error) {
    res.status(400).json({ error: `Erro ao criar professor: ${error.message}` });
  }
};

// Listar todos os professores
const read = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.status(200).json(professores);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar professores: ${error.message}` });
  }
};

// Buscar professor por ID
const readOne = async (req, res) => {
  const { id } = req.params;
  try {
    const professor = await prisma.professor.findUnique({
      where: { id: Number(id) },
    });

    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }

    res.status(200).json(professor);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar professor: ${error.message}` });
  }
};

// Atualizar professor
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const professor = await prisma.professor.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(professor);
  } catch (error) {
    res.status(400).json({ error: `Erro ao atualizar professor: ${error.message}` });
  }
};

// Remover professor
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.professor.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Professor removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: `Erro ao remover professor: ${error.message}` });
  }
};

module.exports = { create, read, readOne, update, remove };
