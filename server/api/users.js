import express from "express";
import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import { getUserById } from "#db/queries/users";
import getUserFromToken from "#middleware/getUserFromToken";
import requireUser from "#middleware/requireUser";

const router = express.Router();

/**
 * POST /users/register
 * Creates a new user account
 */

router.post(
    "/register",
    requireBody(["username", "password"]),
    async (req, res, next) => {
        try {
            const { username, password } = req.body;
            
            // Validate username and password format
            if (username.length < 3) {
                return res.status(400).json({
                    error: "Username must be at least 3 characters long"
                });
            }
            
            if (password.length < 6) {
                return res.status(400).json({
                    error: "Password must be at least 6 characters long"
                });
            }
            
            // Create user (password will be hashed in createUser function)
            const user = await createUser(username, password);
            
            // Generate JWT token
            const token = await createToken({ 
                id: user.id,
                username: user.username
              });
            
            // Send success response with token
            res.status(201).json({
                message: "User created successfully",
                token: token,
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        } catch (error) {
            // Handle duplicate username error
            if (error.message === 'Username already exists') {
                return res.status(409).json({
                    error: "Username already exists"
                });
            }
            
            // Pass other errors to error handler
            next(error);
        }
    }
);

/**
 * POST /users/login
 * Authenticates user and returns JWT token
 */
router.post(
    "/login",
    requireBody(["username", "password"]),
    async (req, res, next) => {
        try {
            const { username, password } = req.body;
            
            // Verify credentials
            const user = await getUserByUsernameAndPassword(username, password);
            
            if (!user) {
                return res.status(401).json({
                    error: "Invalid username or password"
                });
            }
            
            // Generate JWT token
            const token = await createToken({ 
                id: user.id,
                username: user.username 
            });

       // Send success response
            res.json({
                message: "Login successful",
                token: token,
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        } catch (error) {
            // Log error for debugging
            console.error("Login error:", error);
            
            // Send generic error to client
            res.status(500).json({
                error: "An error occurred during login"
            });
        }
    }
);


router.get("/:userId", getUserFromToken, requireUser, async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Only allow users to access their own info
        if (parseInt(userId, 10) !== req.user.id) {
            return res.status(403).json({ error: "Forbidden: You can only access your own user info." });
        }
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch(error) {
        next(error);
    }
});


export default router;
