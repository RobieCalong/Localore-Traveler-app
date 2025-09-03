import express, { Router } from "express";
import db from "#db/client";

const router = express(Router());


// Returns all badges earned by a user (completed quests)
router.route("/:userId").get(async (req, res) => {
  const { userId } = req.params;
  try {
    const userQuestsSQL = `
      SELECT quests.badge_id
      FROM users_quests
      JOIN quests ON users_quests.quest_id = quests.id
      WHERE users_quests.user_id = $1 AND users_quests.complete = true
    `;
    const { rows: badgeIds } = await db.query(userQuestsSQL, [userId]);
    if (!badgeIds.length) return res.status(200).json([]);

    const badgesSQL = `
      SELECT * FROM badges WHERE id = ANY($1)
    `;
    const badgeIdArray = badgeIds.map(row => row.badge_id);
    const { rows: badges } = await db.query(badgesSQL, [badgeIdArray]);
    res.status(200).json(badges);
  } catch (err) {
    res.status(500).send("Error fetching user badges");
  }
});

export default router;
