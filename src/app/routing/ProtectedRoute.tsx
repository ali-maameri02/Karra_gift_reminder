import { Navigate } from "react-router-dom";
import { useAuthStore,  } from "../store/auth.store";

export const ProtectedRoute = ({ children, role }: any) => {
  const  user  = useAuthStore();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/403" />;

  return children;
};
