// prisma.js
const { PrismaClient } = require('@prisma/client');

// Cria uma instância única do Prisma
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // logs úteis para desenvolvimento
});

// Exporta para ser usado em todos os controllers
module.exports = prisma;
