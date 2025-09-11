import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(
  username,
  password,
  experience = 0,
  level_id = 1
) {
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

//////// HAD TO REVERT THIS FUNCTION BACK TO ITS ORIGINAL code -- was causing incorrect user_id when verify from token in getUserFromToken middleware
// export async function getUserById(id) {
//   const sql = `
//     SELECT users.*, levels.*
//     FROM users
//     JOIN levels ON users.level_id = levels.id
//     WHERE users.id = $1
//   `;
//   const { rows: [user] } = await db.query(sql, [id]);
//   return user;
// }

export async function getUserById(id) {
  const sql = `
    SELECT *
    FROM users
    WHERE users.id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
