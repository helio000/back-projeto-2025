const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar turma
const create = async (req, res) => {
  try {
    const { nome, arteMarcial, professorId } = req.body;

    if (!nome || !arteMarcial || !professorId) {
      return res.status(400).json({ error: "Nome, Arte Marcial e Professor são obrigatórios." });
    }

    const professorExistente = await prisma.professor.findUnique({
      where: { id: Number(professorId) },
    });

    if (!professorExistente) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }

    const turma = await prisma.turma.create({
      data: {
        nome: nome.trim(),
        arteMarcial: arteMarcial.trim(),
        professorId: Number(professorId),
      },
      include: {
        professor: true,
      }
    });

    return res.status(201).json(turma);

  } catch (error) {
    console.error("Erro ao criar turma:", error);
    return res.status(500).json({ error: "Erro interno ao criar turma." });
  }
};

// Listar todas as turmas
const read = async (req, res) => {
  try {
    const turmas = await prisma.turma.findMany({
      include: { professor: true },
    });

    return res.status(200).json(turmas);

  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    return res.status(500).json({ error: "Erro interno ao buscar turmas." });
  }
};

// Buscar turma por ID
const readOne = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const turma = await prisma.turma.findUnique({
      where: { id: Number(id) },
      include: { professor: true },
    });

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    return res.status(200).json(turma);

  } catch (error) {
    console.error("Erro ao buscar turma:", error);
    return res.status(500).json({ error: "Erro interno ao buscar turma." });
  }
};

// Atualizar turma
const update = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const { nome, arteMarcial, professorId } = req.body;

    // Se mandar professorId, verifica se existe
    if (professorId) {
      const professorExistente = await prisma.professor.findUnique({
        where: { id: Number(professorId) },
      });

      if (!professorExistente) {
        return res.status(404).json({ error: "Professor não encontrado." });
      }
    }

    // Atualizando os campos enviados
    const turma = await prisma.turma.update({
      where: { id: Number(id) },
      data: {
        nome: nome?.trim(),
        arteMarcial: arteMarcial?.trim(),
        professorId: professorId ? Number(professorId) : undefined,
      },
      include: { professor: true }
    });

    return res.status(200).json(turma);

  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar turma." });
  }
};

// Remover turma
const remove = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const turmaExistente = await prisma.turma.findUnique({
      where: { id: Number(id) },
    });

    if (!turmaExistente) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    await prisma.turma.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Turma removida com sucesso." });

  } catch (error) {
    console.error("Erro ao remover turma:", error);
    return res.status(500).json({ error: "Erro interno ao remover turma." });
  }
};

module.exports = { create, read, readOne, update, remove };
