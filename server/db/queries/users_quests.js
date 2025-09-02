import db from "#db/client";

export async function createUserQuest(user_id, quest_id, complete = false, quest_image_url = null) {
  const SQL = `
    INSERT INTO users_quests
        (user_id, quest_id, complete, quest_image_url)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [userQuest],
  } = await db.query(SQL, [user_id, quest_id, complete, quest_image_url]);
  return userQuest;
}

export async function getUserQuest() {
  const SQL = `
    SELECT *
    FROM users_quests
    `;
  const { rows: user_quest } = await db.query(SQL);
  return user_quest;
}

export async function markQuestComplete(id, complete = false, quest_image_url = null) {
  const SQL = `
    UPDATE users_quests
    SET complete = $2, quest_image_url = $3
    WHERE id = $1
    RETURNING *
  `;

  const { rows: [userQuest] } = await db.query(SQL, [id, complete, quest_image_url]);
  return userQuest
}
  
