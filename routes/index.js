import { Router } from "express";
import sessionRouter from "./sessionRouter.js";
import urlRouter from "./urlRouter.js";
import userRouter from "./userRouter.js";
const router = Router();

router.use(sessionRouter);
router.use(urlRouter);
router.use(userRouter);

export default router;
