import { urlRepository } from "../repositories/index.js";

export async function getUserInfo(req, res) {
  const { id, name } = res.locals.user;
  try {
    const { rows: shortenedUrls } = await urlRepository.selectAllUrlByUser(id);
    const { rows: visitCountResult } = await urlRepository.sumVisitCount(id);
    const visitCount = visitCountResult[0].sum || 0;
    const body = {
      id,
      name,
      visitCount,
      shortenedUrls,
    };
    res.status(200).send(body);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await urlRepository.getUrlsRanking();
    res.status(200).send(ranking);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
