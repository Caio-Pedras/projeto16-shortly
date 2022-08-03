import db from "../config/db.js";

async function insertShortUrl(userId, url, shortUrl) {
  return db.query(
    `INSERT INTO urls ( "userId", url, "shortUrl") 
    VALUES ($1, $2, $3)`,
    [userId, url, shortUrl]
  );
}
async function selectUrlById(id) {
  return db.query(`SELECT * FROM urls WHERE id=$1 `, [id]);
}
export const urlRepository = {
  insertShortUrl,
  selectUrlById,
};
