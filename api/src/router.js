const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno');
const Professor = require('./controllers/professor');
const Turma = require('./controllers/turma');
const Matricula = require('./controllers/matricula');
const Planejamento = require('./controllers/planejamento');
const AulaSemana = require('./controllers/aulaSemana'); 

routes.get('/', (req, res) => {
  return res.json({ titulo: 'PROJETO - Membros: Coronel, Cati e Rhay' });
});

/* ===========================
      ALUNOS
=========================== */

// Login precisa vir ANTES das rotas com :id para não dar conflito
routes.post('/alunos/login', Aluno.login);

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:id', Aluno.readOne);
routes.patch('/alunos/:id', Aluno.update);
routes.delete('/alunos/:id', Aluno.remove);
routes.post('/alunos/:id/update', Aluno.update);
routes.put('/alunos/:id/notas', Aluno.updateNotas);

/* ===========================
      PROFESSORES
=========================== */
routes.post('/professores', Professor.create);
routes.get('/professores', Professor.read);
routes.get('/professores/:id', Professor.readOne);
routes.put('/professores/:id', Professor.update);
routes.patch('/professores/:id', Professor.update);
routes.delete('/professores/:id', Professor.remove);

/* ===========================
      TURMAS
=========================== */
routes.post('/turmas', Turma.create);
routes.get('/turmas', Turma.read);
routes.get('/turmas/:id', Turma.readOne);
routes.put('/turmas/:id', Turma.update);
routes.patch('/turmas/:id', Turma.update);
routes.delete('/turmas/:id', Turma.remove);

/* ===========================
      MATRÍCULAS
=========================== */
routes.post('/matriculas', Matricula.create);
routes.get('/matriculas', Matricula.read);
routes.get('/matriculas/:id', Matricula.readOne);
routes.put('/matriculas/:id', Matricula.update);
routes.patch('/matriculas/:id', Matricula.update);
routes.delete('/matriculas/:id', Matricula.remove);

/* ===========================
      PLANEJAMENTO
=========================== */
routes.post('/planejamentos', Planejamento.create);
routes.get('/planejamentos', Planejamento.read);
routes.put('/planejamentos/:id', Planejamento.update);
routes.delete('/planejamentos/:id', Planejamento.remove);

/* ===========================
      AULAS DA SEMANA
=========================== */
routes.post('/aulas-semana', AulaSemana.create);
routes.get('/aulas-semana', AulaSemana.read);
routes.get('/aulas-semana/:id', AulaSemana.readOne);
routes.put('/aulas-semana/:id', AulaSemana.update);
routes.delete('/aulas-semana/:id', AulaSemana.remove);

module.exports = routes;
