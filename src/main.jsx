import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./react/App";
import { CartProvider } from "./react/context/CartContext";
import { AuthProvider } from "./react/context/AuthContext";

import "./assets/styles/main.css";
import "./assets/styles/components.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
