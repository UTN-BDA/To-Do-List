"use client"

import type React from "react"
import { useState } from "react"
import "../styles/HomePages.css"

// Define the Todo interface
interface Todo {
    id: number
    text: string
    completed: boolean
}

const HomePages: React.FC = () => {
    // State for todo list and new todo input
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState<string>("")
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    // Add a new todo
    const addTodo = async () => {
        if (newTodo.trim() !== "") {
            setIsAdding(true)

            // Simular delay para mostrar loading
            await new Promise(resolve => setTimeout(resolve, 300))

            const todo: Todo = {
                id: Date.now(),
                text: newTodo,
                completed: false,
            }
            setTodos([...todos, todo])
            setNewTodo("")
            setIsAdding(false)
        }
    }

    // Toggle todo completion status
    const toggleTodo = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    }

    // Delete a todo
    const deleteTodo = async (id: number) => {
        setDeletingId(id)

        // Simular delay para mostrar loading
        await new Promise(resolve => setTimeout(resolve, 300))

        setTodos(todos.filter((todo) => todo.id !== id))
        setDeletingId(null)
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addTodo()
    }

    // Handle key press for quick actions
    const handleKeyPress = (e: React.KeyboardEvent, todoId: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleTodo(todoId)
        }
    }

    return (
        <div className="home-container">
            <div className="home-wrapper">
                <header className="home-header">
                    <div className="header-content">
                        <div className="header-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4l-3-3z" />
                                <path d="M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="home-title">Lista de Tareas</h1>
                            <p className="home-subtitle">Organiza tu día de manera eficiente</p>
                        </div>
                    </div>
                </header>

                <main className="home-main">
                    <div className="todo-form-container">
                        <form onSubmit={handleSubmit} className="todo-form">
                            <div className="form-header">
                                <h2 className="form-title">Nueva Tarea</h2>
                                <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                            </div>

                            <div className="input-container">
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14,2 14,8 20,8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                        <polyline points="10,9 9,9 8,9" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={newTodo}
                                        onChange={(e) => setNewTodo(e.target.value)}
                                        placeholder="¿Qué necesitas hacer hoy?"
                                        className="todo-input"
                                        disabled={isAdding}
                                    />
                                </div>
                                <button type="submit" className="add-button" disabled={isAdding || !newTodo.trim()}>
                                    {isAdding ? (
                                        <>
                                            <svg className="loading-spinner" viewBox="0 0 24 24">
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    strokeDasharray="32"
                                                    strokeDashoffset="32"
                                                >
                                                    <animate
                                                        attributeName="stroke-dasharray"
                                                        dur="2s"
                                                        values="0 32;16 16;0 32;0 32"
                                                        repeatCount="indefinite"
                                                    />
                                                    <animate
                                                        attributeName="stroke-dashoffset"
                                                        dur="2s"
                                                        values="0;-16;-32;-32"
                                                        repeatCount="indefinite"
                                                    />
                                                </circle>
                                            </svg>
                                            Agregando...
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="8" x2="12" y2="16" />
                                                <line x1="8" y1="12" x2="16" y2="12" />
                                            </svg>
                                            Añadir
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="todos-section">
                        <div className="section-header">
                            <h2 className="section-title">Mis Tareas</h2>
                            <div className="todo-stats">
                                <div className="stat-item">
                                    <span className="stat-number">{todos.length}</span>
                                    <span className="stat-label">Total</span>
                                </div>
                                <div className="stat-item completed">
                                    <span className="stat-number">{todos.filter((todo) => todo.completed).length}</span>
                                    <span className="stat-label">Completadas</span>
                                </div>
                                <div className="stat-item pending">
                                    <span className="stat-number">{todos.filter((todo) => !todo.completed).length}</span>
                                    <span className="stat-label">Pendientes</span>
                                </div>
                            </div>
                        </div>

                        <div className="todos-container">
                            {todos.length === 0 ? (
                                <div className="empty-state">
                                    <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4l-3-3z" />
                                        <path d="M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12" />
                                    </svg>
                                    <h3 className="empty-title">¡Todo despejado!</h3>
                                    <p className="empty-message">No hay tareas pendientes. ¡Perfecto momento para relajarse!</p>
                                </div>
                            ) : (
                                <ul className="todo-list">
                                    {todos.map((todo) => (
                                        <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                                            <div className="todo-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={todo.completed}
                                                    onChange={() => toggleTodo(todo.id)}
                                                    className="custom-checkbox"
                                                    id={`todo-${todo.id}`}
                                                />
                                                <label htmlFor={`todo-${todo.id}`} className="checkbox-label">
                                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <polyline points="20,6 9,17 4,12" />
                                                    </svg>
                                                </label>
                                            </div>

                                            <span
                                                onClick={() => toggleTodo(todo.id)}
                                                onKeyPress={(e) => handleKeyPress(e, todo.id)}
                                                className="todo-text"
                                                tabIndex={0}
                                                role="button"
                                                aria-label={`Marcar como ${todo.completed ? "pendiente" : "completada"}: ${todo.text}`}
                                            >
                                                {todo.text}
                                            </span>

                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="delete-button"
                                                disabled={deletingId === todo.id}
                                                title="Eliminar tarea"
                                                aria-label={`Eliminar tarea: ${todo.text}`}
                                            >
                                                {deletingId === todo.id ? (
                                                    <svg className="loading-spinner-small" viewBox="0 0 24 24">
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                            strokeDasharray="32"
                                                            strokeDashoffset="32"
                                                        >
                                                            <animate
                                                                attributeName="stroke-dasharray"
                                                                dur="2s"
                                                                values="0 32;16 16;0 32;0 32"
                                                                repeatCount="indefinite"
                                                            />
                                                            <animate
                                                                attributeName="stroke-dashoffset"
                                                                dur="2s"
                                                                values="0;-16;-32;-32"
                                                                repeatCount="indefinite"
                                                            />
                                                        </circle>
                                                    </svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <polyline points="3,6 5,6 21,6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        <line x1="10" y1="11" x2="10" y2="17" />
                                                        <line x1="14" y1="11" x2="14" y2="17" />
                                                    </svg>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default HomePages
