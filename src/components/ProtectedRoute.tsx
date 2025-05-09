import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return null;

  if (!isAuthenticated || !user) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
