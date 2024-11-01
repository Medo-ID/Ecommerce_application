import { pool } from "../models/index.js"

// Retvieving products
const getProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, c.name AS category_name
            FROM products AS p
            JOIN categories AS c
            ON p.category_id = c.id
            ORDER BY p.name
        `
        const { rows } = await pool.query(query)
        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving all products', error })
    }
}

// Retrieving product
const getProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, c.name AS category_name
            FROM products AS p
            JOIN categories AS c
            ON p.category_id = c.id
            WHERE p.id = $1
        `
        const { rows } = await pool.query(query, [id])
        res.status(200).json({ data: rows[0] })
    } catch (error) {
        res.status(404).json({ message: 'Product not found with this Id', error })
    }
}

// Retrieving latest 4 products product
const latestProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, c.name AS category_name
            FROM products AS p
            JOIN categories AS c
            ON p.category_id = c.id
            ORDER BY p.created_at 
            DESC LIMIT 4
        `
        const { rows } = await pool.query(query)
        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(404).json({ message: 'Error retrieving latest products', error })
    }
}

// Retrieving products by category
const getProductsByCategory = async (req, res) => {
    let name = req.query.name
    if(name) {
        // Ensure category name is always capitalized for db query
        name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1).toLowerCase()
    }
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category_name
            FROM products AS p
            JOIN categories AS c
            ON p.category_id = c.id
            WHERE c.name = $1
        `
        const { rows } = await pool.query(query, [name])
        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(404).json({ message: 'Category not found', error })
    }
}

export { getProducts, getProduct, latestProducts, getProductsByCategory }