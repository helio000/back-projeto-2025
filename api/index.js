// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const routes = require('../routes'); // caminho para o arquivo que você me mandou

const app = express();
app.use(express.json());
app.use('/', routes); // todas as rotas

// Exporta para Vercel
module.exports = app;           // para testes locais
module.exports.handler = serverless(app); // para Vercel
