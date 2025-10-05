/* === M2: Code Documentation === Entry point: bootstraps React, Router and Context provider === */

import React from 'react' // React base import
import ReactDOM from 'react-dom/client' // React base import
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './state/CartContext.jsx'
import './index.css'
import { WishlistProvider } from "./state/WishlistContext.jsx";

/* is the entry point of a React application. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/772Store">
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);