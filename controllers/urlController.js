import { urlRepository } from "../repositories/index.js";
import { nanoid } from "nanoid";
export async function reduceUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;
  const charsNumber = 10;
  const shortUrl = nanoid(charsNumber);
  try {
    await urlRepository.insertShortUrl(id, url, shortUrl);
    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const { rows: urls } = await urlRepository.selectUrlById(id);
    const [url] = urls;

    if (!url) {
      return res.sendStatus(404);
    }
    delete url.visitCount;
    delete url.createdAt;
    delete url.userId;
    res.status(200).send(url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function openUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const { rows: urls } = await urlRepository.selectUrlByShortUrl(shortUrl);
    const [url] = urls;
    if (!url) {
      return res.sendStatus(404);
    }
    await urlRepository.updateVisitCount(url.id);
    res.redirect([200], url.url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;
  try {
    const { rows: urls } = await urlRepository.selectUrlById(id);
    const [url] = urls;
    if (!url) {
      return res.sendStatus(404);
    }
    if (url.userId !== user.id) {
      return res.sendStatus(401);
    }
    await urlRepository.deleteUrlById(id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
