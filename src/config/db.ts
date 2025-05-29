import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Task } from '../models/taskModel';
import { User } from '../models/userModel';
import { TestTask } from '../models/test_task';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    logging: false,
    models: [Task, User,TestTask],
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export default db;