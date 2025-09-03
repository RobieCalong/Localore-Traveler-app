import express, { Router } from "express";
import { markQuestComplete } from "#db/queries/users_quests";

const router = express(Router());

router.route("/").get((req, res) => {
  res.status(200).send("route /usersquests works");
});

router.route("/:id/complete").put(async (req,res) => {
  const { id } = req.params;
  const { quest_image_url } = req.body;
  try {
    const updatedQuest = await markQuestComplete(id, true, quest_image_url);
    if (!updatedQuest) return res.status(404).send("Quest not found");
    res.status(200).json(updatedQuest);
  } catch (err) {
    res.status(500).send("Error updating quest completion");
  }
});


export default router;
