require('dotenv').config();
const express = require('express');
const cors = require('cors');

const Aluno = require('./src/controllers/aluno.js');
const Professor = require('./src/controllers/professor.js');
const Planejamento = require('./src/controllers/planejamento.js');

const app = express();
const port = process.env.PORT || 3100;

// =========================
// 🔧 Middlewares
// =========================
app.use(cors());
app.use(express.json());

// =========================
// 👨‍🎓 ROTAS - ALUNOS
// =========================
app.get('/alunos', Aluno.read);
app.get('/alunos/:id', Aluno.readOne);
app.post('/alunos', Aluno.create);
app.put('/alunos/:id', Aluno.update);
app.patch('/alunos/:id', Aluno.update);  // agora PATCH funciona também
app.delete('/alunos/:id', Aluno.remove);

// Login aluno
app.post('/alunos/login', Aluno.login);

// Atualizar notas
app.put('/alunos/:id/notas', Aluno.updateNotas);

// =========================
// 👨‍🏫 ROTAS - PROFESSORES
// =========================
app.get('/professores', Professor.read);
app.get('/professores/:id', Professor.readOne);
app.post('/professores', Professor.create);
app.put('/professores/:id', Professor.update);
app.patch('/professores/:id', Professor.update);
app.delete('/professores/:id', Professor.remove);

// Login professor
app.post('/professores/login', Professor.loginProfessor);

// =========================
// 📘 ROTAS - PLANEJAMENTO
// =========================
app.get('/planejamentos', Planejamento.read);
app.post('/planejamentos', Planejamento.create);
app.put('/planejamentos/:id', Planejamento.update);
app.delete('/planejamentos/:id', Planejamento.remove);

// =========================
// 🌐 ROTA INICIAL
// =========================
app.get('/', (req, res) => {
  res.json({ status: "API funcionando!" });
});

// =========================
// 🚀 INICIAR SERVIDOR
// =========================
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));