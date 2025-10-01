const mongoose = require('mongoose');

const matriculaSchema = new mongoose.Schema({
  alunoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno',
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  curso: {
    type: String,
    required: true
  }
});

const Matricula = mongoose.model('Matricula', matriculaSchema);

module.exports = Matricula;
