const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async create(req, res) {
    try {
      const { diaSemana, atividade, professorId } = req.body;

      const novo = await prisma.planejamento.create({
        data: {
          diaSemana,
          atividade,
          professorId: Number(professorId),
          data: new Date(), // adiciona a data atual
        },
        include: {
          professor: {
            select: { nome: true, arteMarcial: true },
          },
        },
      });

      return res.json(novo);
    } catch (error) {
      console.error("Erro ao criar planejamento:", error);
      return res.status(500).json({ error: "Erro ao criar planejamento" });
    }
  },

 async read(req, res) {
  try {
    const planejamentos = await prisma.planejamento.findMany({
      include: { professor: true },
    });
    return res.json(planejamentos);
  } catch (error) {
    console.error("Erro ao listar:", error);
    return res.status(500).json({ error: "Erro ao listar planejamentos" });
  }
}
,

  async update(req, res) {
    try {
      const { id } = req.params;
      const { diaSemana, atividade } = req.body;

      const atualizado = await prisma.planejamento.update({
        where: { id: Number(id) },
        data: { diaSemana, atividade },
        include: {
          professor: {
            select: { nome: true, arteMarcial: true },
          },
        },
      });

      return res.json(atualizado);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      return res.status(500).json({ error: "Erro ao atualizar planejamento" });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await prisma.planejamento.delete({ where: { id: Number(id) } });
      return res.json({ message: "Planejamento excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir:", error);
      return res.status(500).json({ error: "Erro ao excluir planejamento" });
    }
  },
};
