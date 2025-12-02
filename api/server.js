const express = require('express');
const cors = require('cors');
const routes = require('./src/router.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/', routes);

// Porta para Render / local
const PORT = process.env.PORT || 3100;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
