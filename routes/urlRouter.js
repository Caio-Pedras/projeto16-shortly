import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import {
  deleteUrlById,
  getUrlById,
  openUrl,
  reduceUrl,
} from "../controllers/urlController.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateToken } from "../middlewares/tokenValidator.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  validateToken,
  reduceUrl
);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", openUrl);
urlRouter.delete("/urls/:id", validateToken, deleteUrlById);

export default urlRouter;
