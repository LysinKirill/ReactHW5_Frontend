import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
    allowedGroups?: string[];
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           allowedGroups,
                                                           redirectPath = '/login'
                                                       }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    if (allowedGroups && !allowedGroups.includes(user.group) && user.group !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;