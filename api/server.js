require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { create, read, readOne, update, remove, login, updateNotas } = require('../src/controllers/aluno.js');
const {
  create: createProfessor,
  read: readProfessor,
  readOne: readOneProfessor,
  update: updateProfessor,
  remove: removeProfessor,
  loginProfessor
} = require('../src/controllers/professor.js');

const {
  read: readPlanejamento,
  create: createPlanejamento,
  update: updatePlanejamento,
  remove: removePlanejamento
} = require('../src/controllers/planejamento.js');


const app = express();
const port = process.env.PORT || 3100;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas Alunos
app.get('/alunos', read);
app.get('/alunos/:id', readOne);
app.post('/alunos', create);
app.put('/alunos/:id', update);
app.delete('/alunos/:id', remove);

// Login Alunos
app.post('/alunos/login', login);

// Rota para atualizar as notas dos alunos
app.put('/alunos/:id/notas', updateNotas);

// Rotas Professores
app.get('/professores', readProfessor);
app.get('/professores/:id', readOneProfessor);
app.post('/professores', createProfessor);
app.put('/professores/:id', updateProfessor);
app.delete('/professores/:id', removeProfessor);

// Login Professores
app.post('/professores/login', loginProfessor);

// ✅ Rotas Planejamento
app.get('/planejamentos', readPlanejamento);
app.post('/planejamentos', createPlanejamento);
app.put('/planejamentos/:id', updatePlanejamento);
app.delete('/planejamentos/:id', removePlanejamento);

// Rota inicial
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Start do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
