import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Task } from '../models/taskModel';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    logging: false,
    models: [Task], 
});

export default db;
