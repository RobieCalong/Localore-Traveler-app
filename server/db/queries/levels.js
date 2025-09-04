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

export async function getLevelById() {
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
