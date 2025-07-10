import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    done: { type: Boolean, default: false },
    userId: { type: String, required: true }
}, { timestamps: true });

export const Task = model('Task', taskSchema);
