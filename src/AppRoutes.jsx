import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from './Layout/Categories/Home';
import Brand from './Layout/Categories/Brand';
import Categories from "./Layout/Categories/Categories";
import Cart from './Layout/Categories/Cart';
import SearchPage from "./Layout/Categories/SearchPage";


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
            <Route path="/categories" element={
                <ProtectedRoute>
                    <Categories />
                </ProtectedRoute>
            } />
              <Route path="/cart" element={
                <ProtectedRoute>
                    <Cart />
                </ProtectedRoute>
            } />
             <Route path="/searchPage" element={
                <ProtectedRoute>
                    <SearchPage />
                </ProtectedRoute>
            } />
            
        </Routes>
    );
};

export default AppRoutes;
