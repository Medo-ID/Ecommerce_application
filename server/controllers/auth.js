import passport from 'passport';
import { validationResult } from 'express-validator';
import { hashPassword } from '../utils/hash.js';
import { findUserByEmail, insertUser } from './user.js';


// Registration Middleware
const registerUser = async (req, res, next) => {
    const { full_name, email, password } = req.body;
    
    // Validate user input
    const errors = validationResult(req);
    
    // Return errors if exists
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    
    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists! Try another email.' });
        }
        
        // Hash password
        const { salt, hash } = await hashPassword(password);
        
        // Insert user
        await insertUser(full_name, email, hash, salt);
        
        // Return success message
        res.status(201).json({ success: 'Registration successful' });
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};

// Login Middleware
const loginUser = (req, res, next) => { 
    passport.authenticate(
        'local', 
        { failureRedirect: '/login', failureFlash: true }, 
        (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred during login.' });
            }
            
            if (!user) {
                return res.status(401).json({ message: info.message });
            }
            
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Login failed.' });
                }
                return res.status(200).json({ message: 'You logged in successfully', user });
            });
        }
    )(req, res, next);
};

// Check Authentication Middelware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) { 
        return res.status(401).json({ message: 'You need to be authenticated' });
    }
    next();
};

// Logout Middelware
const logoutUser = (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
        res.status(200).json({ message: 'You logged out successfully' });
    });
};

export { registerUser, loginUser, isAuthenticated, logoutUser }