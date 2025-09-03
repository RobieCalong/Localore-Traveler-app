import { getQuests, getQuestById } from "#db/queries/quests";
import express, { Router } from "express";

const router = express(Router());

//  /quests
router.route("/").get(async (req, res) => {
  const quests = await getQuests();
  res.status(200).json(quests);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("id must be a positive number");
  }

  const quest = await getQuestById(id);

  req.quest = quest;

  next();
});

//  /quests/:id         NEEDS getUserFromToken middleware for the POST createUserQuest
router.route("/:id").get((req, res) => {
  res.status(200).json(req.quest);
});

//  can delete this route because PUT /usersquests/:id/complete has been created
// router.route("/:id/upload").put((req, res) => {
    
// })

export default router;
