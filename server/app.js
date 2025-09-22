import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
export default app;

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

// 🔹 Setup
app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(getUserFromToken);

// 🔹 API routes
app.get("/", (req, res) => res.send("API is running..."));

app.use("/users", usersRouter);
app.use("/location", locationRouter);
app.use("/quests", questsRouter);
app.use("/usersquests", usersQuests);
app.use("/level", levelRouter);
app.use("/", badgeRouter);

// 🔹 Serve frontend build
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "client/dist"))); // Vite
// 👉 if CRA, change "dist" to "build"

// For all non-API routes, send back index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// 🔹 Error handling
app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
