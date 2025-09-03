import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usersRouter from './api/users.js';
import { handlePostgresErrors } from './middleware/handlePostgresErrors.js';
import { requireUser } from './middleware/requireUser.js';

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Logging

// Public routes
app.use('/api/users', usersRouter);

// Example protected route
app.get('/api/protected', requireUser, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

// Example: Quests router (protected)
app.use('/api/quests', requireUser, questsRouter); // Add your quests router here

// Error handling middleware (should be last)
app.use(handlePostgresErrors);

// Generic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
