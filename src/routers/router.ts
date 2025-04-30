import { Router } from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask, deleteAllTasks } from "../controllers/controller";

const router = Router();

//Obtener todas las tareas
router.get('/tasks', getTasks);

//obtener tareas por id
router.get('/tasks/:id', getTaskById);

//crear una tarea
router.post('/tasks', createTask);  

//actualizar una tarea
router.put('/tasks/:id', updateTask);

//eliminar una tarea
router.delete('/tasks/:id', deleteTask);

//eliminar todas las tareas
router.delete('/tasks', deleteAllTasks )

export default router;