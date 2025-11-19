const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar matrícula
const create = async (req, res) => {
  try {
    const matricula = await prisma.matricula.create({
      data: req.body,
    });
    res.status(201).json(matricula);
  } catch (error) {
    res.status(400).json({ error: `Erro ao criar matrícula: ${error.message}` });
  }
};

// Listar todas as matrículas
const read = async (req, res) => {
  try {
    const matriculas = await prisma.matricula.findMany();
    res.status(200).json(matriculas);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar matrículas: ${error.message}` });
  }
};

// Buscar uma matrícula por ID
const readOne = async (req, res) => {
  const { id } = req.params;
  try {
    const matricula = await prisma.matricula.findUnique({
      where: { id: Number(id) },include: { aluno: true, turma: true },
    });

    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula não encontrada' });
    }

    res.status(200).json(matricula);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar matrícula: ${error.message}` });
  }
};

// Atualizar matrícula
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const matricula = await prisma.matricula.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(matricula);
  } catch (error) {
    res.status(400).json({ error: `Erro ao atualizar matrícula: ${error.message}` });
  }
};

// Remover matrícula
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.matricula.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Matrícula removida com sucesso' });
  } catch (error) {
    res.status(400).json({ error: `Erro ao remover matrícula: ${error.message}` });
  }
};

module.exports = { create, read, readOne, update, remove };
