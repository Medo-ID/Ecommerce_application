import express from 'express';
import { getOrderDetails, getOrders } from '../controllers/order.js';

export const orderRouter = express.Router();

orderRouter.get('/', getOrders);
orderRouter.get('/:order_id', getOrderDetails);