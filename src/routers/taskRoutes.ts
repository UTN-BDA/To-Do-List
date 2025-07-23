import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getUserTasks, updateTask } from '../controllers/taskController';
import { authenticateUser } from '../middleware/authMiddleware';
import authRouter from './authRouter';

const router = Router();

router.use("/", authRouter);

router.post('/tasks', authenticateUser, createTask);
router.get('/tasks', authenticateUser, getUserTasks);
router.post('/tasks/:id', authenticateUser, updateTask);
router.delete('/tasks/:id', authenticateUser, deleteTask);
router.get('/tasks/:id', authenticateUser, getTaskById);



export default router;
