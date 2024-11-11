import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { HttpError } from "../../utils/HttpErrorHandler";

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new HttpError(
          400,
          "Validation failed: " + error.errors.map(err => 
            `${err.path.join('.')}: ${err.message}`
          ).join(', ')
        ));
      }
      next(error);
    }
  };
