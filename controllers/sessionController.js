import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../config/db.js";
import { sessionRepository, userRepository } from "../repositories/index.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const validateEmail = await userRepository.getUserByEmail(email);

    if (validateEmail.rowCount > 0) {
      return res.sendStatus(409);
    }
    await userRepository.insertUser(name, email, password);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const { rows: users } = await userRepository.getUserByEmail(email);
    const [user] = users;
    if (!user) {
      return res.sendStatus(401);
    }
    if (bcrypt.compareSync(password, user.password)) {
      const { rows: verifySession } =
        await sessionRepository.getSessionByUserId(user.id);
      if (verifySession) {
        return res.send({ token: verifySession[0].token, user: user.name });
      }
      const token = uuid();
      await sessionRepository.insertSession(user.id, token);

      return res.send({ token: token, user: user.name });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
