const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno');
const alunoController = require('./alunoController');
const Professor = require('./controllers/professor');
const Telefone = require('./controllers/telefone');
const Turma = require('./controllers/turma');
const Matricula = require('./controllers/matricula');

// Rota inicial
routes.get('/', (req, res) => {
  return res.json({ titulo: 'PROJETO - Membros: Coronel, Cati e Rhay' });
});

/* =========================
   Rotas de Aluno
========================= */
routes.post('/alunos', alunoController.create);
routes.post('/alunos/login', alunoController.login);
routes.get('/alunos', alunoController.read);
routes.get('/alunos/:id', alunoController.readOne);
routes.put('/alunos/:id', alunoController.update);
routes.delete('/alunos/:id', alunoController.remove);

/* =========================
   Rotas de Professor
========================= */
routes.post('/professores', Professor.create);
routes.get('/professores', Professor.read);
routes.get('/professores/:id', Professor.readOne);
routes.put('/professores/:id', Professor.update);
routes.patch('/professores/:id', Professor.update);
routes.delete('/professores/:id', Professor.remove);

/* =========================
   Rotas de Telefone
========================= */
routes.post('/telefones', Telefone.create);
routes.get('/telefones', Telefone.read);
routes.get('/telefones/:id', Telefone.readOne);
routes.put('/telefones/:id', Telefone.update);
routes.patch('/telefones/:id', Telefone.update);
routes.delete('/telefones/:id', Telefone.remove);

/* =========================
   Rotas de Turma
========================= */
routes.post('/turmas', Turma.create);
routes.get('/turmas', Turma.read);
routes.get('/turmas/:id', Turma.readOne);
routes.put('/turmas/:id', Turma.update);
routes.patch('/turmas/:id', Turma.update);
routes.delete('/turmas/:id', Turma.remove);

/* =========================
   Rotas de Matrícula
========================= */
routes.post('/matriculas', Matricula.create);
routes.get('/matriculas', Matricula.read);
routes.get('/matriculas/:id', Matricula.readOne);
routes.put('/matriculas/:id', Matricula.update);
routes.patch('/matriculas/:id', Matricula.update);
routes.delete('/matriculas/:id', Matricula.remove);

module.exports = routes;

