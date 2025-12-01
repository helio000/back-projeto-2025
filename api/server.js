// api/server.js
const express = require('express');
const serverless = require('serverless-http'); // npm install serverless-http
const routes = require('../src/routes'); // Ajuste conforme a estrutura da sua pasta

const app = express();
app.use(express.json());

// CORS, caso precise (opcional)
const cors = require('cors');
app.use(cors());

// Rotas
app.use('/', routes);

// Exporta para Vercel funcionar como serverless
module.exports.handler = serverless(app);
