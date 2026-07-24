# AvantbootCamp-Full-Stack-DFS-2026.2-
Sistema de Agendamento de Quadras Esportivas Full Stack

# 🏟️ Sistema de Agendamento de Quadras Esportivas

## 📌 Sobre o Projeto

O **Sistema de Agendamento de Quadras Esportivas** foi desenvolvido como parte do projeto da disciplina **Desenvolvimento Full Stack Básico (DFS-2026.2)**.

O objetivo da aplicação é modernizar o processo de gerenciamento de quadras esportivas, substituindo controles manuais por um sistema web capaz de cadastrar jogadores, quadras e reservas, garantindo a organização da agenda e impedindo conflitos de horários.

O sistema foi projetado seguindo uma arquitetura em camadas (Controller, Service e Repository), proporcionando um código organizado, de fácil manutenção e preparado para futuras evoluções.

---

# 🎯 Objetivos do Projeto

O sistema permite:

* Cadastro de jogadores;
* Cadastro de quadras esportivas;
* Cadastro de reservas;
* Consulta da agenda das quadras;
* Validação automática de conflitos de horário;
* Gerenciamento completo das reservas através de operações CRUD.

---

# 🚀 Tecnologias Utilizadas

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL

## Validação de Dados

* Zod

## Controle de Versão

* Git
* GitHub

## Ambiente de Desenvolvimento

* Visual Studio Code
* Prisma Studio
* Node Package Manager (NPM)

---

# 🧪 Ferramentas Utilizadas para Testes

Durante o desenvolvimento foram utilizadas ferramentas específicas para validar todas as funcionalidades da API.

## Insomnia

O **Insomnia** foi utilizado para realizar testes completos dos endpoints REST.

Com ele foram executados testes de:

* GET
* POST
* PUT
* DELETE

Também foram validados:

* códigos de resposta HTTP;
* estrutura das respostas JSON;
* mensagens de erro;
* tratamento de exceções;
* regras de negócio.

---

## Prisma Studio

O Prisma Studio foi utilizado para:

* visualizar os registros do banco;
* validar relacionamentos;
* confirmar inserções;
* acompanhar atualizações;
* verificar exclusões.

---

## PostgreSQL

O banco PostgreSQL foi utilizado para validar:

* persistência dos dados;
* integridade referencial;
* relacionamentos entre tabelas;
* restrições de chave estrangeira.

---

# 🏗️ Arquitetura da Aplicação

O projeto foi desenvolvido seguindo uma arquitetura em camadas.

```text
Cliente
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Repositories
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

Essa arquitetura promove:

* separação de responsabilidades;
* reutilização de código;
* facilidade de manutenção;
* melhor organização do projeto.

---

# 📁 Estrutura do Projeto

```text
backend/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── app.js
│
├── package.json
├── server.js
└── .env
```

---

# 🗄️ Banco de Dados

O sistema utiliza PostgreSQL como banco de dados relacional.

As entidades implementadas são:

### Jogadores

* id
* nome
* email
* telefone

### Quadras

* id
* nome
* modalidade
* localizacao

### Reservas

* id
* jogadorId
* quadraId
* dataHoraInicio
* dataHoraFim

Todos os relacionamentos são gerenciados pelo Prisma ORM.

---

# ⚙️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

## 2. Acessar a pasta do projeto

```bash
cd backend
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Configurar o arquivo `.env`

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agendamento_quadras"
```

## 5. Executar as migrations

```bash
npx prisma migrate dev
```

## 6. Iniciar o servidor

```bash
npm run dev
```

ou

```bash
node server.js
```

---

# 📡 Funcionalidades

## Jogadores

* Cadastro
* Consulta
* Atualização
* Exclusão

## Quadras

* Cadastro
* Consulta
* Atualização
* Exclusão
* Consulta da agenda

## Reservas

* Cadastro
* Consulta
* Atualização
* Exclusão

---

# 🛡️ Regras de Negócio

O sistema implementa diversas validações para garantir a integridade dos dados.

Entre elas:

* validação dos dados de entrada utilizando Zod;
* validação de IDs;
* verificação da existência de jogadores;
* verificação da existência de quadras;
* bloqueio de reservas conflitantes;
* bloqueio da exclusão de jogadores com reservas vinculadas;
* bloqueio da exclusão de quadras com reservas vinculadas;
* tratamento padronizado de erros da API.

---

# 📅 Agenda das Quadras

A aplicação disponibiliza um endpoint específico para consulta da agenda diária de cada quadra.

A resposta informa:

* dados da quadra;
* horários ocupados;
* horários disponíveis;
* reservas existentes;
* resumo diário da ocupação.

Essa funcionalidade auxilia no planejamento e evita conflitos de agendamento.

---

# 🧪 Homologação da API

Antes da entrega, foi realizada uma homologação completa da aplicação.

Foram testados:

* CRUD de jogadores;
* CRUD de quadras;
* CRUD de reservas;
* consulta da agenda;
* validação de conflitos de horário;
* validação de dados obrigatórios;
* respostas HTTP (200, 201, 204, 400, 404, 409 e 500);
* integridade dos relacionamentos no banco de dados.

Os testes garantiram que todos os requisitos obrigatórios do projeto fossem atendidos.

---

# 💡 Melhorias Futuras

A arquitetura foi preparada para futuras evoluções, como:

* autenticação de usuários;
* painel administrativo;
* frontend em ReactJS;
* filtros por modalidade e data;
* notificações automáticas;
* dashboard gerencial;
* integração com serviços de mensagens;
* relatórios estatísticos.

---

# 👨‍💻 Equipe

Projeto desenvolvido para a disciplina **Desenvolvimento Full Stack Básico (DFS-2026.2)**.

**Integrantes:**

* Ronaldo511— Desenvolvimento Backend

* Ronaldo511— Modelagem do Banco de Dados

* Ronaldo511— Testes, Homologação e Documentação

---

# 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos como parte da disciplina **Desenvolvimento Full Stack Básico (DFS-2026.2)**.

O código-fonte pode ser utilizado para consulta e aprendizado, desde que sejam preservados os créditos aos autores.

Não é autorizada a reprodução, entrega ou apresentação deste projeto como trabalho próprio por terceiros sem a devida autorização dos autores.
