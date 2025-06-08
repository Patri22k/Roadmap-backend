import {Request, Response, Router} from 'express';
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt';
import {generateToken, hashPassword} from "../utils/security_utils";
import {loginUserSchema, registerUserSchema} from "../validations/userValidation";
import {handleError, PrismaErrorCode} from "../utils/handleError";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    // Validate request body
    const {name, email, password} = registerUserSchema.parse(req.body);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      }
    });

    // Generate JWT
    const token = generateToken(user.id);

    res.status(201).json({token});
  } catch (error) {
    // Handle validation errors from zod or prisma
    handleError(res, error, (prismaErrorCode) => {
      if (prismaErrorCode == PrismaErrorCode.CONFLICT) {
        return res.status(400).json({message: "User with this email already exists"});
      } else {
        // Handle other errors
        return res.status(500).json({message: "Error creating user in database, " + error});
      }
    });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const {email, password} = loginUserSchema.parse(req.body);

    // Find user by email
    const user = await prisma.user.findUniqueOrThrow(
      {
        where: {email}
      });

    const passwordFromReq = await hashPassword(password);

    // Check password
    const isPasswordValid = await bcrypt.compare(passwordFromReq, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({message: "Invalid password."});
    }

    // Generate JWT
    const token = generateToken(user.id);

    res.status(200).json({token});
  } catch (error) {
    // Handle validation errors from zod
    handleError(res, error, (prismaErrorCode) => {
      if (prismaErrorCode == PrismaErrorCode.NOT_FOUND) {
        res.status(404).json({message: "User not found"});
      } else {
        // Handle other errors
        res.status(500).json({message: "Error logging in user, " + error});
      }
    });
  }
});

export const userRouter = router;