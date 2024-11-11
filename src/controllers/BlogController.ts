import { NextFunction, Request, Response } from "express";
import BlogService from "../services/BlogService";
import { HttpError } from "../utils/HttpErrorHandler";

class BlogController {
  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await BlogService.createPost(req.body);
      res.status(201).json(blog);
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const blog = await BlogService.getPostById(id);
      if (!blog) {
        throw new HttpError(404, `Blog with ID ${id} not found`);
      }

      res.status(200).json(blog);
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await BlogService.updatePost(id, req.body);
      res.status(200).json(blog);
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BlogService.deletePost(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;
      if (userId) {
        const blogs = await BlogService.getUserPosts(userId as string);
        res.status(200).json(blogs);
      } else {
        const blogs = await BlogService.getPosts();
        res.status(200).json(blogs);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default BlogController;
