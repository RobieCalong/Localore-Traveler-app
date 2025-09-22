import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";

import usersRouter from "#api/users";
import locationRouter from "#api/location";
import questsRouter from "#api/quests";
import usersQuests from "#api/users_quests";
import levelRouter from "#api/level";
import badgeRouter from "#api/badge";

import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";

const app = express();
export default app;

// 🔹 Setup
app.use(cors({
  origin: process.env.CORS_ORIGIN ?? "https://localore-traveler-app-1.onrender.com", // change to your frontend Render URL
  credentials: true
}));
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

// ❌ Removed all `express.static` and `res.sendFile` stuff
// ✅ Backend is API-only now

// 🔹 Error handling
app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
