import db from "#db/client";

export async function createLevel(name, min_xp, max_xp) {
<<<<<<< HEAD
    const SQL =`
=======
  const SQL = `
>>>>>>> origin/main
    INSERT INTO levels
        (name, min_xp, max_xp)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;
<<<<<<< HEAD
    const {
        rows: [level],
    } = await db.query(SQL, [name, min_xp, max_xp])
    return level
}

export async function getLevels() {
    const SQL = `
    SELECT *
    FROM levels
    `;
    const { rows: levels } = await db.query(SQL)
    return levels
}
=======
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
>>>>>>> origin/main
