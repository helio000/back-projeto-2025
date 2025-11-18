const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar um novo planejamento
  async create(req, res) {
    try {
      const { diaSemana, atividade, professorId } = req.body;

      const planejamento = await prisma.planejamento.create({
        data: { diaSemana, atividade, professorId }
      });

      return res.status(201).json(planejamento);
    } catch (error) {
      console.error("Erro ao criar planejamento:", error);
      return res.status(500).json({ error: "Erro ao criar planejamento" });
    }
  },

  // Listar todos
  async read(req, res) {
    try {
      const planejamentos = await prisma.planejamento.findMany({
        include: { professor: true }
      });
      return res.json(planejamentos);
    } catch (error) {
      console.error("Erro ao listar planejamentos:", error);
      return res.status(500).json({ error: "Erro ao listar planejamentos" });
    }
  },

  // Mostrar um específico
  async readOne(req, res) {
    try {
      const { id } = req.params;
      const planejamento = await prisma.planejamento.findUnique({
        where: { id: Number(id) },
        include: { professor: true }
      });
      if (!planejamento) return res.status(404).json({ error: "Não encontrado" });
      return res.json(planejamento);
    } catch (error) {
      console.error("Erro ao buscar planejamento:", error);
      return res.status(500).json({ error: "Erro ao buscar planejamento" });
    }
  },

  // Atualizar (professor altera aula)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { diaSemana, atividade } = req.body;

      const atualizado = await prisma.planejamento.update({
        where: { id: Number(id) },
        data: { diaSemana, atividade }
      });

      return res.json(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar planejamento:", error);
      return res.status(500).json({ error: "Erro ao atualizar planejamento" });
    }
  },

  // Remover
  async remove(req, res) {
    try {
      const { id } = req.params;
      await prisma.planejamento.delete({ where: { id: Number(id) } });
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao remover planejamento:", error);
      return res.status(500).json({ error: "Erro ao remover planejamento" });
    }
  }
};
