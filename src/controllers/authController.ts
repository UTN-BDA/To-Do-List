import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModelMongo';
import { Request, Response } from 'express';
import {body, validationResult} from 'express-validator';

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        
        // Create user instance
        const user = new User({username, password: hashed, role: role || 'user' });
        await user.save();
        
        // Don't return the password in the response
        const userData = {
            id: user.id,
            username: user.username,
            role: user.role
        };
        
        res.status(201).json({
            message: 'User registered successfully',
            user: userData
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const login = [
    // Validar y sanitizar entradas
    body('username').isString().trim().escape(),
    body('password').isString().trim(),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
];

