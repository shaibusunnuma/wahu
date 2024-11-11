import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            const error = new Error("Invalid token format");
            res.status(401);
            return next(error);
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = await AuthService.verifyUserToken(token);
        req.userId = decodedToken.uid;

        next();
    } catch (error) {
        res.status(401); 
        next(error); 
    }
};

export default authMiddleware;
