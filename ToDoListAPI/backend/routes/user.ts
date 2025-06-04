import { Router } from 'express';
import { PrismaClient } from '../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // TODO: hash it before saving to db
            }
        });

        res.status(201).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error creating user to db");
    }
});

export default router;