import db from "../config/db.js";
import bcrypt from "bcrypt";

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email= $1`, [email]);
}

async function insertUser(name, email, password) {
  const cryptPassword = bcrypt.hashSync(password, 10);
  return db.query(
    `INSERT INTO users (name, email, password) 
    VALUES ($1,$2,$3)`,
    [name, email, cryptPassword]
  );
}

export const userRepository = {
  getUserByEmail,
  insertUser,
};
