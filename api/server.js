const express = require('express');
const cors = require('cors');
const routes = require('../api/src/router'); // mantém assim se sua pasta é /src

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

// Exporta o app diretamente
module.exports = app;
