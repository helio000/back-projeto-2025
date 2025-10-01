// Se você quiser usar Express:
import express from 'express';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

// Rota de teste
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Backend funcionando no Vercel!' });
});

// Exemplo de rota POST
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.status(200).json({ received: data });
});

// Exporta como serverless
export default serverless(app);