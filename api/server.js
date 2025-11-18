const express = require('express');
const cors = require('cors');

const router = require('../src/router');

const port = process.env.PORT || 3100;
const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port);
});