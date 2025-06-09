import express from 'express';
import cors from 'cors';
import {userRouter} from "./routes/user";
import {todoListRouter} from "./routes/todoList";

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/auth', userRouter);
app.use('/api', todoListRouter);

export default app;