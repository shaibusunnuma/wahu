import { Request, Response, NextFunction } from "express";

export interface ServerError extends Error {
  statusCode: number;
}

export default function errorMiddleware(
  error: ServerError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Server Error", error);

  res.status(error.statusCode || 500).json({
    message: error.message,
  });
}
