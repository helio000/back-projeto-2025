const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar turma
const create = async (req, res) => {
  try {
    const turma = await prisma.turma.create({
      data: req.body,
    });
    res.status(201).json(turma);
  } catch (error) {
    res.status(400).json({ error: `Erro ao criar turma: ${error.message}` });
  }
};

// Listar todas as turmas
const read = async (req, res) => {
  try {
    const turmas = await prisma.turma.findMany();
    res.status(200).json(turmas);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar turmas: ${error.message}` });
  }
};

// Buscar turma por ID
const readOne = async (req, res) => {
  const { id } = req.params;
  try {
    const turma = await prisma.turma.findUnique({
      where: { id: Number(id) },
    });
    if (!turma) return res.status(404).json({ error: 'Turma não encontrada' });
    res.status(200).json(turma);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar turma: ${error.message}` });
  }
};

// Atualizar turma
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const turma = await prisma.turma.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(turma);
  } catch (error) {
    res.status(400).json({ error: `Erro ao atualizar turma: ${error.message}` });
  }
};

// Remover turma
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.turma.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Turma removida com sucesso' });
  } catch (error) {
    res.status(400).json({ error: `Erro ao remover turma: ${error.message}` });
  }
};

module.exports = { create, read, readOne, update, remove };
