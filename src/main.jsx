import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Layout/context/CartContext';





ReactDOM.createRoot(document.getElementById('root')).render(
    <CartProvider>
        <Router>
        <AppRoutes />
      </Router>
   </CartProvider>
)
