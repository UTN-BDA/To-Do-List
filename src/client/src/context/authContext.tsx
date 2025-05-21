import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = async (username: string, password: string) => {
        const res = await axios.post('http://localhost:5000/api/lista/login', { username, password });
        // Adaptar la estructura de la respuesta
        const userData = {
            id: res.data.user.id || 0,
            username: res.data.user.username,
            role: res.data.user.role
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', res.data.token); // Mantener el token
    };
    const register = async (username: string, password: string) => {
        const res = await axios.post('http://localhost:5000/api/lista/register', { username, password });
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
