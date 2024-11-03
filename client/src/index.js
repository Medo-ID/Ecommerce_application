import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements, 
    RouterProvider, 
    Route 
} from "react-router-dom";

import './index.css';
import App from './App';

import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Account from "./views/Account";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/authContect";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route 
                path="account" 
                element={
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                } 
            />
            <Route path="cart" element={<Account />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);