import express from 'express';
import { getProducts, getProduct, latestProducts, getProductsByCategory } from '../controllers/product.js'

export const productRouter= express.Router();

productRouter.get('/', getProducts);
productRouter.get('/product_id/:id', getProduct);
productRouter.get('/latest', latestProducts)
productRouter.get('/category', getProductsByCategory);