import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403);
        }
        next();
    };
};

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // debería contener el id del usuario
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};