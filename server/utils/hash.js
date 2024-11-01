import crypto from 'crypto'

// Hash a given password and return the derived key along with the salt
export const hashPassword = async (password) => {
    const salt = crypto.randomBytes(16); // Generate a binary salt
    const derivedKey = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key);
        });
    });
    return { salt, hash: derivedKey };
}

// Verify a password against the provided hash and salt
export const verifyPassword = async (password, hash, salt) => {
    const derivedKey = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key);
        });
    });
    return crypto.timingSafeEqual(derivedKey, hash);
}