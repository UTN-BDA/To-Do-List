import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface ProtectedRouteProps {
    children: JSX.Element;
    requiredRole?: 'admin' | 'user';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
