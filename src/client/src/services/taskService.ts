import axios from 'axios';
import { Task } from '../types/Task';
import {User} from '../types/User';

const API_URL = 'http://localhost:5000'; // URL de backend

export const getAllTasks = async (): Promise<Task[]> => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/api/lista/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_URL}/api/lista/tasks`, task, {
        headers: {
            Authorization: `Bearer ${token}` // 👈 esto es clave
        }
    });

    return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/api/lista/tasks/${id}`, task, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/api/lista/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


export const registerUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post(`${API_URL}/api/lista/register`, user);
    return response.data;
}
 
export const loginUser = async (user: Omit<User, 'id'>): Promise<{ token: string; user: User }> => {
    const response = await axios.post(`${API_URL}/api/lista/login`, user);
    return response.data;
}