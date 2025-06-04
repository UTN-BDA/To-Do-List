import { Request, Response } from "express";
import { Task } from "../models/taskModel";

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; 

        const task = await Task.create({
            title,
            description,
            userId, 
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {        
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
}
// Get a task by ID
export const getTaskById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
}
// Update a task by ID  
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, done } = req.body;
        const task = await Task.findByPk(id);
        if (task) {
            task.title = title;
            task.description = description;
            task.done = done;
            await task.save();
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
}
// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (task) {
            await task.destroy();
            res.status(200).json({ message: "Task deleted" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
}
// Delete all tasks 
export const deleteAllTasks = async (req: Request, res: Response) => {
    try {
        await Task.destroy({ where: {}, truncate: true });
        res.status(200).json({ message: "All tasks deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tasks", error });
    }
}