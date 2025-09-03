import db from "#db/client";

export async function createBadge(name, badge_image) {
  const sql = `
    INSERT INTO badges
        (name, badge_image)
    VALUES 
        ($1, $2) 
    RETURNING *
    `;
  const {
    rows: [badge],
  } = await db.query(sql, [name, badge_image]);
  return badge;
}

export async function getBadges() {
<<<<<<< HEAD
    const SQL = `
    SELECT *
    FROM tracks
    `;
    const { rows: badges } = await db.query(SQL)
    return badges
}

export async function getBadgeById(id) {
    const SQL =`
=======
  const SQL = `
    SELECT *
    FROM tracks
    `;
  const { rows: badges } = await db.query(SQL);
  return badges;
}

export async function getBadgeById(id) {
  const SQL = `
>>>>>>> origin/main
    SELECT *
    FROM badges
    WHERE id = $1
    `;
<<<<<<< HEAD
    const { rows: [badge] } = await db.query(SQL, [id])
    return badge
}
=======
  const {
    rows: [badge],
  } = await db.query(SQL, [id]);
  return badge;
}
>>>>>>> origin/main
