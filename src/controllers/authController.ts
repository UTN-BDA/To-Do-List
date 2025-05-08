import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        
        // Create user with proper role (default to 'user' if not provided)
        const user = await User.create({ 
            username, 
            password: hashed, 
            role: role || 'user' 
        });
        
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

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    res.json({ token, user: { username: user.username, role: user.role } });
};
