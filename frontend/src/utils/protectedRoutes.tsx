import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/loader";

export const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="h-16 w-16" />;
  }

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};
