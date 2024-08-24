import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { CartProvider } from './contexts/CartProvider';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
