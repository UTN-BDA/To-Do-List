import { Router } from "express";
import {getTaskById, updateTask, deleteTask, deleteAllTasks, createTask} from "../controllers/controller";
import authRoutes from "./authRouter";
import { authenticateUser } from "../middleware/authMiddleware";
import { validateTaskCreation, validateIdParam } from "../middleware/taskValidators";
import { Task } from "../models/taskModel";

const router = Router();

router.use("/", authRoutes);

// Crear tarea (protegida)
router.post('/tasks', authenticateUser, validateTaskCreation, createTask);

// Obtener tareas solo del usuario logueado
router.get("/tasks", authenticateUser, async (req, res) => {
    const userId = req.user.id;

    const tasks = await Task.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
    });

    res.json(tasks);
});

// Obtener tarea por ID
router.get("/tasks/:id", authenticateUser, validateIdParam, getTaskById);

// Actualizar tarea
router.put("/tasks/:id", authenticateUser, validateIdParam, validateTaskCreation, updateTask);

// Eliminar una tarea
router.delete("/tasks/:id", authenticateUser, validateIdParam, deleteTask);

// Eliminar todas las tareas del usuario logueado
router.delete("/tasks", authenticateUser, deleteAllTasks);

export default router;
