import jwt from 'jsonwebtoken';

// Use environment variable for secret in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '7d'; // Token expires in 7 days

/**
 * Creates a JWT token with user payload
 * @param {Object} payload - Data to encode in token
 * @returns {Promise<string>} The JWT token
 */
export async function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

/**
 * Verifies and decodes a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {Promise<Object>} The decoded payload
 */
export async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

/**
 * Extracts token from Authorization header
 * @param {string} authHeader - The Authorization header value
 * @returns {string|null} The token or null
 */
export function extractTokenFromHeader(authHeader) {
    if (!authHeader) return null;
    
    // Support both "Bearer token" and just "token" formats
    const parts = authHeader.split(' ');
    
    if (parts.length === 2 && parts[0] === 'Bearer') {
        return parts[1];
    } else if (parts.length === 1) {
        return parts[0];
    }
    
    return null;
}
