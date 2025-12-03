const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // Criar aula da semana
  async create(req, res) {
    try {
      const { dia, horario, turmaId } = req.body;

      if (!dia || !horario || !turmaId) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }

      const turmaExiste = await prisma.turma.findUnique({
        where: { id: Number(turmaId) },
      });

      if (!turmaExiste) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }

      const aula = await prisma.aulaSemana.create({
        data: {
          dia,
          horario,
          turmaId: Number(turmaId),
        },
        include: {
          turma: true,
        },
      });

      return res.status(201).json(aula);
    } catch (error) {
      console.error("Erro ao criar aula da semana:", error);
      return res.status(500).json({ error: "Erro ao criar aula da semana." });
    }
  },

  // Listar aulas da semana
  async read(req, res) {
    try {
      const aulas = await prisma.aulaSemana.findMany({
        include: { turma: true },
      });
      return res.status(200).json(aulas);
    } catch (error) {
      console.error("Erro ao listar aulas:", error);
      return res.status(500).json({ error: "Erro ao listar aulas da semana." });
    }
  },

  // Listar 1 aula específica
  async readOne(req, res) {
    try {
      const { id } = req.params;

      const aula = await prisma.aulaSemana.findUnique({
        where: { id: Number(id) },
        include: { turma: true },
      });

      if (!aula) {
        return res.status(404).json({ error: "Aula não encontrada." });
      }

      return res.json(aula);
    } catch (error) {
      console.error("Erro ao buscar aula:", error);
      return res.status(500).json({ error: "Erro ao buscar aula da semana." });
    }
  },

  // Atualizar aula da semana
  async update(req, res) {
    try {
      const { id } = req.params;
      const { dia, horario } = req.body;

      const aula = await prisma.aulaSemana.update({
        where: { id: Number(id) },
        data: { dia, horario },
      });

      return res.json(aula);
    } catch (error) {
      console.error("Erro ao atualizar aula:", error);
      return res.status(500).json({ error: "Erro ao atualizar aula da semana." });
    }
  },

  // Remover aula da semana
  async remove(req, res) {
    try {
      const { id } = req.params;

      const aula = await prisma.aulaSemana.findUnique({
        where: { id: Number(id) },
      });

      if (!aula) {
        return res.status(404).json({ error: "Aula não encontrada." });
      }

      await prisma.aulaSemana.delete({
        where: { id: Number(id) },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao remover aula:", error);
      return res.status(500).json({ error: "Erro ao remover aula da semana." });
    }
  },
};
