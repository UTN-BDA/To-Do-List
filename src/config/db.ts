import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Task } from '../models/taskModel';
import { User } from '../models/userModel';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    logging: false,
    models: [Task, User],
});

export default db;
