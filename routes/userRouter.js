import { Router } from "express";

const userRouter = Router();

userRouter.post("/users/me");
userRouter.get("/ranking");

export default userRouter;
