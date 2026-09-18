
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'mentor' | 'mentee';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, userRole, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mentor-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Redirect to appropriate dashboard if no specific role is required
  if (!requiredRole && userRole) {
    const dashboardPath = userRole === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard';
    if (location.pathname === '/profile') {
      // Don't redirect from profile page
      return <>{children}</>;
    }
    return <Navigate to={dashboardPath} replace />;
  }

  // Redirect if user doesn't have required role
  if (requiredRole && userRole !== requiredRole) {
    const dashboardPath = userRole === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
