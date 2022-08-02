import { Router } from "express";
import { validateSchema } from "../controllers/schemaValidator.js";
import { signIn, signUp } from "../controllers/sessionController.js";
import userSchema from "../schemas/userSchema.js";
import signInSchema from "../schemas/signInSchema.js";

const sessionRouter = Router();

sessionRouter.post("/signup", validateSchema(userSchema), signUp);
sessionRouter.post("/signin", validateSchema(signInSchema), signIn);

export default sessionRouter;
