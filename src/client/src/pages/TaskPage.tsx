"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/TaskPage.css"

interface Task {
    id: number
    title: string
    description: string
    completed: boolean
}

const TaskPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [newTaskDescription, setNewTaskDescription] = useState<string>("")
    const [isAddingTask, setIsAddingTask] = useState<boolean>(false)

    const [editId, setEditId] = useState<number | null>(null)
    const [editTitle, setEditTitle] = useState<string>("")
    const [editDescription, setEditDescription] = useState<string>("")
    const [isUpdatingTask, setIsUpdatingTask] = useState<boolean>(false)

    const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await axios.get<Task[]>("/api/tasks")
                setTasks(response.data)
            } catch (err) {
                setError("No se pudieron cargar las tareas. Por favor, intenta nuevamente.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    const showSuccessMessage = (message: string) => {
        setSuccess(message)
        setTimeout(() => setSuccess(null), 3000)
    }

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTaskTitle.trim()) return

        try {
            setIsAddingTask(true)
            setError(null)
            const response = await axios.post<Task>("/api/tasks", {
                title: newTaskTitle,
                description: newTaskDescription,
                completed: false,
            })

            setTasks([...tasks, response.data])
            setNewTaskTitle("")
            setNewTaskDescription("")
            showSuccessMessage("¡Tarea agregada exitosamente!")
        } catch (err) {
            setError("No se pudo agregar la tarea. Por favor, intenta nuevamente.")
            console.error(err)
        } finally {
            setIsAddingTask(false)
        }
    }

    const handleDeleteTask = async (id: number) => {
        try {
            setDeletingTaskId(id)
            setError(null)
            await axios.delete(`/api/tasks/${id}`)
            setTasks(tasks.filter((task) => task.id !== id))
            showSuccessMessage("Tarea eliminada exitosamente")
        } catch (err) {
            setError("No se pudo eliminar la tarea. Por favor, intenta nuevamente.")
            console.error(err)
        } finally {
            setDeletingTaskId(null)
        }
    }

    const handleToggleComplete = async (task: Task) => {
        try {
            setError(null)
            const updatedTask = { ...task, completed: !task.completed }
            await axios.put(`/api/tasks/${task.id}`, updatedTask)
            setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)))
            showSuccessMessage(
                updatedTask.completed ? "Tarea marcada como completada" : "Tarea marcada como pendiente"
            )
        } catch (err) {
            setError("No se pudo actualizar la tarea. Por favor, intenta nuevamente.")
            console.error(err)
        }
    }

    const startEdit = (task: Task) => {
        setEditId(task.id)
        setEditTitle(task.title)
        setEditDescription(task.description)
    }

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editId) return

        try {
            setIsUpdatingTask(true)
            setError(null)
            const taskToUpdate = tasks.find((t) => t.id === editId)
            if (!taskToUpdate) return

            const updatedTask = {
                ...taskToUpdate,
                title: editTitle,
                description: editDescription,
            }

            await axios.put(`/api/tasks/${editId}`, updatedTask)
            setTasks(tasks.map((t) => (t.id === editId ? updatedTask : t)))
            setEditId(null)
            showSuccessMessage("Tarea actualizada exitosamente")
        } catch (err) {
            setError("No se pudo actualizar la tarea. Por favor, intenta nuevamente.")
            console.error(err)
        } finally {
            setIsUpdatingTask(false)
        }
    }

    if (loading) {
        return (
            <div className="task-page">
                <div className="loading-container">
                    <div className="loading-spinner">
                        <svg viewBox="0 0 24 24">
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
                    </div>
                    <p>Cargando tareas...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="task-page">
            <div className="task-header">
                <h1 className="task-title">Gestor de Tareas</h1>
                <p className="task-subtitle">Organiza y gestiona tus tareas de manera eficiente</p>
            </div>

            {error && (
                <div className="error-message">
                    <svg className="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {error}
                </div>
            )}

            {success && (
                <div className="success-message">
                    <svg className="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                    {success}
                </div>
            )}

            <div className="task-form-container">
                <div className="task-form">
                    <div className="form-header">
                        <h2 className="form-title">Agregar Nueva Tarea</h2>
                        <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                    </div>

                    <form onSubmit={handleAddTask}>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Título de la tarea
                            </label>
                            <div className="input-container">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10,9 9,9 8,9" />
                                </svg>
                                <input
                                    id="title"
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="Ingresa el título de la tarea"
                                    className="form-input"
                                    required
                                    disabled={isAddingTask}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="form-label">
                                Descripción (opcional)
                            </label>
                            <div className="input-container">
                                <svg className="input-icon textarea-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14,2 14,8 20,8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                                <textarea
                                    id="description"
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    placeholder="Describe los detalles de la tarea"
                                    className="form-textarea"
                                    rows={3}
                                    disabled={isAddingTask}
                                />
                            </div>
                        </div>

                        <button type="submit" className="add-task-button" disabled={isAddingTask}>
                            {isAddingTask ? (
                                <>
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
                                    Agregando...
                                </>
                            ) : (
                                <>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                    Agregar Tarea
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <div className="task-list-container">
                <div className="task-list">
                    <div className="list-header">
                        <h2 className="list-title">Mis Tareas</h2>
                        <div className="task-stats">
                            <span className="stat">
                                Total: <strong>{tasks.length}</strong>
                            </span>
                            <span className="stat">
                                Completadas: <strong>{tasks.filter((t) => t.completed).length}</strong>
                            </span>
                            <span className="stat">
                                Pendientes: <strong>{tasks.filter((t) => !t.completed).length}</strong>
                            </span>
                        </div>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4l-3-3z" />
                                <path d="M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12" />
                            </svg>
                            <h3>No hay tareas disponibles</h3>
                            <p>¡Agrega una nueva tarea para comenzar a organizarte!</p>
                        </div>
                    ) : (
                        <ul className="tasks-grid">
                            {tasks.map((task) => (
                                <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                                    {editId === task.id ? (
                                        <form onSubmit={handleSaveEdit} className="edit-form">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    className="form-input"
                                                    placeholder="Título de la tarea"
                                                    required
                                                    disabled={isUpdatingTask}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <textarea
                                                    value={editDescription}
                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                    className="form-textarea"
                                                    placeholder="Descripción de la tarea"
                                                    rows={2}
                                                    disabled={isUpdatingTask}
                                                />
                                            </div>
                                            <div className="edit-actions">
                                                <button type="submit" className="save-button" disabled={isUpdatingTask}>
                                                    {isUpdatingTask ? (
                                                        <>
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
                                                            Guardando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                                                <polyline points="17,21 17,13 7,13 7,21" />
                                                                <polyline points="7,3 7,8 15,8" />
                                                            </svg>
                                                            Guardar
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditId(null)}
                                                    className="cancel-button"
                                                    disabled={isUpdatingTask}
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="task-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => handleToggleComplete(task)}
                                                    className="custom-checkbox"
                                                    id={`task-${task.id}`}
                                                />
                                                <label htmlFor={`task-${task.id}`} className="checkbox-label">
                                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <polyline points="20,6 9,17 4,12" />
                                                    </svg>
                                                </label>
                                            </div>

                                            <div className="task-content">
                                                <h3 className="task-title-item">{task.title}</h3>
                                                {task.description && <p className="task-description">{task.description}</p>}
                                            </div>

                                            <div className="task-actions">
                                                <button onClick={() => startEdit(task)} className="edit-button" title="Editar tarea">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className="delete-button"
                                                    disabled={deletingTaskId === task.id}
                                                    title="Eliminar tarea"
                                                >
                                                    {deletingTaskId === task.id ? (
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
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskPage
