// Simula o Prisma com arrays em memória
let professores = [];

// Criar professor
const create = async (req, res) => {
  try {
    const { nome, email, telefone, arteMarcial, datanasc, cpf } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nome || !email || !telefone || !datanasc || !cpf) {
      return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    // Verifica se já existe um professor com o mesmo email ou cpf
    const existing = professores.find(p => p.email === email.trim().toLowerCase());
    if (existing) return res.status(400).json({ error: 'Email já existe para outro professor!' });

    const cpfExists = professores.find(p => p.cpf === cpf.trim());
    if (cpfExists) return res.status(400).json({ error: 'CPF já cadastrado!' });

    // Converte a data de nascimento corretamente
    const dataNascimento = new Date(datanasc);

    // Criação do professor no banco de dados (simulado em memória)
    const professor = {
      id: professores.length + 1,
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim(),
      arteMarcial: arteMarcial?.trim() || null,  // Se não for fornecido, deixa como null
      datanasc: dataNascimento,
      cpf: cpf.trim()
    };

    professores.push(professor);

    res.status(201).json(professor); // Retorna o professor criado
  } catch (error) {
    console.error("Erro ao criar professor:", error);
    res.status(500).json({ error: "Erro interno do servidor ao criar professor." });
  }
};

// Listar todos os professores
const read = async (req, res) => {
  try {
    res.status(200).json(professores);
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    res.status(500).json({ error: "Erro interno do servidor ao listar professores." });
  }
};

// Buscar professor por ID
const readOne = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    const professor = professores.find(p => p.id === idNum);
    if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });
    res.status(200).json(professor);
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    res.status(500).json({ error: "Erro interno do servidor ao buscar professor." });
  }
};

// Atualizar professor
const update = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    const { email, cpf, telefone, arteMarcial, datanasc, nome } = req.body;

    // Verifica se já existe outro professor com o mesmo email ou cpf
    if (email) {
      const existing = professores.find(p => p.email === email.trim().toLowerCase());
      if (existing && existing.id !== idNum) return res.status(400).json({ error: 'Email já existe para outro professor!' });
    }

    if (cpf) {
      const cpfExists = professores.find(p => p.cpf === cpf.trim());
      if (cpfExists && cpfExists.id !== idNum) return res.status(400).json({ error: 'CPF já cadastrado!' });
    }

    // Atualiza professor em memória
    const professor = professores.find(p => p.id === idNum);
    if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });

    professor.nome = nome?.trim() || professor.nome;
    professor.email = email?.trim().toLowerCase() || professor.email;
    professor.telefone = telefone?.trim() || professor.telefone;
    professor.arteMarcial = arteMarcial?.trim() || professor.arteMarcial;
    professor.datanasc = datanasc ? new Date(datanasc) : professor.datanasc;
    professor.cpf = cpf?.trim() || professor.cpf;

    res.status(200).json(professor);
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    res.status(500).json({ error: "Erro interno do servidor ao atualizar professor." });
  }
};

// Remover professor
const remove = async (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });

  try {
    const index = professores.findIndex(p => p.id === idNum);
    if (index === -1) return res.status(404).json({ error: 'Professor não encontrado' });

    professores.splice(index, 1);
    res.status(200).json({ message: 'Professor removido com sucesso' });
  } catch (error) {
    console.error("Erro ao remover professor:", error);
    res.status(500).json({ error: "Erro interno do servidor ao remover professor." });
  }
};

// Login do professor
const loginProfessor = async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) return res.status(400).json({ error: "Nome e e-mail são obrigatórios" });

  try {
    const professor = professores.find(p => p.nome === nome.trim() && p.email === email.trim().toLowerCase());
    if (!professor) return res.status(401).json({ error: "Nome ou e-mail incorretos" });

    res.status(200).json({ message: "Login realizado com sucesso!", professor });
  } catch (error) {
    console.error("Erro no login do professor:", error);
    res.status(500).json({ error: "Erro interno do servidor durante o login." });
  }
};

module.exports = { create, read, readOne, update, remove, loginProfessor };
