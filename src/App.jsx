import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Drive from "./pages/Drive";
import ProtectedRoute from "./components/ui/auth/ProtectedRoute";
import DashboarrdLayout from "./components/layout/DashboarrdLayout";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Login mode="login" />} path="/login" />
        <Route element={<Login mode="register" />} path="/register" />

        {/* private route */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboarrdLayout />}>
            <Route path="/" element={<Drive />} />
          </Route>
        </Route>

        <Route element={<Navigate to="/" replace />} path="*" />
      </Routes>
    </>
  );
};

export default App;
