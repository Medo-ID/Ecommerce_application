import { pool } from "../models/index.js";

// Helper Functions for Cart
// Check Product Availability
const checkProduct = async (product_id, qty) => {
    const { rows } = await pool.query('SELECT stock FROM products WHERE id = $1', [product_id]);
    return rows[0]?.stock >= qty || false;
};

// Check if product is already exists in the cart
const isProductInCart = async (user_id, product_id) => {
    const { rows } = await pool.query(`
        SELECT 1 FROM cart 
        WHERE user_id = $1 
        AND product_id = $2
    `, 
        [user_id, product_id]
    )
    return !!rows[0]
}

// Requests
// Retrieving cart for specefic user
const getCart = async (req, res) => {
    const user_id = req.user.id
    try {
        const query = `
            SELECT p.name AS product_name, c.quantity
            FROM cart AS c
            JOIN products AS p
            ON c.product_id = p.id
            WHERE user_id = $1
        `
        const { rows } = await pool.query(query, [user_id])
        res.status(200).json({ message: 'Success', data: rows })
    } catch (error) {
        res.status(404).json({ message: 'Cart not found' })
    }
}

// Add to cart
const addToCart = async (req, res) => {
    const user_id = req.user.id
    const product_id = req.params.product_id
    let quantity = Number(req.body.quantity);

    // Check if product exists & stock is enough
    if (!await checkProduct(product_id, quantity)) {
        return res.status(404).json({ message: 'Product not found or insufficient stock' })
    }
    // Check if product already exists in cart
    if (await isProductInCart(user_id, product_id)) {
        // Update the quantity
        const updateQuery = `
            UPDATE cart 
            SET quantity = quantity + $1 
            WHERE user_id = $2
            AND product_id = $3
            RETURNING *
        `
        const { rows } = await pool.query(updateQuery, [quantity, user_id, product_id])
        return res.status(201).json({ message: 'Added Successfully', data: rows[0] })
    }
    // Insert new row in the cart table
    const insertQuery = `
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING * 
    `
    const { rows } = await pool.query(insertQuery, [user_id, product_id, quantity])
    res.status(201).json({ message: 'Added Successfully', data: rows[0] })
}

// Delete from cart
const deleteFromCart = async (req, res) => {
    const user_id = req.user.id
    const product_id = req.params.product_id

    // Check if product exists in the cart
    if (!await isProductInCart(user_id, product_id)) {
        return res.status(404).json({ message: 'Product not found in the cart' })
    }
    // Delete the row in the cart table
    await pool.query('DELETE FROM cart WHERE user_id = $1 AND product_id = $2', [user_id, product_id])
    return res.status(200).json({ message: `Item with id: ${product_id} has been removed from the cart.` })
}

export { getCart, addToCart, deleteFromCart }