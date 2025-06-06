import {Response} from "express";
import {ZodError} from "zod";

export default function zodError(res: Response, error: any) {
  // Check if the error is an instance of ZodError
  if (error instanceof ZodError && "errors" in error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors,
    });
  }
}