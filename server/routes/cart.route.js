import express from 'express';
import { addToCart, updateCart, getCart, deleteFromCart, saveItems } from '../controllers/cart.js';
import { checkout } from '../controllers/checkout.js';

export const cartRouter = express.Router();

cartRouter.post('/save-items', saveItems);
cartRouter.get('/your-cart', getCart);
cartRouter.post('/add/:product_id', addToCart);
cartRouter.put('/update/:product_id', updateCart);
cartRouter.delete('/delete/:product_id', deleteFromCart);
cartRouter.post('/checkout', checkout);