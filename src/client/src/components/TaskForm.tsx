import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { Task } from '../types/Task';

interface TaskFormProps {
    onSubmit: (task: Omit<Task, 'id'>) => void;
    editTask: Task | null;
    onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editTask, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description || '');
        }
    }, [editTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            completed: editTask ? editTask.completed : false
        });
        setTitle('');
        setDescription('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {editTask ? 'Editar Tarea' : 'Nueva Tarea'}
            </Typography>
            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    {editTask ? 'Actualizar' : 'Crear'}
                </Button>
                {editTask && onCancel && (
                    <Button variant="outlined" color="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default TaskForm;