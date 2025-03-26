// components/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { RootState } from '../store/store';
import UnauthorizedPage from './UnauthorizedPage';

interface ProtectedRouteProps {
    allowedGroups?: string[];
    requiredGroups?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           allowedGroups,
                                                           requiredGroups = []
                                                       }) => {
    const location = useLocation();
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedGroups && !allowedGroups.includes(user.group) && user.group !== 'admin') {
        return <UnauthorizedPage requiredGroups={[...new Set(requiredGroups.concat('admin'))]} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

