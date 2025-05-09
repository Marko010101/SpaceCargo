import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type RedirectIfAuthenticatedProps = {
  children: ReactNode;
};

function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return null;
  if (isAuthenticated) return null;

  return children;
}

export default RedirectIfAuthenticated;
