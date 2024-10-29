import bcrypt from 'bcrypt';

// Hashing the password
export const hashPassword = async (password) => {
    const saltRounds = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, saltRounds);
};

// Verifying the password
export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};