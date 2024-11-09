import { pool } from "../models/index.js";
import { validationResult } from 'express-validator';
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
        // First, insert into the users table and retrieve the new user's ID
        const userQuery = `
            INSERT INTO users (full_name, email, hash_password, salt)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) DO NOTHING
            RETURNING id;
        `
        const userResult = await pool.query(userQuery, [full_name, email, hash_password, salt]);

        // Check if the user was successfully inserted
        const user = userResult.rows[0];
        if (!user) {
            return { message: 'User already exists.' };
        }

        // Now, insert a corresponding address row with the new user's ID
        const addressQuery = `
            INSERT INTO addresses (user_id)
            VALUES ($1)
            RETURNING *;
        `;
        await pool.query(addressQuery, [user.id]);
    } catch (error) {
        return { message: 'Error inserting user and address.', error };
    }
}

// Requests
// Retrieving all users (Admin Privilege)
const getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users', error })
    }
}

// Retvieving user's current informations
const getCurrentUser = async (req, res) => {
    // Ensure the user is authenticated
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    
    const id = req.user.id
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        res.status(200).json({ success: true, data: rows[0] })
    } catch (error) {
        res.status(404).json({ success: false, message: 'User not found with this Id', error })
    }
}

const getAddressforCurrentUser = async (req, res) => {
    // Ensure the user is authenticated
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
    
    const user_id = req.user.id
    try {
        const { rows } = await pool.query('SELECT * FROM addresses WHERE user_id = $1', [user_id])
        return res.status(200).json({ success: true, address: rows[0] })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Address not found for this user', error })
    }
}

// Updating the user's current informations
const updateUser = async (req, res) => {
    const { full_name, email, old_password, new_password, confirm_new_password, phone_number } = req.body

    // Ensure only the authenticated user can update their own data
    if (req.params.id !== req.user.id.toString()) {
        return res.status(403).json({ error: "Unauthorized to update this user." })
    }

    // Validate request body errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array().map(err => err.msg) })
    }

    const updateFields = {};
    
    // Update fields based on input presence
    if (full_name) updateFields.full_name = full_name
    if (email) updateFields.email = email
    if (phone_number) updateFields.phone_number = phone_number

    // Handle password update
    if (old_password && new_password && confirm_new_password) {
        if (new_password !== confirm_new_password) {
            return res.status(400).json({ error: 'New password and confirmation must match.' })
        }
        
        const isMatch = await verifyPassword(old_password, req.user.hash_password, req.user.salt)
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect old password.' })
        }

        const { salt, hash } = await hashPassword(new_password)
        updateFields.salt = salt
        updateFields.hash_password = hash
    }
    
    try {
        const fields = Object.keys(updateFields)
        const values = Object.values(updateFields)
        const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ')
    
        const query = `
            UPDATE users
            SET ${setClause}
            WHERE id = $${fields.length + 1}
            RETURNING *;
        `
        const { rows } = await pool.query(query, [...values, req.user.id])
        res.status(200).json({ success: true, message: 'Profile updated successfully!', data: rows[0] })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user's profile", error })
    }
}

const updateAddress = async (req, res) => {
    const { address_line1, address_line2, city, state, postal_code, country } = req.body

    // Ensure only the authenticated user can update their own data
    if (req.params.id !== req.user.id.toString()) {
        return res.status(403).json({ error: "Unauthorized to update this user." })
    }

    // Validate request body errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array().map(err => err.msg) })
    }

    const updateFields = {};
    
    // Update fields based on input presence
    if (address_line1) updateFields.address_line1 = address_line1
    if (address_line2) updateFields.address_line2 = address_line2
    if (city) updateFields.city = city
    if (state) updateFields.state = state
    if (postal_code) updateFields.postal_code = postal_code
    if (country) updateFields.country = country

    try {
        const fields = Object.keys(updateFields)
        const values = Object.values(updateFields)
        const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ')

        const query = `
            UPDATE addresses
            SET ${setClause}
            WHERE user_id = $${fields.length + 1}
            RETURNING *;
        `
        const { rows } = await pool.query(query, [...values, req.user.id])
        res.status(200).json({ success: true, message: 'Profile updated successfully!', data: rows[0] })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user's address", error })
    }
}


export { 
    findUserByEmail, 
    findUserById, 
    insertUser, 
    getUsers, 
    getCurrentUser, 
    getAddressforCurrentUser, 
    updateUser, 
    updateAddress 
}