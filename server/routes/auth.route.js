import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { verifyPassword } from '../utils/hash.js';
import { inputValidation } from '../utils/validateInput.js';
import { findUserByEmail, findUserById } from '../controllers/user.js';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.js';

export const authRouter = express.Router();

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await findUserById(id);
        return done(null, user);
    } catch (err) {
        console.error('Deserialization Error:', err);
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
            
            const match = await verifyPassword(password, user.hash_password, user.salt)
            if (!match) return done(null, false, { message: 'Incorrect email or password.' });
            
            return done(null, user)
        } catch (err) {
            return done(err);
        }
    }
))

authRouter.post('/register', inputValidation, registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/logout', logoutUser);

authRouter.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});