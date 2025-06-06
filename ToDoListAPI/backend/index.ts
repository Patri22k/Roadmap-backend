import express from 'express';
import cors from 'cors';
import {PrismaClient} from "@prisma/client";
import { userRouter } from "./routes/user";

const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

async function main() {
    // Here I can create new prisma queries
    // Example: Query all users
    /* Example: Query all users
    const users = await prisma.user.findMany();
    console.log(users);
     */
}

main()
    .catch(async (e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

app.use('/auth', userRouter);

app.listen(port, () => {
    console.log("Server is running on port " + port);
})