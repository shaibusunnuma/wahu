import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateSchema } from "../middlewares/validators/validateRequest";
import { authSchema } from "../middlewares/validators/authSchema";
const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post(
  "/register",
  validateSchema(authSchema.register),
  AuthController.register
);

export default authRouter;
