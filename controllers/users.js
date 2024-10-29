import { pool } from "../models/index.js";
import { hashPassword, verifyPassword } from "../utils/index.js";

// Helper functions for users
// Finding a user by email
const findUserByEmail = async (email) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        return rows[0]
    } catch (error) {
        console.error('Error finding user by email:', error)
        throw error
    }
};

// Finding a user by ID
const findUserById = async (id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return rows[0]
    } catch (error) {
        console.error('Error finding user by ID:', error)
        throw error
    }
};

// Inserting
const insertUser = async (full_name, email, hash_password) => {
    try {
        // RETURNING * =  allows you to get the inserted row back immediately
        const query = `
            INSERT INTO users (full_name, email, hash_password)
            VALUES ($1, $2, $3)
            RETURNING * 
        `
        const { rows } = await pool.query(query, [full_name, email, hash_password])
        return rows[0]
    } catch (error) {
        console.error('Something went wrong:', error)
        throw error
    }
}

// Requests
// Retrieving all
const getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
        res.status(200).json({ message: 'Success', data: rows })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error })
    }
}

// Retvieving one
const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        res.status(200).json({ message: 'Success', data: rows[0] })
    } catch (error) {
        res.status(404).json({ message: 'User not found with this Id', error })
    }
}

// Updating
const updateUser = async (req, res) => {
    const { full_name, email, old_password, new_password, confirm_new_password, phone_number } = req.body

    const updateFields = {}
    
    if (full_name) {
        if (full_name.length >= 3) updateFields.full_name = full_name
        else return res.status(400).json({ message: 'Invalid name! Make sure you enter a name with more than 2 characters.' })
    }

    if (email) {
        if (email.includes('@')) updateFields.email = email
        else return res.status(400).json({ message: 'Invalid email! Make sure you enter a valid email.' })
    }

    if (old_password && new_password && confirm_new_password) {
        const match = await verifyPassword(old_password, req.user.hash_password)
        if (!match) return res.status(400).json({ message: 'Incorrect password! Make sure you enter your correct old password.' })
        
        if (new_password === confirm_new_password) {
            updateFields.hash_password = await hashPassword(new_password)
        } else {
            return res.status(400).json({ message: "Password and confirm password don't match!" })
        }
    }

    if (phone_number) {
        const isValidPhoneNumber = phoneNumber => /^(?:\+212|0)(5|6|7)\d{8}$/.test(phoneNumber)
        if (isValidPhoneNumber(phone_number)) updateFields.phone_number = phone_number
        else return res.status(400).json({ message: 'Invalid phone number.' })
    }

    const fields = Object.keys(updateFields)
    const values = Object.values(updateFields)
    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ')
    
    try {
        const query = `
            UPDATE users
            SET ${setClause}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `
        const { rows } = await pool.query(query, [...values, req.user.id])
        res.status(200).json({ message: 'Success', data: rows[0] })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while updating user', error })
    }
}


export { findUserByEmail, findUserById, insertUser, getUsers, getUser, updateUser }