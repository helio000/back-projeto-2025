const express = require('express');
const serverless = require('serverless-http');
const app = express();
app.use(express.json());

// suas rotas aqui
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

module.exports.handler = serverless(app);
