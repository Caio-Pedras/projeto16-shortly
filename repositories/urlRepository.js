import db from "../config/db.js";

async function insertShortUrl(userId, url, shortUrl) {
  return db.query(
    `INSERT INTO sessions ( "userId", url, "shortUrl") 
    VALUES ($1, $2, $3)`,
    [userId, url, shortUrl]
  );
}

export const urlRepository = {
  insertShortUrl,
};
