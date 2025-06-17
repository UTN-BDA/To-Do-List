"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/Register.css"

const Register: React.FC = () => {
    const [username, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        // Validación de contraseñas
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            setIsLoading(false)
            return
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            setIsLoading(false)
            return
        }

        try {
            await axios.post("http://localhost:5000/api/lista/register", {
                username,
                password,
                role: "user", // o 'admin' manualmente si lo necesitas
            })
            setSuccess("¡Registro exitoso! Redirigiendo al login...")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (error: any) {
            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError("Error en el registro. Por favor, intenta nuevamente.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2 className="register-title">Crear cuenta</h2>
                    <p className="register-subtitle">Completa los datos para registrarte en la plataforma</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    {error && (
                        <div className="error-message">
                            <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22,4 12,14.01 9,11.01" />
                            </svg>
                            {success}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Nombre de usuario
                        </label>
                        <div className="input-container">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <input
                                id="username"
                                type="text"
                                placeholder="Elige un nombre de usuario"
                                value={username}
                                onChange={(e) => setUser(e.target.value)}
                                className="form-input"
                                required
                                disabled={isLoading}
                                minLength={3}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <div className="input-container">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <circle cx="12" cy="16" r="1" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Crea una contraseña segura"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input password-input"
                                required
                                disabled={isLoading}
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="password-hint">Mínimo 6 caracteres</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirmar contraseña
                        </label>
                        <div className="input-container">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                <polyline points="9,12 11,14 15,10" />
                            </svg>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-input password-input"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="password-toggle"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="register-button" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <svg className="loading-spinner" viewBox="0 0 24 24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeDasharray="32"
                                        strokeDashoffset="32"
                                    >
                                        <animate
                                            attributeName="stroke-dasharray"
                                            dur="2s"
                                            values="0 32;16 16;0 32;0 32"
                                            repeatCount="indefinite"
                                        />
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            dur="2s"
                                            values="0;-16;-32;-32"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                </svg>
                                Registrando...
                            </>
                        ) : (
                            "Crear cuenta"
                        )}
                    </button>
                </form>

                <div className="register-footer">
                    <p className="login-text">
                        ¿Ya tienes cuenta?
                        <button
                            type="button"
                            className="login-link"
                            onClick={() => navigate("/login")}
                            disabled={isLoading}
                        >
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
