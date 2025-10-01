# Projeto 2025 API

Este projeto é uma API para gerenciar informações de alunos, telefones, matrículas, professores e turmas.
A API utiliza Express para o servidor, Prisma para interação com o banco de dados, e SQLite como banco de dados de exemplo.

# ⚙️ Configuração e Instalação
# 1. Clone o repositório
git clone https://github.com/helio000/projeto-2025.git

# 2. Acesse a pasta da API
cd api

# 3. Instale as dependências
npm install

# 4. Configure o banco de dados

No arquivo prisma/schema.prisma, configure o banco de dados. Exemplo com SQLite:

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}


Você pode trocar o provider para "postgresql" ou "mysql" se desejar outro banco de dados.

# 5. Execute as migrations
npx prisma migrate dev --name init


Isso criará o banco de dados e as tabelas conforme o schema definido.

# 6. Inicie o servidor
npx nodemon


O servidor estará disponível em: http://localhost:3100

# 📌 Rotas Disponíveis

A API oferece rotas para realizar operações CRUD nas entidades.

# 👤 Alunos
Método	Rota	Descrição
POST	/alunos	Criar um novo aluno
GET	/alunos	Listar todos os alunos
GET	/alunos/:id	Buscar aluno por ID
PUT	/alunos/:id	Atualizar dados do aluno
DELETE	/alunos/:id	Deletar um aluno
POST	/alunos/login	Realizar login de aluno
# 📞 Telefones
Método	Rota	Descrição
POST	/telefones	Criar um novo telefone
GET	/telefones	Listar todos os telefones
GET	/telefones/:id	Buscar telefone por ID
PUT	/telefones/:id	Atualizar telefone
DELETE	/telefones/:id	Remover telefone
# 📚 Matrículas
Método	Rota	Descrição
POST	/matriculas	Criar uma nova matrícula
GET	/matriculas	Listar todas as matrículas
GET	/matriculas/:id	Buscar matrícula por ID
PUT	/matriculas/:id	Atualizar matrícula
DELETE	/matriculas/:id	Remover matrícula
# 👨‍🏫 Professores
Método	Rota	Descrição
POST	/professores	Criar um novo professor
GET	/professores	Listar todos os professores
GET	/professores/:id	Buscar professor por ID
PUT	/professores/:id	Atualizar professor
DELETE	/professores/:id	Remover professor
# 🥋 Turmas
Método	Rota	Descrição
POST	/turmas	Criar uma nova turma
GET	/turmas	Listar todas as turmas
GET	/turmas/:id	Buscar turma por ID
PUT	/turmas/:id	Atualizar turma
DELETE	/turmas/:id	Remover turma
# 📝 Exemplos de requisições com curl
Criar um aluno
curl -X POST http://localhost:3100/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@example.com",
    "telefone": "123456789",
    "datanasc": "1990-01-01",
    "arteMarcial": "Capoeira"
  }'

Listar alunos
curl -X GET http://localhost:3100/alunos

Deletar um aluno
curl -X DELETE http://localhost:3100/alunos/1

# 🔧 Erros comuns e soluções

Erro P2002: Unique constraint failed
Significa que você está tentando criar um aluno com um email que já existe.
Solução: Verifique se o email não está duplicado.

Erro P2025: Record not found
O ID fornecido para a busca ou atualização não existe no banco de dados.
Solução: Verifique o ID fornecido e garanta que ele corresponda a um registro existente.

# 🛠️ Ferramentas e Dependências

Express: Framework para servidor HTTP.

Prisma: ORM para interagir com o banco de dados.

SQLite: Banco de dados utilizado no exemplo (pode ser substituído por MySQL, PostgreSQL, etc.).

Nodemon: Reinicia o servidor automaticamente durante o desenvolvimento.

# 💡 Dicas

Sempre que alterar o schema.prisma, rode uma nova migration:

npx prisma migrate dev --name ajuste


 Para visualizar e editar os dados do banco, utilize o Prisma Studio:

npx prisma studio

.env
```js
DATABASE_URL="mysql://root@localhost:3306/projeto-2025" 
```