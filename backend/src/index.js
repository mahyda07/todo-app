const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Todo API is running'));


app.post('/todos', async (req, res) => {
  const todo = await prisma.todo.create({ data: { title: req.body.title } });
  res.status(201).json(todo);
});

app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});


app.get('/todos/:id', async (req, res) => {
  const todo = await prisma.todo.findUnique({ where: { id: Number(req.params.id) } });
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

app.patch('/todos/:id', async (req, res) => {
  const todo = await prisma.todo.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(todo);
});


app.delete('/todos/:id', async (req, res) => {
  await prisma.todo.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
