import db from "#db/client";

export async function createQuest(title, messages, points, location, badge_id ) {
    const SQL = `
    INSERT INTO quests
        (title, messages, points, location, badge_id)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const {
        rows: [quest],
    } = await db.query(SQL, [title, messages, points, location, badge_id])
    return quest
}

export async function getQuests() {
    const SQL = `
    SELECT *
    FROM quests
    `;
    const { rows: quest } = await db.query(SQL)
    return quest
}