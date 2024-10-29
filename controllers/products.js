import { pool } from "../models/index.js";

// Retvieving products
const getProducts = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products ORDER BY name')
        res.status(200).json({ message: 'Success', data: rows })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving all products', error })
    }
}

// Retrieving product
const getProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(req.user)
    try {
        const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id])
        res.status(200).json({ message: 'Success', data: rows[0] })
    } catch (error) {
        res.status(404).json({ message: 'Product not found with this Id', error })
    }
}

// Retrieving products by category
const getProductsByCategory = async (req, res) => {
    // Ensure category name is always capitalized for db query
    const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1).toLowerCase()
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category_name
            FROM products AS p
            JOIN categories AS c
            ON p.category_id = c.id
            WHERE c.name = $1
        `;
        const { rows } = await pool.query(query, [name])
        res.status(200).json({ message: 'Success', data: rows })
    } catch (error) {
        res.status(404).json({ message: 'Category not found', error })
    }
}

export { getProducts, getProduct, getProductsByCategory }