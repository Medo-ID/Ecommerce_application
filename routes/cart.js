import express from 'express';
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.js';
import { checkout } from '../controllers/checkout.js';

export const cartRouter = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart items for a user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */
// Get cart
cartRouter.get('/', getCart);

/**
 * @swagger
 * /cart/{product_id}:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart
 */
// Add items to cart
cartRouter.post('/:product_id', addToCart);

/**
 * @swagger
 * /cart/{product_id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removed from cart
 */
// Delete items from cart
cartRouter.delete('/:product_id', deleteFromCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Place a new order
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
// Place order
cartRouter.post('/', checkout)