#  Todo App

A full-stack Todo application built with **React**, **Express**, **PostgreSQL**, and **Prisma** — created as an onboarding project to learn the stack before contributing to real issues.

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

##  Features

- ➕ Add new todos
- 📋 View all todos
- ✔️ Toggle completion status
- 🗑️ Delete todos
- 💾 Data persists in a real PostgreSQL database — refresh the page and nothing disappears

##  Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Vite)                        |
| Backend    | Express.js                          |
| Database   | PostgreSQL (via Docker)             |
| ORM        | Prisma (v7)                         |

##  Architecture

```
┌──────────────┐   HTTP/REST    ┌──────────────┐   SQL    ┌──────────────┐
│   React      │ ─────────────► │   Express    │ ───────► │  PostgreSQL  │
│  (frontend)  │ ◄───────────── │  (backend)   │ ◄─────── │  (database)  │
└──────────────┘     JSON       └──────────────┘  Prisma  └──────────────┘
```

The frontend never talks to the database directly — every request goes through the Express API, which uses Prisma to run safe, type-checked queries against Postgres.

##  Project Structure

```
todo-app/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Database model definition
│   │   └── migrations/        # Migration history
│   ├── src/
│   │   └── index.js           # Express server + all routes
│   ├── docker-compose.yml     # PostgreSQL container config
│   └── prisma.config.ts       # Prisma CLI config (v7+)
├── frontend/
│   └── src/
│       └── App.jsx            # Main React component
└── README.md
```

##  API Routes

| Method | Endpoint        | Description              |
|--------|-----------------|---------------------------|
| POST   | `/todos`        | Create a new todo        |
| GET    | `/todos`        | Get all todos             |
| GET    | `/todos/:id`    | Get a single todo by id   |
| PATCH  | `/todos/:id`    | Update a todo             |
| DELETE | `/todos/:id`    | Delete a todo             |

##  Getting Started

### Prerequisites
- Node.js
- Docker

### 1. Clone the repo
```bash
git clone https://github.com/mahyda07/todo-app.git
cd todo-app
```

### 2. Set up the backend
```bash
cd backend
npm install
docker compose up -d
npx prisma generate
npx prisma migrate dev
```

Create a `.env` file in `backend/`:
```
DATABASE_URL="postgresql://todo_user:todo_password@localhost:5433/todo_db?schema=public"
PORT=5000
```

Start the server:
```bash
node src/index.js
```

### 3. Set up the frontend
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

##  License

MIT
