const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // Criar um novo planejamento
  async create(req, res) {
    try {
      const { diaSemana, atividade, professorId } = req.body;

      if (!diaSemana || !atividade || !professorId) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
      }

      // 🚫 REMOVE validação do professor, pois professores estão em array
      // 🚫 NÃO buscar no prisma.professor

      const novo = await prisma.planejamento.create({
        data: {
          diaSemana,
          atividade,
          professorId: Number(professorId),
        },
      });

      return res.status(201).json(novo);
    } catch (error) {
      console.error("Erro ao criar planejamento:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Listar planejamentos
  async read(req, res) {
    try {
      const planejamentos = await prisma.planejamento.findMany();
      return res.status(200).json(planejamentos);
    } catch (error) {
      console.error("Erro ao listar planejamentos:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar planejamento
  async update(req, res) {
    try {
      const { id } = req.params;
      const { diaSemana, atividade } = req.body;

      if (!diaSemana || !atividade) {
        return res.status(400).json({
          error: "Dia da semana e atividade são obrigatórios!",
        });
      }

      const planejamentoExistente = await prisma.planejamento.findUnique({
        where: { id: Number(id) },
      });

      if (!planejamentoExistente) {
        return res.status(404).json({ error: "Planejamento não encontrado!" });
      }

      const atualizado = await prisma.planejamento.update({
        where: { id: Number(id) },
        data: { diaSemana, atividade },
      });

      return res.status(200).json(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar planejamento:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar
  async remove(req, res) {
    try {
      const { id } = req.params;

      const planejamentoExistente = await prisma.planejamento.findUnique({
        where: { id: Number(id) },
      });

      if (!planejamentoExistente) {
        return res.status(404).json({ error: "Planejamento não encontrado!" });
      }

      await prisma.planejamento.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Planejamento excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir planejamento:", error);
      return res.status(500).json({ error: error.message });
    }
  },
};
