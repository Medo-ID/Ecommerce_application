import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements, 
    RouterProvider, 
    Route 
} from "react-router-dom";

import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import App from './App';

import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Account from "./views/Account";
import Cart from "./views/Cart";
import ProductDetail from "./views/ProductDetail";

import { ProtectedRoute } from "./components/Protected-Route";
import { RedirectUser } from "./components/Redirect-User";
import { AuthProvider } from "./hooks/authContext";
import { CartProvider } from "./hooks/cartContext";
import OrderPlacer from "./views/OrderPlacer";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route 
                path="login" 
                element={
                    <RedirectUser>
                        <Login />
                    </RedirectUser>
                } 
            />
            <Route 
                path="signup" 
                element={
                    <RedirectUser>
                        <SignUp />
                    </RedirectUser>
                } 
            />
            <Route 
                path="account" 
                element={
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                } 
            />
            <Route path="cart" element={<Cart />} />
            <Route path="order-success" element={<OrderPlacer />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CartProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </CartProvider>
    </React.StrictMode>
);