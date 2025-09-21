import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
export default app;


import path from "path";
import { fileURLToPath } from "url";
import usersRouter from "#api/users";
import locationRouter from "#api/location";
import questsRouter from "#api/quests";
import usersQuests from "#api/users_quests";
import levelRouter from "#api/level";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";
import badgeRouter from "#api/badge";


app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/users", usersRouter);
app.use("/location", locationRouter);
app.use("/quests", questsRouter);
app.use("/usersquests", usersQuests);
app.use("/level", levelRouter);
app.use("/", badgeRouter);

// Serve static files from client/dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// For all non-API routes, serve index.html (React Router support)
app.get("*", (req, res, next) => {
  // If the request matches an API route, skip
  if (
    req.path.startsWith("/users") ||
    req.path.startsWith("/location") ||
    req.path.startsWith("/quests") ||
    req.path.startsWith("/usersquests") ||
    req.path.startsWith("/level") ||
    req.path.startsWith("/badge")
  ) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
