import { useState, useEffect } from 'react';

const API = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await fetch(`${API}/todos`);
    setTodos(await res.json());
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await fetch(`${API}/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div>
      <h1>Todos</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)} />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
