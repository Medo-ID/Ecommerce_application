import { pool } from "../models/index.js";

// Retrieving orders for user
const getOrders = async (req, res) => {
    const user_id = req.user.id
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE user_id = $1', [user_id])
        res.status(200).json({ message: 'Success', data: rows })
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving orders', error })
    }
}

// Retrieving order items
const getOrderDetails = async (req, res) => {
    const order_id = req.params.order_id
    try{
        const { rows } = await pool.query('SELECT * FROM orderitems WHERE order_id = $1', [order_id])
        res.status(200).json({ message: 'Success', data: rows })
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving order details', error })
    }
}

// You can add admin endpoint for updating status, for canceling order etc.

export { getOrders, getOrderDetails }