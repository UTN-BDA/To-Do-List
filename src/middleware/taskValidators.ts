// middleware/taskValidators.ts
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validar datos al crear o actualizar una tarea
export const validateTaskCreation = [
    body('title')
        .isString().withMessage('El título debe ser texto')
        .trim().escape()
        .notEmpty().withMessage('El título no puede estar vacío'),

    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser texto')
        .trim().escape(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validar parámetro ID
export const validateIdParam = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
