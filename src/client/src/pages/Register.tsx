import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Register: React.FC = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/lista/register', {
                username,
                password,
                role: 'user' // o 'admin' manualmente si lo necesitas
            });
            alert('Registro exitoso');
            navigate('/login');
        } catch (error) {
            alert('Error en el registro');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Registrarse</h2>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p className="login-link">
                    ¿Ya tienes cuenta?{" "}
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => navigate('/login')}
                    >
                        Inicia sesión
                    </button>
                </p>
                <button type="submit" className="submit-button">
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Register;
