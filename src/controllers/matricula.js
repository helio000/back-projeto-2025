const prisma = require('../prisma'); // importa o prisma singleton

// Criar matrícula
const create = async (req, res) => {
  try {
    const { alunoId, turmaId } = req.body;

    const alunoExistente = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
    if (!alunoExistente) return res.status(404).json({ error: "Aluno não encontrado." });

    const turmaExistente = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
    if (!turmaExistente) return res.status(404).json({ error: "Turma não encontrada." });

    const matricula = await prisma.matricula.create({
      data: { alunoId: Number(alunoId), turmaId: Number(turmaId) },
    });

    res.status(201).json(matricula);
  } catch (error) {
    console.error("Erro ao criar matrícula:", error);
    res.status(400).json({ error: `Erro ao criar matrícula: ${error.message}` });
  }
};

// Listar todas as matrículas
const read = async (req, res) => {
  try {
    const matriculas = await prisma.matricula.findMany({
      include: { aluno: true, turma: true },
    });
    res.status(200).json(matriculas);
  } catch (error) {
    console.error("Erro ao buscar matrículas:", error);
    res.status(400).json({ error: `Erro ao buscar matrículas: ${error.message}` });
  }
};

// Buscar uma matrícula por ID
const readOne = async (req, res) => {
  const { id } = req.params;
  try {
    const matricula = await prisma.matricula.findUnique({
      where: { id: Number(id) },
      include: { aluno: true, turma: true },
    });

    if (!matricula) return res.status(404).json({ error: 'Matrícula não encontrada' });

    res.status(200).json(matricula);
  } catch (error) {
    console.error("Erro ao buscar matrícula:", error);
    res.status(400).json({ error: `Erro ao buscar matrícula: ${error.message}` });
  }
};

// Atualizar matrícula
const update = async (req, res) => {
  const { id } = req.params;
  const { alunoId, turmaId } = req.body;
  try {
    const alunoExistente = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
    if (!alunoExistente) return res.status(404).json({ error: "Aluno não encontrado." });

    const turmaExistente = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
    if (!turmaExistente) return res.status(404).json({ error: "Turma não encontrada." });

    const matricula = await prisma.matricula.update({
      where: { id: Number(id) },
      data: { alunoId: Number(alunoId), turmaId: Number(turmaId) },
    });

    res.status(200).json(matricula);
  } catch (error) {
    console.error("Erro ao atualizar matrícula:", error);
    res.status(400).json({ error: `Erro ao atualizar matrícula: ${error.message}` });
  }
};

// Remover matrícula
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const matriculaExistente = await prisma.matricula.findUnique({ where: { id: Number(id) } });
    if (!matriculaExistente) return res.status(404).json({ error: 'Matrícula não encontrada' });

    await prisma.matricula.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: 'Matrícula removida com sucesso' });
  } catch (error) {
    console.error("Erro ao remover matrícula:", error);
    res.status(400).json({ error: `Erro ao remover matrícula: ${error.message}` });
  }
};

module.exports = { create, read, readOne, update, remove };
