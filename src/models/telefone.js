const mongoose = require('mongoose');

const telefoneSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: false
  },
  alunoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno',
    required: false
  },
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: false
  }
});

const Telefone = mongoose.model('Telefone', telefoneSchema);

module.exports = Telefone;
