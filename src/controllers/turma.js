const prisma = require('../prisma'); // importa o prisma singleton

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
      return res.status(400).json({ error: "Professor não encontrado." });
    }

    const turma = await prisma.turma.create({
      data: {
        nome: nome.trim(),
        arteMarcial: arteMarcial.trim(),
        professorId: Number(professorId),
      },
    });

    res.status(201).json(turma);
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    res.status(500).json({ error: `Erro interno ao criar turma: ${error.message}` });
  }
};

// Listar todas as turmas
const read = async (req, res) => {
  try {
    const turmas = await prisma.turma.findMany({
      include: { professor: true },
    });
    res.status(200).json(turmas);
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    res.status(500).json({ error: `Erro interno ao buscar turmas: ${error.message}` });
  }
};

// Buscar turma por ID
const readOne = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const turma = await prisma.turma.findUnique({
      where: { id: Number(id) },
      include: { professor: true },
    });

    if (!turma) return res.status(404).json({ error: 'Turma não encontrada' });

    res.status(200).json(turma);
  } catch (error) {
    console.error("Erro ao buscar turma:", error);
    res.status(500).json({ error: `Erro interno ao buscar turma: ${error.message}` });
  }
};

// Atualizar turma
const update = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const { nome, arteMarcial, professorId } = req.body;

    if (professorId) {
      const professorExistente = await prisma.professor.findUnique({
        where: { id: Number(professorId) },
      });
      if (!professorExistente) return res.status(400).json({ error: "Professor não encontrado." });
    }

    const turma = await prisma.turma.update({
      where: { id: Number(id) },
      data: {
        nome: nome?.trim(),
        arteMarcial: arteMarcial?.trim(),
        professorId: professorId ? Number(professorId) : undefined,
      },
      include: { professor: true },
    });

    res.status(200).json(turma);
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    res.status(500).json({ error: `Erro interno ao atualizar turma: ${error.message}` });
  }
};

// Remover turma
const remove = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const turmaExistente = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turmaExistente) return res.status(404).json({ error: "Turma não encontrada" });

    await prisma.turma.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Turma removida com sucesso' });
  } catch (error) {
    console.error("Erro ao remover turma:", error);
    res.status(500).json({ error: `Erro interno ao remover turma: ${error.message}` });
  }
};

module.exports = { create, read, readOne, update, remove };
