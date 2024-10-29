import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from "./models/index.js"

// Swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './swagger.js';

// Routes
import { authRouter } from './routes/auth.js';
import { userRouter } from './routes/user.js';
import { productRouter } from './routes/product.js';
import { cartRouter } from './routes/cart.js';
import { orderRouter } from './routes/order.js';

// Check authentication middelware
import { isAuthenticated } from './controllers/auth.js';

// Express Config
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Initialize swagger-jsdoc
const openapiSpecification = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

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
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Main route
app.get('/', (req, res) => {
    res.status(200).send(
        `
            <h1>Ecommerce Express REST API.</h1>
            <h3>A REST API for managing ecommerce operations, including products, users, orders, and carts.</h3>
            <h5>Docs are available at <a href="http://localhost:3000/api-docs">http://localhost:3000/api-docs</a></h5>
        `
    )
});

// The nested routes
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', isAuthenticated, cartRouter);
app.use('/orders', isAuthenticated, orderRouter);

// Error handling
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack);
    res.status(500).send('Something went wrong. We’re working on fixing it.');
});

// Run the server
app.listen(port, () => {
    console.log(`Server is running using the port ${port}`)
});

