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
            secure: true,
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

// Setup api routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
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

// Run the server
app.listen(port, () => {
    console.log(`Server is running using the port ${port}`)
});

