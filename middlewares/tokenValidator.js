import { sessionRepository, userRepository } from "../repositories/index.js";
export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const { rows: sessions } = await sessionRepository.getSessionByToken(token);
    const [session] = sessions;
    if (!session) {
      return res.sendStatus(401);
    }
    const { rows: users } = await userRepository.getUserById(session.userId);
    const [user] = users;
    if (!user) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
