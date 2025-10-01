const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  especialidade: {
    type: String,
    required: false
  }
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
