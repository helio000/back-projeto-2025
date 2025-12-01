let professores = [];

// Criar professor
const create = async (req, res) => {
  try {
    const { nome, email, telefone, arteMarcial } = req.body;

    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    // Verifica Professor duplicado
    if (professores.find(p => p.email === email)) {
      return res.status(400).json({ error: "Professor já cadastrado com esse e-mail." });
    }

    const id = professores.length + 1;
    const professor = { id, nome, email, telefone, arteMarcial };

    professores.push(professor);

    return res.status(201).json(professor);
  } catch (error) {
    console.error("Erro ao criar professor:", error);
    return res.status(500).json({ error: "Erro interno ao criar professor." });
  }
};

// Listar professores
const read = async (req, res) => {
  try {
    return res.status(200).json(professores);
  } catch (error) {
    console.error("Erro ao listar professores:", error);
    return res.status(500).json({ error: "Erro ao listar professores." });
  }
};

// Buscar professor por ID
const readOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const professor = professores.find(p => p.id === id);

    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }

    return res.status(200).json(professor);
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    return res.status(500).json({ error: "Erro interno ao buscar professor." });
  }
};

module.exports = { create, read, readOne };
