import {Response} from "express";
import {ZodError} from "zod";
import {Prisma} from "@prisma/client";

export enum PrismaErrorCode {
  CONFLICT,
  NOT_FOUND,
}

export const handleError = (
  res: Response, error: any, unknownErrorCallback?: (prismaErrorCode?: PrismaErrorCode) => any) => {
  // Check if the error is an instance of ZodError
  if (error instanceof ZodError && "errors" in error) {
    handleZodError(res, error);
  } else {
    let handled = false;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      handled = handlePrismaError(res, error);
    }

    if (handled) {
      return;
    }

    const prismaErrorCode = determinePrismaErrorCode(error);

    (unknownErrorCallback ?? ((_) => {
      res.status(500).json({message: "An unexpected error occured"});
    }))(prismaErrorCode);
  }
}

const handleZodError = (res: Response, error: ZodError) => {
  return res.status(400).json({
    message: "Validation failed",
    errors: error.errors,
  });
}

const handlePrismaError = (res: Response, error: Prisma.PrismaClientKnownRequestError) => {
  // TODO: Common prisma errors: connection errors, etc.

  return false;
}

const determinePrismaErrorCode = (error: Prisma.PrismaClientKnownRequestError) => {
  switch (error.code) {
    case "P2002": // Unique constraint failed
      return PrismaErrorCode.CONFLICT;
    case "P2025": // Record not found
      return PrismaErrorCode.NOT_FOUND;
  }

  return undefined;
}