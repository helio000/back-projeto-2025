// prisma.js
const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.NODE_ENV === 'production') {
  // Em produção, sempre cria uma nova instância
  prisma = new PrismaClient();
} else {
  // Em desenvolvimento, reutiliza a instância para evitar múltiplas conexões
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

module.exports = prisma;
