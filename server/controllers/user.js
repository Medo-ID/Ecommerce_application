import { pool } from "../models/index.js";
import { body } from 'express-validator';
import { hashPassword, verifyPassword } from "../utils/hash.js";

// Helper functions for users
// Finding a user by email
const findUserByEmail = async (email) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        return rows[0]
    } catch (error) {
        return { message: 'Error finding user.', error }
    }
};

// Finding a user by ID
const findUserById = async (id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return rows[0]
    } catch (error) {
        return { message: 'Error finding user.', error }
    }
};

// Inserting
const insertUser = async (full_name, email, hash_password = null, salt = null) => {
    try {
        // RETURNING * =  allows you to get the inserted row back immediately
        const query = `
            INSERT INTO users (full_name, email, hash_password, salt)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) DO NOTHING
        `
        await pool.query(query, [full_name, email, hash_password, salt])
        // return {message: 'User inserted successfully.'}
    } catch (error) {
        return { message: 'Error inserting user.', error }
    }
}

// Requests
// Retrieving all (Admin Privilege)
const getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users', error })
    }
}

// Retvieving one
const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        res.status(200).json({ data: rows[0] })
    } catch (error) {
        res.status(404).json({ error: 'User not found with this Id', error })
    }
}

// Updating
const updateUser = async (req, res) => {
    const { full_name, email, old_password, new_password, confirm_new_password, phone_number } = req.body

    const updateFields = {}
    
    // Validate full_name
    if (full_name) {
        if (body('full_name').isLength({ min: 4 })) {
            updateFields.full_name = full_name;
        } else {
            return res.status(400).json({ error: 'Invalid name! Make sure you enter a name with more than 4 characters.' });
        }
    }

    // Validate email
    if (email) {
        if (body('email').isEmail()) {
            updateFields.email = email;
        } else {
            return res.status(400).json({ error: 'Invalid email! Make sure you enter a valid email.' });
        }
    }

    // Validate passwords
    if (old_password && new_password && confirm_new_password) {
        const match = await verifyPassword(old_password, req.user.hash_password, req.user.salt);
        if (!match) {
            return res.status(400).json({ error: 'Incorrect password! Make sure you enter your correct old password.' });
        }
        
        if (new_password === confirm_new_password) {
            if (
                body('new_password').isLength({ min: 8 })
                .matches(/[A-Z]/)
                .matches(/[a-z]/)
                .matches(/[0-9]/)
                .matches(/[@$!%*?&#]/)
            ) {
                const { salt, hash } = await hashPassword(new_password);
                updateFields.salt = salt;
                updateFields.hash_password = hash;
            } else {
                return res.status(400).json({ error: 'Password must be at least 8 characters long, with uppercase, lowercase, number, and special character.' });
            }
        } else {
            return res.status(400).json({ error: "Password and confirm password don't match!" });
        }
    }

    // Validate phone number
    if (phone_number) {
        if (body('phone_number').matches(/^\+?[1-9]\d{1,14}$/)) {
            updateFields.phone_number = phone_number;
        } else {
            return res.status(400).json({ error: 'Invalid phone number.' });
        }
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
        res.status(200).json({ data: rows[0] })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong while updating user', error })
    }
}


export { findUserByEmail, findUserById, insertUser, getUsers, getUser, updateUser }