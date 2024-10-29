import passport from 'passport';
import { hashPassword } from '../utils/index.js';
import { findUserByEmail, insertUser } from './users.js';

//  Registration Middleware
const registerUser = async (req, res, next) => {
    const { full_name, email, password, confirm_password } = req.body;

    // Check null fields
    if (!full_name || !email || !password || !confirm_password) {
        return res.status(400).json({ message: 'Make sure all fields are filled!' });
    }

    // Check full name validity
    if (full_name.length <= 2) {
        return res.status(400).json({ message: 'Invalid name! Make sure you enter a name with more than 2 caracters.' });
    }
    
    // Check email validity
    if (!email.includes('@') || email.length <= 6) {
        return res.status(400).json({ message: 'Invalid email! Make sure you enter a valid email.' });
    }

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists! Try another email.' });
        }

        // Check password match
        if (password !== confirm_password) {
            return res.status(400).json({ message: 'Password and confirm password do not match!' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Insert user
        await insertUser(full_name, email, hashedPassword);

        // Return new user object
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};

// Authentication Middelware
const authenticateUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during login.' });
        }
        if (!user) {
            // Send the failure message when authentication fails
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed.' });
            }
            return res.status(200).json({ message: "You logged in successfully", user}); // Send the user object on success
        });
    })(req, res, next);
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

export {registerUser, authenticateUser, isAuthenticated, logoutUser}