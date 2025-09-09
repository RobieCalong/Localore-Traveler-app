import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password, experience, level_id) {
  const sql = `
  INSERT INTO users
    (username, password, experience, level_id)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword, experience, level_id]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(id) {
  const sql = `
    SELECT users.*, levels.*
    FROM users
    JOIN levels ON users.level_id = levels.id
    WHERE users.id = $1
  `;
  const { rows: [user] } = await db.query(sql, [id]);
  return user;
}
