// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (!userRole) {
            navigate('/login'); // Redirect to login if no role found
        } else if (userRole === 'Admin') {
            navigate('/admin');
        } else if (userRole === 'Operator') {
            navigate('/operator');
        } else if (userRole === 'Content Creator') {
            navigate('/content-creator');
        } else {
            navigate('/login'); // Default to login if invalid role
        }
    }, [navigate]);

    return children; // Render child components if the user is authenticated
};

export default ProtectedRoute;
