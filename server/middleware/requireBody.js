/**
 * Middleware to validate required fields in request body
 * @param {Array<string>} requiredFields - Fields that must be present
 * @returns {Function} Express middleware function
 */
function requireBody(requiredFields) {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ 
                error: 'Request body is missing' 
            });
        }
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }
        
        next();
    };
}

export default requireBody;
