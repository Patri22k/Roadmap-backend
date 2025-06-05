import {Router, Request, Response} from 'express';
import {PrismaClient} from '../generated/prisma';
import bcrypt from 'bcrypt';
import {generateToken} from "../utils/jwt";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
    const {name, email, password} = req.body;

    // Check for existing user
    const existingUser = await prisma.user.findUnique(
        {
            where: {email}
        });
    if (existingUser) {
        return res.status(400).send("User with this email already exists");
    }

    // Hash password before saving do db
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
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
    } catch (e) {
        console.error(e);
        res.status(500).send("Error creating user to db");
    }
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findFirst(
        {
            where: { email }
        });
    if (!user) {
        return res.status(400).send("User with this email does not exist.");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send("Invalid password.");
    }

    // Generate JWT
    const token = generateToken(user.id);

    res.status(200).json({token});
});

export const userRouter = router;