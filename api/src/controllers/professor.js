let professores = [];

// Criar professor
const create = async (req, res) => {
  const { nome, email, telefone, arteMarcial } = req.body;

  if (!nome || !email || !telefone)
    return res.status(400).json({ error: "Campos obrigatórios faltando." });

  const id = professores.length + 1;
  const professor = { id, nome, email, telefone, arteMarcial };

  if (professores.find(p => p.email === email))
    return res.status(400).json({ error: "Professor já cadastrado com esse e-mail." });

  professores.push(professor);
  res.status(201).json(professor);
};

// Listar professores
const read = async (req, res) => res.status(200).json(professores);

// Buscar professor por ID
const readOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const professor = professores.find(p => p.id === id);
  if (!professor) return res.status(404).json({ error: "Professor não encontrado" });
  res.status(200).json(professor);
};

module.exports = { create, read, readOne };
