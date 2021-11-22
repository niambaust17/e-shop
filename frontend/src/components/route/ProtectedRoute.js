import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, children }) =>
{
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    const location = useLocation();
    console.log(isAdmin, user.role);
    return (
        <>
            {
                isAuthenticated && loading === false ? children : <Navigate to="/login" state={{ from: location }} />
            }
            {isAdmin === true && user.role !== 'admin' ? <Navigate to="/" /> : ''}
        </>
    )
}

export default ProtectedRoute