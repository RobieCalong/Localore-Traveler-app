import express, { Router } from "express";
import {
  acceptUserQuest,
  createUserQuest,
  markQuestComplete,
} from "#db/queries/users_quests";

import getUserFromToken from "#middleware/getUserFromToken";

const router = express(Router());

router.route("/").get((req, res) => {
  res.status(200).send("route /usersquests works");
});

//  POST /usersquests/quest/:id           NEEDS getUserFromToken middleware to get user_id
//  when user clicks YES when they accept the quest, creates users_quests entry
router.route("/quest/:questId").post(getUserFromToken, async (req, res) => {
  const { questId } = req.params;

  const user_id = req.user.id
  // const user_id = 2; //static for now, but user_id comes from getUserFromToken

  try {
    const userQuest = await acceptUserQuest(user_id, questId);
    console.log("console log hit: ", userQuest);

    // if userQuest has no value, then it means the user already accepted the quest
    if (!userQuest) {
      return res.status(404).send("User_Quest already accepted");
    }
    res.status(200).json(userQuest);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user's quest");
  }
});

//    /usersquests/:id/complete
router.route("/:id/complete").put(async (req, res) => {
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
