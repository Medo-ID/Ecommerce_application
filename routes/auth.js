import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { authenticateUser, logoutUser, registerUser } from '../controllers/auth.js';
import { findUserByEmail, findUserById } from '../controllers/users.js';
import { verifyPassword } from '../utils/index.js';

export const authRouter = express.Router();

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await findUserById(id);
        return done(null, user);
    } catch (err) {
        done(err)
    }
})

// Config LocalStrategy
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async (email, password, done) => {
        try {
            const user = await findUserByEmail(email);
            if (!user) return done(null, false, {message: 'Incorrect email or password.'});
            
            const match = await verifyPassword(password, user.hash_password)
            if (!match) return done(null, false, { message: 'Incorrect email or password.' });
            
            return done(null, user)
        } catch (err) {
            return done(err);
        }
    }
))

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
// Register
authRouter.post('/register', registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
// Login
authRouter.post('/login', authenticateUser);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
// Logout
authRouter.get('/logout', logoutUser);