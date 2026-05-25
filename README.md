# Customer Relationship Management - AGES

MVP fullstack para gerenciamento simples de pacientes.

## Estrutura

```txt
backend/   API REST com NestJS, Prisma e SQLite
frontend/  App React com TypeScript, React Router e Axios
```

## Como rodar

### Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

A API fica em `http://localhost:3000`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O app fica em `http://localhost:5173`.