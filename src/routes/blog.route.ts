import { Router } from "express";
import BlogController from "../controllers/BlogController";
import { validateSchema } from "../middlewares/validators/validateRequest";
import { blogSchema } from "../middlewares/validators/blogSchema";
const blogRouter = Router();

blogRouter
  .route("")
  .post(validateSchema(blogSchema.create), BlogController.createBlog)
  .get(validateSchema(blogSchema.filter), BlogController.getBlogs);

blogRouter
  .route("/:id")
  .get(validateSchema(blogSchema.withId), BlogController.getBlogById)
  .patch(validateSchema(blogSchema.update), BlogController.updateBlog)
  .delete(validateSchema(blogSchema.withId), BlogController.deleteBlog);

export default blogRouter;
