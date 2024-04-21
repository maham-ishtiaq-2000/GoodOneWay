import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Brand from './Layout/Categories/Brand';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");

    // Check if token exists, render children if true, otherwise redirect to login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />  // Unprotected Route
            <Route path="/home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path="/brand" element={
                <ProtectedRoute>
                    <Brand />
                </ProtectedRoute>
            } />
            {/* Add other protected routes as needed */}
        </Routes>
    );
};

export default AppRoutes;
