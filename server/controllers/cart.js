import { pool } from "../models/index.js";

// Helper Functions for Cart
// Check Product Availability
const checkProduct = async (product_id, qty) => {
    const { rows } = await pool.query('SELECT stock FROM products WHERE id = $1', [product_id]);
    return rows[0]?.stock >= qty || false;
};

// Check if product is already exists in the cart
const isProductInCart = async (user_id, product_id) => {
    const { rows } = await pool.query(
        `SELECT 1 FROM cart 
        WHERE user_id = $1 AND product_id = $2`, 
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
        const { rows: items } = await pool.query(query, [user_id])
        const itemCount = items.length;
        res.status(200).json({ data: items, itemCount })
    } catch (error) {
        res.status(404).json({ message: 'Cart not found' })
    }
}

// Add to cart
const addToCart = async (req, res) => {
    const user_id = req.user.id
    const product_id = req.params.product_id
    let quantity = Number(req.body.quantity)

    // Validate quantity to ensure it’s a positive integer
    if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    // Check if product exists & stock is enough
    if (!await checkProduct(product_id, quantity)) {
        return res.status(404).json({ message: 'Product not found or insufficient stock' })
    }

    let query = ''
    let queryParams = []
    
    // Check if product already exists in cart
    if (await isProductInCart(user_id, product_id)) {
        // Update the quantity
        query = `
            UPDATE cart 
            SET quantity = quantity + $1 
            WHERE user_id = $2 AND product_id = $3
            RETURNING *
        `
        queryParams = [quantity, user_id, product_id]
    } else {
        // Insert new row in the cart table
        query = `
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING * 
        `
        queryParams = [user_id, product_id, quantity]
    }

    const { rows } = await pool.query(query, queryParams)
    res.status(201).json({ message: 'Added Successfully', data: rows[0] })
}

// Update Cart (Add, Update, or Delete based on quantity)
const updateCart = async (req, res) => {
    const user_id = req.user.id;
    const product_id = req.params.product_id;
    const quantity = Number(req.body.quantity); // quantity sent from the front end

    // Validation: Ensure quantity is valid
    if (isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    try {
        // Check if product exists & has enough stock for adding or updating
        if (quantity > 0 && !await checkProduct(product_id, quantity)) {
            return res.status(404).json({ message: 'Product not found or insufficient stock' });
        }
        
        // Check if product already exists in cart
        if (await isProductInCart(user_id, product_id)) {
            if (quantity === 0) {
                // Remove item if quantity is 0
                await pool.query('DELETE FROM cart WHERE user_id = $1 AND product_id = $2', [user_id, product_id]);
                return res.status(200).json({ message: `Item removed from cart.` });
            } else {
                // Update quantity
                const updateQuery = `
                    UPDATE cart 
                    SET quantity = $1
                    WHERE user_id = $2 AND product_id = $3
                    RETURNING *;
                `;
                const { rows } = await pool.query(updateQuery, [quantity, user_id, product_id]);
                return res.status(200).json({ message: 'Quantity updated', data: rows[0] });
            }
        } else if (quantity > 0) {
            // Add new item to cart
            const insertQuery = `
                INSERT INTO cart (user_id, product_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const { rows } = await pool.query(insertQuery, [user_id, product_id, quantity]);
            return res.status(201).json({ message: 'Item added to cart', data: rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
};

export { getCart, addToCart, updateCart }