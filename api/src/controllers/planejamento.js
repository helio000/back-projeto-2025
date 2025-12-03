const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

// No seu app principal (ex: app.js)
app.use(cors({ origin: "*" })); // Permite acesso do GitHub Pages

module.exports = {
  async create(req, res) {
    try {
      const { diaSemana, atividade, professorId } = req.body;
      if (!diaSemana || !atividade || !professorId)
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });

      const novo = await prisma.planejamento.create({
        data: { diaSemana, atividade, professorId: Number(professorId) },
      });

      return res.status(201).json(novo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async read(req, res) {
    try {
      const planejamentos = await prisma.planejamento.findMany({
        include: { professor: true } // Para mostrar o nome do professor
      });
      return res.status(200).json(planejamentos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { diaSemana, atividade } = req.body;

      if (!diaSemana || !atividade)
        return res.status(400).json({ error: "Dia e atividade obrigatórios!" });

      const planejamentoExistente = await prisma.planejamento.findUnique({ where: { id: Number(id) } });
      if (!planejamentoExistente) return res.status(404).json({ error: "Não encontrado!" });

      const atualizado = await prisma.planejamento.update({
        where: { id: Number(id) },
        data: { diaSemana, atividade },
      });

      return res.status(200).json(atualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const planejamentoExistente = await prisma.planejamento.findUnique({ where: { id: Number(id) } });
      if (!planejamentoExistente) return res.status(404).json({ error: "Não encontrado!" });

      await prisma.planejamento.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: "Excluído com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
};
