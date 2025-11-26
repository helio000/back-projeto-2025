// api/controllers/planejamentoController.js
const prisma = require('../prisma'); // Usa o singleton do prisma.js

module.exports = {
  // Criar um novo planejamento
  async create(req, res) {
    try {
      const { diaSemana, atividade, professorId } = req.body;

      const professorExistente = await prisma.professor.findUnique({
        where: { id: Number(professorId) },
      });

      if (!professorExistente) {
        return res.status(404).json({ error: "Professor não encontrado." });
      }

      const planejamento = await prisma.planejamento.create({
        data: {
          diaSemana,
          atividade,
          professorId: Number(professorId),
        },
      });

      return res.status(201).json(planejamento);
    } catch (error) {
      console.error("Erro ao criar planejamento:", error);
      return res.status(500).json({ error: "Erro ao criar planejamento" });
    }
  },

  // Listar todos os planejamentos
  async read(req, res) {
    try {
      const planejamentos = await prisma.planejamento.findMany({
        include: { professor: true },
      });
      return res.json(planejamentos);
    } catch (error) {
      console.error("Erro ao listar planejamentos:", error);
      return res.status(500).json({ error: "Erro ao listar planejamentos" });
    }
  },

  // Mostrar um planejamento específico
  async readOne(req, res) {
    try {
      const { id } = req.params;
      const planejamento = await prisma.planejamento.findUnique({
        where: { id: Number(id) },
        include: { professor: true },
      });

      if (!planejamento) {
        return res.status(404).json({ error: "Planejamento não encontrado" });
      }

      return res.json(planejamento);
    } catch (error) {
      console.error("Erro ao buscar planejamento:", error);
      return res.status(500).json({ error: "Erro ao buscar planejamento" });
    }
  },

  // Atualizar um planejamento
  async update(req, res) {
    try {
      const { id } = req.params;
      const { diaSemana, atividade } = req.body;

      const atualizado = await prisma.planejamento.update({
        where: { id: Number(id) },
        data: { diaSemana, atividade },
      });

      return res.json(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar planejamento:", error);
      return res.status(500).json({ error: "Erro ao atualizar planejamento" });
    }
  },

  // Remover um planejamento
  async remove(req, res) {
    try {
      const { id } = req.params;

      const planejamentoExistente = await prisma.planejamento.findUnique({
        where: { id: Number(id) },
      });

      if (!planejamentoExistente) {
        return res.status(404).json({ error: "Planejamento não encontrado" });
      }

      await prisma.planejamento.delete({ where: { id: Number(id) } });

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao remover planejamento:", error);
      return res.status(500).json({ error: "Erro ao remover planejamento" });
    }
  },
};
