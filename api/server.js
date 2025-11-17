require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Controllers (agora com o caminho correto)
const alunoController = require('./src/controllers/aluno.js');
const professorController = require('./src/controllers/professor.js');
const planejamentoController = require('./src/controllers/planejamento.js');

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

// ROTAS ALUNOS
app.get('/alunos', alunoController.read);
app.get('/alunos/:id', alunoController.readOne);
app.post('/alunos', alunoController.create);
app.put('/alunos/:id', alunoController.update);
app.delete('/alunos/:id', alunoController.remove);

app.post('/alunos/login', alunoController.login);
app.put('/alunos/:id/notas', alunoController.updateNotas);

// ROTAS PROFESSORES
app.get('/professores', professorController.read);
app.get('/professores/:id', professorController.readOne);
app.post('/professores', professorController.create);
app.put('/professores/:id', professorController.update);
app.delete('/professores/:id', professorController.remove);

app.post('/professores/login', professorController.loginProfessor);

// ROTAS PLANEJAMENTO
app.get('/planejamentos', planejamentoController.read);
app.post('/planejamentos', planejamentoController.create);
app.put('/planejamentos/:id', planejamentoController.update);
app.delete('/planejamentos/:id', planejamentoController.remove);

// ROTA INICIAL
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
