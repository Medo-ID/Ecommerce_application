import express from 'express';
import { addToCart, updateCart, getCart } from '../controllers/cart.js';
import { checkout } from '../controllers/checkout.js';

export const cartRouter = express.Router();

cartRouter.get('/your-cart', getCart);
cartRouter.post('/add/:product_id', addToCart);
cartRouter.put('/update/:product_id', updateCart);
cartRouter.post('/checkout', checkout);