import { Router } from "express";
import {
    getTaskById,
    updateTask,
    deleteTask,
    deleteAllTasks
} from "../controllers/controller";
import authRoutes from "./authRouter";
import { authenticateUser } from "../middleware/authMiddleware";
import { Task } from "../models/taskModel";

const router = Router();

// rutas de autenticación
router.use("/", authRoutes);

// Crear tarea (protegida)
router.post("/tasks", authenticateUser, async (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body;

    const task = await Task.create({
        title,
        description,
        done: false,
        userId,
    });

    res.status(201).json(task);
});

// Obtener tareas solo del usuario logueado
router.get("/tasks", authenticateUser, async (req, res) => {
    const userId = req.user.id;

    const tasks = await Task.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
    });

    res.json(tasks);
});

// Obtener tarea por ID (opcional: podrías verificar si es del usuario también)
router.get("/tasks/:id", authenticateUser, getTaskById);

// Actualizar tarea
router.put("/tasks/:id", authenticateUser, updateTask);

// Eliminar una tarea
router.delete("/tasks/:id", authenticateUser, deleteTask);

// Eliminar todas las tareas del usuario logueado (opcional)
router.delete("/tasks", authenticateUser, deleteAllTasks);

export default router;
