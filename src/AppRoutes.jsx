import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from './Layout/Categories/Home';
import Brand from './Layout/Categories/Brand';
import Categories from "./Layout/Categories/Categories";
import Cart from './Layout/Categories/Cart';
import SearchPage from "./Layout/Categories/SearchPage";
import FeaturedProducts from "./SideBarRoutes/FeaturedProducts";
import ClearanceProducts from "./SideBarRoutes/ClearanceProducts";
import TrendingProducts from "./SideBarRoutes/TrendingProducts";

// Inline function to check if the user is authenticated
const isAuthenticated = () => Boolean(localStorage.getItem("accessToken"));

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Redirect based on authentication status */}
            <Route path="/" element={isAuthenticated() ? <Navigate to="/home" replace /> : <Login />} />
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
            <Route path="/searchPage/:brand" element={
                <ProtectedRoute>
                    <SearchPage />
                </ProtectedRoute>
            } />
            <Route path="/searchPage" element={
                <ProtectedRoute>
                    <SearchPage />
                </ProtectedRoute>
            } />
              <Route path="/featuredProducts" element={
                <ProtectedRoute>
                    <FeaturedProducts />
                </ProtectedRoute>
            } />
            <Route path="/clearanceProducts" element={
                <ProtectedRoute>
                    <ClearanceProducts />
                </ProtectedRoute>
            } />
             <Route path="/trendingProducts" element={
                <ProtectedRoute>
                    <TrendingProducts />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;
