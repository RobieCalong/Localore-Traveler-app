import db from "#db/client";

export async function createUserQuest(user_id, quest_id) {
  const SQL = `
    INSERT INTO users_quests
        (user_id, quest_id)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const {
    rows: [userQuest],
  } = await db.query(SQL, [user_id, quest_id]);
  return userQuest;
}

export async function getUserQuest() {
  const SQL = `
    SELECT *
    FROM user_quests
    `;
  const { rows: user_quest } = db.query(SQL);
  return user_quest;
}
