import {Router, Request, Response} from 'express';
import {PrismaClient} from '../generated/prisma';
import bcrypt from 'bcrypt';
import {generateToken} from "../utils/jwt";
import {loginUserSchema, registerUserSchema} from "../validations/userValidation";
import zodError from "../utils/zodError";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    // Validate request body
    const {name, email, password} = registerUserSchema.parse(req.body);

    // Check for existing user
    const existingUser = await prisma.user.findUnique(
      {
        where: {email}
      });

    if (existingUser) {
      return res.status(400).json({message: "User with this email already exists"});
    }

    // Hash password before saving do db
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    // Generate JWT
    const token = generateToken(user.id);

    res.status(201).json({token});
  } catch (error) {
    // Handle validation errors from zod
    zodError(res, error);

    // Handle other errors
    res.status(500).json({message: "Error creating user in database, " + error});
  }
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const {email, password} = loginUserSchema.parse(req.body);

    // Find user by email
    const user = await prisma.user.findFirst(
      {
        where: {email}
      });

    if (!user) {
      return res.status(400).json({message: "User with this email does not exist."});
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({message: "Invalid password."});
    }

    // Generate JWT
    const token = generateToken(user.id);

    res.status(200).json({token});
  } catch (error) {
    // Handle validation errors from zod
    zodError(res, error);

    // Handle other errors
    res.status(500).json({message: "Error logging in user, " + error});
  }
});

export const userRouter = router;