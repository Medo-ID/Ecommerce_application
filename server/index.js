import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from "./models/index.js"
import stripeLib from 'stripe';

const stripe = stripeLib(process.env.STRIPE_SECRET) // Initialize Stripe with your secret key
const FRONT_DOMAIN = 'http://localhost:3001' // Frontend domain

// Controllers
import { isAuthenticated } from './controllers/auth.js';
import { findUserByEmail, insertUser } from './controllers/user.js';

// Routes
import { authRouter } from './routes/auth.route.js';
import { userRouter } from './routes/user.route.js';
import { productRouter } from './routes/product.route.js';
import { cartRouter } from './routes/cart.route.js';
import { orderRouter } from './routes/order.route.js';

// Express Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Store sessions in PostgreSQL
const pgSession = connectPgSimple(session);

// Session configuration
app.use(
    session({
        store: new pgSession({
            pool, // Connect to PostgreSQL
            createTableIfMissing: true, // Automatically create the session table
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            sameSite: 'lax',
        },
    })
);

// Config app
app.use(cors({
    origin: FRONT_DOMAIN, // front-end origin
    credentials: true // Allow cookies to be sent across domains
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Main route for testing purposes
app.get('/', (req, res, next) => {
    console.log(req.isAuthenticated());
    res.status(200).json({ authStatus: req.isAuthenticated() });   
});

// GitHub Authentication 2.0 Strategy
// Config GitHubStrategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        const email = profile.emails[0].value;
        let user = await findUserByEmail(email);

        if (!user) {
            // Insert new GitHub user without password and salt
            user = await insertUser(profile.displayName, email);
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
}));

// GitHub endpoints
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: `${FRONT_DOMAIN}/login` }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${FRONT_DOMAIN}/?status=success`)
});

// Stripe endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cartItems } = req.body
    
        // Fetch product details, including stripe_price_id, from the database
        const productsQuery = `
            SELECT id, stripe_price_id 
            FROM products 
            WHERE id = ANY($1)
        `
        const { rows: products } = await pool.query(productsQuery, [cartItems.map(item => item.id)])
    
        // Create line items for Stripe Checkout
        const lineItems = cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return {
                price: product.stripe_price_id, // Use the price_id from the database
                quantity: item.quantity,
            };
        });
    
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${FRONT_DOMAIN}/order-success?success=true`,
            cancel_url: `${FRONT_DOMAIN}?canceled=true`,
        });
      
        // Respond with the session URL for the client to redirect
        res.json({ url: session.url })

    } catch (error) {
        console.error('Error creating checkout session:', error)
        res.status(500).json({ error: 'Failed to create checkout session' })
    }
});

// APIs endpoint
app.use('/api/auth', authRouter);
app.use('/api/users', isAuthenticated, userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', isAuthenticated, cartRouter);
app.use('/api/orders', isAuthenticated, orderRouter);

// Error handling
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack);
    res.status(500).send('Something went wrong. We’re working on fixing it.');
});

// Listening to app 
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});