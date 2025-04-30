import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const TaskPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    
    const [editId, setEditId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');
    const [editDescription, setEditDescription] = useState<string>('');
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Task[]>('/api/tasks');
                setTasks(response.data);
            } catch (err) {
                setError('Failed to fetch tasks');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTasks();
    }, []);
    
    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        
        try {
            const response = await axios.post<Task>('/api/tasks', {
                title: newTaskTitle,
                description: newTaskDescription,
                completed: false
            });
            
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
            setNewTaskDescription('');
        } catch (err) {
            setError('Failed to add task');
            console.error(err);
        }
    };
    
    const handleDeleteTask = async (id: number) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
        }
    };
    
    const handleToggleComplete = async (task: Task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await axios.put(`/api/tasks/${task.id}`, updatedTask);
            setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
        } catch (err) {
            setError('Failed to update task');
            console.error(err);
        }
    };
    
    const startEdit = (task: Task) => {
        setEditId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };
    
    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId) return;
        
        try {
            const taskToUpdate = tasks.find(t => t.id === editId);
            if (!taskToUpdate) return;
            
            const updatedTask = {
                ...taskToUpdate,
                title: editTitle,
                description: editDescription
            };
            
            await axios.put(`/api/tasks/${editId}`, updatedTask);
            setTasks(tasks.map(t => t.id === editId ? updatedTask : t));
            setEditId(null);
        } catch (err) {
            setError('Failed to update task');
            console.error(err);
        }
    };
    
    if (loading) return <div>Loading tasks...</div>;
    
    return (
        <div className="task-page">
            <h1>Task Manager</h1>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="task-form">
                <h2>Add New Task</h2>
                <form onSubmit={handleAddTask}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                    <button type="submit">Add Task</button>
                </form>
            </div>
            
            <div className="task-list">
                <h2>Tasks</h2>
                {tasks.length === 0 ? (
                    <p>No tasks available. Add a new task to get started!</p>
                ) : (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id} className={task.completed ? 'completed' : ''}>
                                {editId === task.id ? (
                                    <form onSubmit={handleSaveEdit}>
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            required
                                        />
                                        <textarea
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            rows={2}
                                        />
                                        <button type="submit">Save</button>
                                        <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                                    </form>
                                ) : (
                                    <>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => handleToggleComplete(task)}
                                        />
                                        <div className="task-content">
                                            <h3>{task.title}</h3>
                                            <p>{task.description}</p>
                                        </div>
                                        <div className="task-actions">
                                            <button onClick={() => startEdit(task)}>Edit</button>
                                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TaskPage;