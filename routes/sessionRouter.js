import { Router } from "express";

const sessionRouter = Router();

sessionRouter.post("/signup");
sessionRouter.post("/signin");

export default sessionRouter;
