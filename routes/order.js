import express from 'express';
import { getOrderDetails, getOrders } from '../controllers/orders.js';

export const orderRouter= express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the user
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
// Get orders
orderRouter.get('/', getOrders);

/**
 * @swagger
 * /orders/{order_id}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
// Get order details
orderRouter.get('/:order_id', getOrderDetails);