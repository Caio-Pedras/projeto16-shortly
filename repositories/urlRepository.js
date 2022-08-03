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
async function selectUrlByShortUrl(shortUrl) {
  return db.query(`SELECT * FROM urls WHERE "shortUrl"=$1 `, [shortUrl]);
}
async function updateVisitCount(id) {
  return db.query(
    `UPDATE urls 
    SET "visitCount"= "visitCount" +1 
    WHERE id=$1 `,
    [id]
  );
}
async function deleteUrlById(id) {
  return db.query(`DELETE FROM urls WHERE id=$1`, [id]);
}

export const urlRepository = {
  insertShortUrl,
  selectUrlById,
  deleteUrlById,
  selectUrlByShortUrl,
  updateVisitCount,
};
