// api/server.js
const express = require('express');
const serverless = require('serverless-http');
const routes = require('../routes'); // Ajuste o caminho conforme sua estrutura

const app = express();
app.use(express.json());

// Middleware simples para debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Usando suas rotas
app.use('/', routes);

// Exporta para serverless
module.exports.handler = serverless(app);
