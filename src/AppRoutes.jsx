import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Brand from './Layout/Categories/Brand';


const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />}></Route>
            <Route path="/brand" element={<Brand />}></Route>
        </Routes>
    );
};

export default AppRoutes;
