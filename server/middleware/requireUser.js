import { verifyToken, extractTokenFromHeader } from '../utils/jwt.js';
import { getUserById } from '../db/queries/users.js';

/**
 * Middleware to verify JWT token and attach user to request
 * Used for protected routes
 */
export default async function requireUser(req, res, next) {
    try {
        // Extract token from Authorization header
        const token = extractTokenFromHeader(req.headers.authorization);
        
        if (!token) {
            return res.status(401).json({ 
                error: 'Unauthorized - No token provided' 
            });
        }

              // Verify the token
        const decoded = await verifyToken(token);
        
        // Get user from database
        const user = await getUserById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ 
                error: 'Unauthorized - Invalid token' 
            });
        }
        
        // Attach user to request object for use in route handlers
        req.user = user;
        next();
    } catch (error) {
        // Token verification failed
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: 'Unauthorized - Invalid token' 
            });
        }
       if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Unauthorized - Token expired' 
            });
        }
        
        // Other errors
        console.error('Error in requireUser middleware:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
}


