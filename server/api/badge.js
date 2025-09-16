import express, { Router } from "express";

import db from "#db/client";
import { getBadgeById } from "#db/queries/badges";
import { getQuestById } from "#db/queries/quests";

const router = express(Router())

router.get("/users_badges/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        // Get all completed quests for the user
        const userQuestsSQL = `
            SELECT q.badge_id
            FROM users_quests uq
            JOIN quests q ON uq.quest_id = q.id
            WHERE uq.user_id = $1 AND uq.complete = true
        `;
        const { rows } = await db.query(userQuestsSQL, [userId]);
        const badgeIds = rows.map(row => row.badge_id);

        if (badgeIds.length === 0) return res.json([]);

        // Get badge details
        const badgesSQL = `
            SELECT * FROM badges WHERE id = ANY($1)
        `;
        const { rows: badges } = await db.query(badgesSQL, [badgeIds]);
        res.json(badges);
    } catch (err) {
        res.status(500).send("Error fetching user badges");
    }
});

router.route("/users_quests/:id/badge").get(async (req, res) => {
	const { id } = req.params;
	try {
		const userQuestSQL = `SELECT * FROM users_quests WHERE id = $1`;
		const { rows: [userQuest] } = await db.query(userQuestSQL, [id]);
		if (!userQuest) return res.status(404).send("User quest not found");

		const quest = await getQuestById(userQuest.quest_id);
		if (!quest) return res.status(404).send("Quest not found");

		const badge = await getBadgeById(quest.badge_id);
		if (!badge) return res.status(404).send("Badge not found");

		res.status(200).json(badge);
	} catch (err) {
		res.status(500).send("Error fetching badge");
	}
});

export default router;