import db from "../config/db.js";

async function insertSession(userId, token) {
  return db.query(
    `INSERT INTO sessions (token, "userId") 
    VALUES ($1, $2)`,
    [token, userId]
  );
}

export const sessionRepository = {
  insertSession,
};
