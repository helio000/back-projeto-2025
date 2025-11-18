const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

const encripta = async (senha) => {
    if (!senha) return null;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senha, salt);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
        throw new Error('Erro ao criar hash');
    }
}

async function main() {
    await prisma.professor.createMany({
        data: [
            { nome: "Robson", email: "robson@email.com", cpf: "111.222.333-44" },
            { nome: "Reenye", email: "reenye@email.com", cpf: "111.111.111-11" }
        ],
    })

    await prisma.turma.createMany({
        data: [
            {
                "nome": "Turma Jiu-Jitsu",
                "arteMarcial": "Jiu-Jitsu",
                "professorId": 1
            },
            {
                "nome": "Turma Capoeira",
                "arteMarcial": "Capoeira",
                "professorId": 1
            },
            {
                "nome": "Turma karate",
                "arteMarcial": "karate",
                "professorId": 2
            },
            {
                "nome": "Turma Capoeira2",
                "arteMarcial": "Capoeira",
                "professorId": 2
            }
        ],
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })