import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://localhost:5000'; // URL de backend

export const getAllTasks = async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/api/lista/tasks`);
    return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await axios.post(`${API_URL}/api/lista/tasks`, task);
    return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/api/lista/tasks/${id}`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/lista/tasks/${id}`);
};