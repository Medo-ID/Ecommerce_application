import { pool } from "../models/index.js";

// Get cart items with product info
const cartProductInfo = async (user_id) => {
    const query = `
        SELECT
            c.user_id, 
            p.id AS product_id, 
            c.quantity, 
            p.price AS unit_price, 
            (c.quantity * p.price) AS total_price
        FROM
            cart AS c
        JOIN
            products AS p
        ON
            c.product_id = p.id
        WHERE
            c.user_id = $1
    `
    const { rows: cartItems } = await pool.query(query, [user_id])
    return cartItems
}

// Why Use Client instead of Pool connection:
/* 
    * The transaction functions BEGIN, COMMIT, and ROLLBACK work only when called within the same session, 
    * so without client, each pool.query will act as an independent session, 
    *  making it unsuitable for transactions.
*/

// Checkout user's Items that exists in his cart
export const checkout = async (req, res) => {
    const user_id = req.user.id
    const client = await pool.connect();
    try {
        // Start the transaction
        await client.query('BEGIN')
        
        // Get cart items with product info
        const cartItems = await cartProductInfo(user_id)

        // Check if empty
        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
        
        // Calculate total amount
        const totalAmount = cartItems.reduce((acc, item) => acc + Number(item.total_price), 0)
        
        // Insert into orders
        const orderQuery = `
            INSERT INTO orders (user_id, total_amount, status)
            VALUES ($1, $2, 'pending')
            RETURNING id
        `
        const { rows: orderRow } = await client.query(orderQuery, [user_id, totalAmount])
        const orderId = orderRow[0].id

        // Insert each item into OrderItems
        const orderItemsQuery = `
            INSERT INTO orderitems (order_id, product_id, quantity, unit_price)
            VALUES ($1, $2, $3, $4)
        `
        for (const item of cartItems) {
            await client.query(orderItemsQuery, [orderId, item.product_id, item.quantity, Number(item.unit_price)])
        }

        // Insert into checkouts
        const checkoutQuery = `
            INSERT INTO checkouts (order_id, amount, status, method)
            VALUES ($1, $2, 'pending', 'credit_card')
        `
        await client.query(checkoutQuery, [orderId, totalAmount])
        
        // Commit the transaction if successful
        await client.query('COMMIT')
        res.status(200).json({ message: 'Checkout successful' })
    } catch (error) {
        // Rollback the transaction in case of an error
        await client.query('ROLLBACK')
        res.status(500).json({ message: 'Error during checkout', error })
    } finally {
        // Release the client back to the pool
        client.release()
    }
}