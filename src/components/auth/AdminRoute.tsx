import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

/**
 * Admin Route Guard - Only allows ADMIN role
 */
const AdminRoute = () => {
    const isAuth = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
