const express = require('express');
const routes = express.Router();

const Aluno = require('./src/controllers/aluno');
const Professor = require('./src/controllers/professor');
const Telefone = require('./src/controllers/telefone');
const Turma = require('./src/controllers/turma');
const Matricula = require('./src/controllers/matricula');

// 🔑 CORREÇÃO AQUI: Importação do Controller de Planejamento
const Planejamento = require('./src/controllers/Planejamento'); // 👈 Linha corrigida
const AulaSemana = require('./src/controllers/aulaSemana'); 

// Rota inicial
routes.get('/', (req, res) => {
  return res.json({ titulo: 'PROJETO - Membros: Coronel, Cati e Rhay' });
});

// Rotas de Aluno
routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:id', Aluno.readOne);
routes.patch('/alunos/:id', Aluno.update);
routes.delete('/alunos/:id', Aluno.remove);
routes.post('/alunos/:id/update', Aluno.update);

// Login do Aluno
routes.post('/alunos/login', Aluno.login);

// Atualizar notas do aluno
routes.put('/alunos/:id/notas', Aluno.updateNotas);

// Rotas de Professor
routes.post('/professores', Professor.create);
routes.get('/professores', Professor.read);
routes.get('/professores/:id', Professor.readOne);
routes.put('/professores/:id', Professor.update);
routes.patch('/professores/:id', Professor.update);
routes.delete('/professores/:id', Professor.remove);

// Rotas de Telefone
routes.post('/telefones', Telefone.create);
routes.get('/telefones', Telefone.read);
routes.get('/telefones/:id', Telefone.readOne);
routes.put('/telefones/:id', Telefone.update);
routes.patch('/telefones/:id', Telefone.update);
routes.delete('/telefones/:id', Telefone.remove);

// Rotas de Turma
routes.post('/turmas', Turma.create);
routes.get('/turmas', Turma.read);
routes.get('/turmas/:id', Turma.readOne);
routes.put('/turmas/:id', Turma.update);
routes.patch('/turmas/:id', Turma.update);
routes.delete('/turmas/:id', Turma.remove);

// Rotas de Matrícula
routes.post('/matriculas', Matricula.create);
routes.get('/matriculas', Matricula.read);
routes.get('/matriculas/:id', Matricula.readOne);
routes.put('/matriculas/:id', Matricula.update);
routes.patch('/matriculas/:id', Matricula.update);
routes.delete('/matriculas/:id', Matricula.remove);

// Rotas de Planejamento (Aulas da semana) - AGORA USAM O CONTROLLER IMPORTADO
routes.post('/planejamentos', Planejamento.create);
routes.get('/planejamentos', Planejamento.read);
routes.put('/planejamentos/:id', Planejamento.update);
routes.delete('/planejamentos/:id', Planejamento.remove);

// 🔹 Rotas para Aulas da Semana
routes.post('/aulas-semana', AulaSemana.create);       // cria a aula da semana
routes.get('/aulas-semana', AulaSemana.read);          // lista todas
routes.get('/aulas-semana/:id', AulaSemana.readOne);   // mostra uma específica
routes.put('/aulas-semana/:id', AulaSemana.update);    // professor altera a aula
routes.delete('/aulas-semana/:id', AulaSemana.remove); // remove uma aula da semana

module.exports = routes;
