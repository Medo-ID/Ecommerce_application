import { body } from 'express-validator';

export const inputValidation = [
    // Full Name - Should be at least 3 characters
    body('full_name')
        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long'),

    // Email - Must be a valid email format
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),

    // // Phone Number - Should be in valid phone number format
    // body('phone_number')
    //     .matches(/^[0-9]{10,15}$/)
    //     .withMessage('Phone number must be between 10 and 15 digits'),

    // Password - At least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&#]/)
        .withMessage('Password must contain at least one special character'),

    // Confirm Password - Must match the password field
    body('confirm_password')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Confirm password must match password'),
]