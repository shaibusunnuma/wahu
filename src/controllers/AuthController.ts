import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { RegisterUserDto } from "../dto/user.dto";
import { HttpError } from "../utils/HttpErrorHandler";

/**
 * With firebase, login and register are usually handled by the client side.
 * Hence, this controller is used to verify token from client side
 * The register method is used to create a new user in the database if for some reason the client does not support firebase auth.
 */

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { idToken } = req.body;
    try {
      const tokenResponse = await AuthService.verifyUserToken(idToken);
      if (tokenResponse) {
        // Set a session, JWT, or other auth method for logged-in user
        res
          .status(200)
          .json({ message: "Login successful", userId: tokenResponse.uid });
      } else {
        throw new HttpError(401, "Unauthorized");
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO: RegisterUserDto = req.body;
      const user = await AuthService.register(userDTO);
      if (!user) {
        throw new HttpError(400, "Failed to register user");
      }
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
