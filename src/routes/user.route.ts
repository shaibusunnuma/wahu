import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validators/validateRequest";
import { profileSchema } from "../middlewares/validators/profileSchema";

const userRouter = Router();
userRouter.use(authMiddleware);

userRouter
  .route("")
  .post(validateSchema(profileSchema.create), UserController.createUserProfile)
  .patch(validateSchema(profileSchema.update), UserController.updateUserProfile)
  .get(UserController.getUserProfile)
  .delete(UserController.deleteUserProfile);

export default userRouter;
