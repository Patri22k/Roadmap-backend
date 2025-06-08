import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {env} from "./env";

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, env("JWT_SECRET"), {
       expiresIn: '1h'
    });
}

export const hashPassword = async (pass: string) => {
  return bcrypt.hash(pass, env("PASSWORD_SALT"));
}