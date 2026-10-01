import { useApp } from "@/context/AppContext";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "../Spinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useApp();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Spinner size="lg" className="text-[#8C7A6B]" />
        <p className="text-sm text-slate-500 font-medium">Loading Velum...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children ? <> {children}</> : <Outlet />;
};

export default ProtectedRoute;
