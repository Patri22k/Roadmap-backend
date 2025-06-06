import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const authToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({message: "Unauthorized: No token provided"});
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = {userId: decoded.userId};
    next();
  } catch (error) {
    res.status(401).json({message: "Unauthorized: Invalid token"});
    return;
  }
}