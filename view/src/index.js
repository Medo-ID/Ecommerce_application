import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Account from './views/Account';
import Products from './views/Products';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} /> {/* "index" means the default route */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="account" element={<Account />} />
      <Route path="products" element={<Products />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();