// src/app/routing/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

interface Props {
  allowedRoles?: ('admin' | 'vendor' | 'delivery')[];
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated || userRole === null) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Now userRole is guaranteed non-null
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};