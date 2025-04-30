import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './types/Task';
import { getAllTasks, createTask, updateTask, deleteTask } from './services/taskService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleUpdateTask = async (id: number, updatedTask: Partial<Task>) => {
    try {
      const updated = await updateTask(id, updatedTask);
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, ...updated } : task
      ));
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Lista de Tareas
        </Typography>
        <TaskForm
          onSubmit={editTask ?
            (task) => handleUpdateTask(editTask.id!, task) :
            handleCreateTask
          }
          editTask={editTask}
          onCancel={() => setEditTask(null)}
        />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={setEditTask}
        />
      </Box>
    </Container>
  );
};

export default App;