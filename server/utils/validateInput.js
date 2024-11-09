import { body } from 'express-validator';

export const inputValidation = [
    // Full Name - Should be at least 4 characters
    body('full_name')
        .isLength({ min: 4 })
        .withMessage('Full name must be at least 4 characters long'),

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
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character'),

    // Confirm Password - Must match the password field
    body('confirm_password')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Confirm password must match password'),
]

// Validate update inputs middleware
export const validateUpdateUser = [
    body('full_name')
        .optional()
        .isLength({ min: 4 })
        .withMessage('Name must be at least 4 characters long.'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Enter a valid email address.'),
    body('phone_number')
        .optional()
        .matches(/^\+?[1-9]\d{1,14}$/)
        .withMessage('Enter a valid phone number.'),
    body('new_password')
        .optional()
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('Password must be strong with uppercase, lowercase, number, and special character.'),
    body('confirm_new_password')
        .optional()
        .custom((value, { req }) => value === req.body.new_password)
        .withMessage('Passwords do not match.'),
]

// Validate address inputs middleware
export const validateAddressUser = [
    body('address_line1')
        .optional()
        .notEmpty()
        .withMessage('Address Line 1 is required.')
        .isLength({ max: 255 })
        .withMessage('Address Line 1 cannot exceed 255 characters.'),

    body('address_line2')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Address Line 2 cannot exceed 255 characters.'),

    body('city')
        .optional()
        .notEmpty()
        .withMessage('City is required.')
        .isLength({ max: 100 })
        .withMessage('City cannot exceed 100 characters.')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('City must contain only letters and spaces.'),

    body('state')
        .optional()
        .isLength({ max: 100 })
        .withMessage('State cannot exceed 100 characters.')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('State must contain only letters and spaces.'),

    body('postal_code')
        .optional()
        .notEmpty()
        .withMessage('Postal Code is required.')
        .matches(/^\d{5}(?:[-\s]\d{4})?$/)  // Example: 12345 or 12345-6789
        .withMessage('Enter a valid postal code.'),

    body('country')
        .optional()
        .notEmpty()
        .withMessage('Country is required.')
        .isLength({ max: 100 })
        .withMessage('Country cannot exceed 100 characters.')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Country must contain only letters and spaces.')
]