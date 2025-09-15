import express, { Router } from "express";
import {
  getLevels,
  createLevel,
  getLevelById,
  getUserPointsAndUpdateExperience,
  getUserTotalExperience,
  getLevelName,
  getLevelAndUpdateLevelId,
} from "#db/queries/levels";
import db from "#db/client";
import getUserFromToken from "#middleware/getUserFromToken";

const router = express(Router());

//GET ALL LEVELS
router.route("/").get(async (req, res) => {
  const levels = await getLevels();
  res.status(200).json(levels);
});

//GET SINGLE LEVEL BY ID
router.route("/:id").get(async (req, res) => {
  const level = await getLevelById(req.params.id);
  if (!level) return res.status(404).send("Level not found");
  res.status(200).json(level);
});

//  PUT /level/userexperience/       UPDATE user experience
router
  .route("/user/experience")
  .get(getUserFromToken, async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      const userTotalExperience = await getUserTotalExperience(userId);
      console.log(userTotalExperience);
      if (!userTotalExperience) {
        return res.status(404).send("Invalid experience points");
      }
      res.status(200).json(userTotalExperience);
    } catch (error) {
      res.status(500).send("Error getting user experience");
    }
  })
  .put(getUserFromToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const updatedUserExperience = await getUserPointsAndUpdateExperience(
        userId
      );
      if (!updatedUserExperience) {
        return res.status(404).send("Invalid experience points");
      }
      res.status(201).send("Successful update User experience");
    } catch (error) {
      res.status(500).send("Error updating user experience");
    }
  });

router
  .route("/user/levelname")
  .get(getUserFromToken, async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      const userLevelName = await getLevelName(userId);
      if (!userLevelName) {
        return res.status(404).send("User's Level not found");
      }
      res.status(200).json(userLevelName);
    } catch (error) {
      res.status(500).send("Error getting user level name");
    }
  })
  .put(getUserFromToken, async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("userId: ", userId);
      const updatedUserLevel = await getLevelAndUpdateLevelId(userId);
      console.log(updatedUserLevel);
      if (!updatedUserLevel) {
        return res.status(404).send("Invalid user level");
      }
      res.status(201).send("Successful updating User Level");
    } catch (error) {
      res.status(500).send("Error updating user level");
    }
  });

export default router;
