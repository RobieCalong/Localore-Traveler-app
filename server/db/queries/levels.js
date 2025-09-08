import db from "#db/client";

export async function createLevel(name, min_xp, max_xp) {
  const SQL = `
    INSERT INTO levels
        (name, min_xp, max_xp)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;
  const {
    rows: [level],
  } = await db.query(SQL, [name, min_xp, max_xp]);
  return level;
}

export async function getLevels() {
  const SQL = `
    SELECT *
    FROM levels
    `;
  const { rows: levels } = await db.query(SQL);
  return levels;
}

export async function getLevelById(id) {
  const SQL =`
    SELECT *
    FROM levels
    WHERE id = $1
    `;
  const { 
    rows: [level],
  } = await db.query(SQL, [id]);
  return level;
}

export async function getUserPointsAndUpdateExperience(user_id) {
  const SQL =`
  SELECT
    sum(q.points) AS total_experience
  FROM quests q
  JOIN users_quests uq ON uq.quest_id = q.id
  WHERE
    uq.user_id = $1
    AND uq.completed = true
  `;
  const {
    rows: [result],
  } = await db.query(SQL, [user_id])

  const totalExperience = result.total_experience || 0;

  //Updates experience in users table
  await db.query(
    `UPDATE users SET experience = $1 WHERE id = $2`,
    [totalExperience, user_id]
  );

  return totalExperience;
}
