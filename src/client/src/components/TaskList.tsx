import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
    Typography,
    Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Task } from '../types/Task';

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: number, completed: boolean) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggleComplete,
    onDeleteTask,
    onEditTask
}) => {
    if (tasks.length === 0) {
        return (
            <Typography variant="subtitle1" align="center" sx={{ my: 3 }}>
                No hay tareas disponibles. ¡Agrega una nueva!
            </Typography>
        );
    }

    return (
        <Paper elevation={2} sx={{ mt: 2 }}>
            <List>
                {tasks.map((task) => (
                    <ListItem
                        key={task.id}
                        sx={{
                            borderBottom: '1px solid #eee',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.7 : 1
                        }}
                    >
                        <Checkbox
                            edge="start"
                            checked={task.completed}
                            onChange={() => task.id !== undefined && onToggleComplete(task.id, !task.completed)}
                            color="primary"
                        />
                        <ListItemText
                            primary={task.title}
                            secondary={task.description}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => onEditTask(task)}
                                sx={{ mr: 1 }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => task.id !== undefined ? onDeleteTask(task.id) : null}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TaskList;