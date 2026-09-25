import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Drive from "./pages/Drive";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Login mode="login" />} path="/login" />
        <Route element={<Login mode="register" />} path="/register" />

        <Route element={<Drive />} path="/" />

        <Route element={<Navigate to="/" replace />} path="*" />
      </Routes>
    </>
  );
};

export default App;
