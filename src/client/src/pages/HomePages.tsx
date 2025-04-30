import React, { useState } from 'react';

// Define the Todo interface
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const HomePages: React.FC = () => {
    // State for todo list and new todo input
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    // Add a new todo
    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const todo: Todo = {
                id: Date.now(),
                text: newTodo,
                completed: false
            };
            setTodos([...todos, todo]);
            setNewTodo('');
        }
    };

    // Toggle todo completion status
    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Delete a todo
    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo();
    };

    return (
        <div className="home-container">
            <header>
                <h1>Lista de Tareas</h1>
            </header>

            <main>
                <form onSubmit={handleSubmit} className="todo-form">
                    <input 
                        type="text" 
                        value={newTodo} 
                        onChange={(e) => setNewTodo(e.target.value)} 
                        placeholder="Añadir nueva tarea..."
                        className="todo-input"
                    />
                    <button type="submit" className="add-button">Añadir</button>
                </form>

                <div className="todos-container">
                    {todos.length === 0 ? (
                        <p className="empty-message">No hay tareas pendientes</p>
                    ) : (
                        <ul className="todo-list">
                            {todos.map(todo => (
                                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                    <span 
                                        onClick={() => toggleTodo(todo.id)}
                                        className="todo-text"
                                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                    >
                                        {todo.text}
                                    </span>
                                    <button 
                                        onClick={() => deleteTodo(todo.id)}
                                        className="delete-button"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="todo-stats">
                    <p>Total: {todos.length}</p>
                    <p>Completadas: {todos.filter(todo => todo.completed).length}</p>
                    <p>Pendientes: {todos.filter(todo => !todo.completed).length}</p>
                </div>
            </main>
        </div>
    );
};

export default HomePages;