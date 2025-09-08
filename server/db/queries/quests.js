import db from "#db/client";

export async function createQuest(title, messages, points, location, badge_id) {
  const SQL = `
    INSERT INTO quests
        (title, messages, points, location, badge_id)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const {
    rows: [quest],
  } = await db.query(SQL, [title, messages, points, location, badge_id]);
  return quest;
}

export async function getQuests() {
  const SQL = `
    SELECT *
    FROM quests
    `;
  const { rows: quest } = await db.query(SQL);
  return quest;
}

export async function getQuestById(id) {
  const sql = `
  SELECT * FROM quests WHERE id = $1
  `;
  const {
    rows: [quest],
  } = await db.query(sql, [id]);
  return quest;
}

export async function getQuestsByLocation(city) {
  const sql = `
  SELECT * FROM quests WHERE location = $1
  `;
  const { rows: cityQuests } = await db.query(sql, [city]);
  return cityQuests;
}

//GETS QUEST POINTS
export async function getQuestPoints(points) {
  const SQL =`
  SELECT * FROM quests where points = $1
  `;
  const { rows: questPoints } = await db.query(SQL, [points]);
  return questPoints;
}