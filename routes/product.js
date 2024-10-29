import express from 'express';
import { getProduct, getProducts, getProductsByCategory } from '../controllers/products.js';

export const productRouter= express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
// Get products
productRouter.get('/', getProducts);

/**
 * @swagger
 * /products/category:
 *   get:
 *     summary: Get products by category
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products in a category
 */
// Get products by category
productRouter.get('/category', getProductsByCategory);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
// Get product
productRouter.get('/:id', getProduct);

