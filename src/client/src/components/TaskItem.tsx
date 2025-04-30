import React from 'react';
import { Task } from '../types/Task';
import {
    ListItem, ListItemText, IconButton, Checkbox,
    Typography, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface TaskItemProps {
    task: Task;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
    return (
        <Paper elevation={2} style={{ margin: '8px 0' }}>
            <ListItem>
                <Checkbox
                    checked={task.completed}
                    onChange={() => onToggle(task.id!, !task.completed)}
                />
                <ListItemText
                    primary={<Typography style={{
                        textDecoration: task.completed ? 'line-through' : 'none'
                    }}>{task.title}</Typography>}
                    secondary={task.description}
                />
                <IconButton onClick={() => onEdit(task)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(task.id!)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </Paper>
    );
};

export default TaskItem;