import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  static async createUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.createUserProfile(req.userId, req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const user = await UserService.getUserProfile(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req;
      const user = await UserService.updateUserProfile(userId, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req;
      await UserService.deleteUserProfile(userId);
      res.status(200).json("Your profile has been deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
