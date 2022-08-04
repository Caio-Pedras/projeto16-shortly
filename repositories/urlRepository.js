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
async function selectAllUrlByUser(userId) {
  return db.query(
    `
    SELECT urls.id AS id, urls."shortUrl" AS "shortUrl", urls.url AS url, urls."visitCount" AS "visitCount"  
    FROM urls 
    WHERE "userId"=$1`,
    [userId]
  );
}
async function sumVisitCount(userId) {
  return db.query(
    `
    SELECT SUM("visitCount") 
    FROM urls 
    WHERE "userId" =$1`,
    [userId]
  );
}
async function getUrlsRanking() {
  return db.query(
    `SELECT users.id AS id, users.name AS name, COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") AS "visitCount"
    FROM urls
    JOIN users ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
   `
  );
}

export const urlRepository = {
  insertShortUrl,
  selectUrlById,
  selectUrlByShortUrl,
  updateVisitCount,
  deleteUrlById,
  selectAllUrlByUser,
  sumVisitCount,
  getUrlsRanking,
};
