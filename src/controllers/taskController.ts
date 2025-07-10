import { Request, Response } from 'express';
import { Task } from '../models/taskModelMongo';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; // viene del middleware

        const task = new Task({ title, description, userId });
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tarea', error });
    }
};

export const getUserTasks = async (req: Request, res: Response) => {
    const userId = req.user.id;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, done } = req.body;
    const userId = req.user.id;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, userId },
            { title, description, done },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tarea', error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const task = await Task.findOneAndDelete({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tarea', error });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const task = await Task.findOne({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tarea', error });
    }
};

