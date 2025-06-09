import {Router,Response} from "express";
import {PrismaClient} from "@prisma/client";
import {todoSchemaValidation} from "../validations/todoValidation";
import {AuthenticatedRequest, authToken} from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

router.use(authToken);

router.post('/todos', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {title, description} = todoSchemaValidation.parse(req.body);

    const userId = req.user!.userId;

    if (!userId) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

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

router.put('/todos/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description } = todoSchemaValidation.parse(req.body); // TODO: maybe add logic to mark as completed
    const todoId = req.params.id;

    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

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
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({message: "Error updating todo ", error});
  }
});

router.delete('/todos/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const todoId = req.params.id;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

    const todo = await prisma.todo.delete({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) {
      res.status(404).json({message: "Todo with ID " + todoId + " not found"});
    }

    res.status(204).json({message: "Todo deleted successfully", todo});
  } catch (error) {
    res.status(500).json({message: "Error deleting todo ", error});
  }
});

router.get("/todos", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

    const totalTodos = await prisma.todo.count({
      where: {
        userId: userId,
      },
    });

    const todos = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    res.status(200).json({
      data: todos,
      page,
      limit,
      total: totalTodos
    });
  } catch (error) {
    res.status(500).json({message: "Error fetching todos ", error});
  }
});

export const todoListRouter = router;