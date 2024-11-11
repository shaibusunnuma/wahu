import { Router } from "express";
import BlogController from "../controllers/BlogController";
import { validateSchema } from "../middlewares/validators/validateRequest";
import { blogSchema } from "../middlewares/validators/blogSchema";
import authMiddleware from "../middlewares/auth.middleware";

const blogRouter = Router();
blogRouter.use(authMiddleware);

blogRouter
  .route("")
  .post(validateSchema(blogSchema.create), BlogController.createPost)
  .get(validateSchema(blogSchema.filter), BlogController.getPosts);

blogRouter
  .route("/:id")
  .get(validateSchema(blogSchema.withId), BlogController.getPostById)
  .patch(validateSchema(blogSchema.update), BlogController.updatePost)
  .delete(validateSchema(blogSchema.withId), BlogController.deletePost);

export default blogRouter;
