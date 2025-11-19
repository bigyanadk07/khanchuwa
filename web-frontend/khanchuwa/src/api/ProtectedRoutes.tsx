// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  fallbackPath?: string;
}

const ProtectedRoute = ({ 
  children, 
  fallbackPath = "/signin" 
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Wait while AuthProvider loads localStorage
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
