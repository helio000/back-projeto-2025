const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar telefone
const create = async (req, res) => {
  try {
    const telefone = await prisma.telefone.create({
      data: req.body,
    });
    res.status(201).json(telefone);
  } catch (error) {
    res.status(400).json({ error: `Erro ao criar telefone: ${error.message}` });
  }
};

// Listar todos os telefones
const read = async (req, res) => {
  try {
    const telefones = await prisma.telefone.findMany();
    res.status(200).json(telefones);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar telefones: ${error.message}` });
  }
};

// Buscar telefone por ID
const readOne = async (req, res) => {
  const { id } = req.params;
  try {
    const telefone = await prisma.telefone.findUnique({
      where: { id: Number(id) },
    });

    if (!telefone) {
      return res.status(404).json({ error: 'Telefone não encontrado' });
    }

    res.status(200).json(telefone);
  } catch (error) {
    res.status(400).json({ error: `Erro ao buscar telefone: ${error.message}` });
  }
};

// Atualizar telefone
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const telefone = await prisma.telefone.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(telefone);
  } catch (error) {
    res.status(400).json({ error: `Erro ao atualizar telefone: ${error.message}` });
  }
};

// Remover telefone
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.telefone.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Telefone removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: `Erro ao remover telefone: ${error.message}` });
  }
};

module.exports = { create, read, readOne, update, remove };
