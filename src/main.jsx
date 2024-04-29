import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Layout/context/CartContext';
import DisableZoom from './DisableZoom';




ReactDOM.createRoot(document.getElementById('root')).render(
    <CartProvider>
        <Router>
         <DisableZoom></DisableZoom>
        <AppRoutes />
      </Router>
   </CartProvider>
)
