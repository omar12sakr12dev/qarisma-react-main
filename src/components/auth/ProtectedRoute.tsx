import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

const ProtectedRoute = () => {
  // Check authentication using authService
  const isAuth = authService.isAuthenticated();

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;