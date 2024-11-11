import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/auth.middleware";


const userRouter = Router();
userRouter.use(authMiddleware);

userRouter
  .route("")
  .post(UserController.createUserProfile)
  .patch( UserController.updateUserProfile)
  .get(UserController.getUserProfile)
  .delete(UserController.deleteUserProfile);

export default userRouter;
