import { Router } from "express";
import {backupDatabase} from '../controllers/adminController';

const adminRouter = Router();

adminRouter.get('/backup', backupDatabase);

export default adminRouter;

