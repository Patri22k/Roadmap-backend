import express from 'express';
import cors from 'cors';
import {userRouter} from "./routes/user";
import {todoListRouter} from "./routes/todoList";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/auth', userRouter);
app.use('/api', todoListRouter);

app.listen(port, () => {
    console.log("Server is running on port " + port);
})