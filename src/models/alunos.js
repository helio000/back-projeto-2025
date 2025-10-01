const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  matricula: {
    type: Number,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  }
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
