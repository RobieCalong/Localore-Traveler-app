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
  const SQL = `
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
  const SQL = `
  SELECT
    sum(q.points) total_experience
  FROM quests AS q
  JOIN users_quests uq ON uq.quest_id = q.id
  WHERE
    uq.user_id = $1
    AND uq.complete = true
  `;
  const {
    rows: [result],
  } = await db.query(SQL, [user_id]);

  const totalExperience = result.total_experience || 0;

  //Updates experience in users table
  await db.query(`UPDATE users SET experience = $1 WHERE id = $2`, [
    totalExperience,
    user_id,
  ]);

  return totalExperience;
}

export async function getUserTotalExperience(user_id) {
  const SQL = `
  SELECT
    sum(q.points) total_experience
  FROM quests AS q
  JOIN users_quests uq ON uq.quest_id = q.id
  WHERE
    uq.user_id = $1
    AND uq.complete = true
  `;
  const {
    rows: [result],
  } = await db.query(SQL, [user_id]);

  const totalExperience = result.total_experience || 0;

  return totalExperience;
}

export async function getLevelName(user_id) {
  const result = await getUserTotalExperience(user_id);
  // console.log(result);
  const userTotalExperience = result;
  console.log("this is userTotalExperience: ", userTotalExperience);

  const SQL = `
  SELECT levels.name 
  FROM levels 
  WHERE $1 BETWEEN levels.min_xp AND levels.max_xp
  `;

  const {
    rows: [levelName],
  } = await db.query(SQL, [userTotalExperience]);

  return levelName;
}

export async function getLevelAndUpdateLevelId(user_id) {
  const result = await getLevelName(user_id);

  const levelName = result.name;
  console.log("this is levelName: ", levelName);
  //using sub-query example
  //SELECT levels.id FROM levels WHERE levels.name = levelName
  // full query
  //UPDATE users SET level_id = (SELECT levels.id FROM levels WHERE levels.name = 'Nomad') WHERE users.id = 1

  //update user level_id
  const SQL = `
  UPDATE users 
  SET level_id = (SELECT levels.id FROM levels WHERE levels.name = $1) 
  WHERE users.id = $2
  RETURNING *
  `;

  const {
    rows: [updatedUserLevel],
  } = await db.query(SQL, [levelName, user_id]);

  return updatedUserLevel;
}
