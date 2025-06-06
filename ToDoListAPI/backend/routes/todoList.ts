import {Router,Response} from "express";
import {PrismaClient} from "@prisma/client";
import todoSchemaValidation from "../validations/todoValidation";
import {AuthenticatedRequest, authToken} from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

router.post('/todos', authToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {title, description} = todoSchemaValidation.parse(req.body);

    const userId = req.user!.userId;

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        status: 'pending',
        userId,
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({message: "Error creating todo ", error});
  }
});

router.put('/todos/:id', authToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description } = todoSchemaValidation.parse(req.body); // TODO: maybe add logic to mark as completed
    const todoId = req.params.id;
    const userId = req.user!.userId;

    const todo = await prisma.todo.update({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        title,
        description
      }
    });

    if (!todo) {
      res.status(404).json({message: "Todo with ID " + todoId + " not found"});
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({message: "Error updating todo ", error});
  }
});

export const todoListRouter = router;