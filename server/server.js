import app from './app.js';
import db from './db/client.js';

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await db.connect();
    console.log('Connected to database!');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();