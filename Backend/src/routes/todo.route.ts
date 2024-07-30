import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import z from "zod";
import authMidd from "../middlerware/auth";
import mongoose from "mongoose";
import { Todo } from '../model/todo.model';

const router = express.Router();

const todoSchema = z.object({
  title: z.string({ required_error: "Title cannot be empty" }),
  description: z.string().optional(),
  status: z.string({ required_error: "Status cannot be empty" }),
  priority: z.string().optional(),
  deadline: z.string().optional(),
});

router.post("/create-todo", authMidd, async (req: Request, res: Response) => {
  
  
  const parse = todoSchema.safeParse(req.body);
  
  if (!parse.success) {
    console.error("Validation errors:", parse.error.errors);
    return res.status(400).json({ msg: "Input is not valid", errors: parse.error.errors });
  }

  const { title, description, status, priority, deadline } = parse.data;
  const userId = (req as any).userId;
  

  try {
    const todo = new Todo({
      title,
      description,
      status,
      priority,
      deadline,
      user: userId,
    });

    await todo.save();

    return res.json(todo);
  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).send("Server error");
  }
});

router.put("/update/:id", authMidd, async (req: Request, res: Response) => {
  console.log("Request body:", req.body);
  const parse = todoSchema.safeParse(req.body);
  if (!parse.success) {
    console.error("Validation errors:", parse.error.errors);
    return res.status(400).json({ msg: "Input is not valid", errors: parse.error.errors });
  }

  const paramsId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(paramsId)) {
    return res.status(400).json({ msg: "Todo ID is not valid" });
  }

  const { title, description, status, priority, deadline } = parse.data;
  try {
    const todo = await Todo.findById(paramsId);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== (req as any).userId) {
      return res.status(400).json({ msg: "User is not authorized" });
    }

    todo.title = title;
    todo.description = description;
    todo.status = status;
    todo.priority = priority;
    todo.deadline = deadline;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Server error");
  }
});

router.delete('/delete-todo/:id', authMidd, async (req: Request, res: Response) => {
  const paramsId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(paramsId)) {
    return res.status(400).json({ msg: "Todo ID is not valid" });
  }

  try {
    const todo = await Todo.findById(paramsId);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== (req as any).userId) {
      return res.status(400).json({ msg: "User is not authorized" });
    }

    await Todo.findByIdAndDelete(paramsId);

    res.json({ msg: "Todo removed" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Server error");
  }
});

interface AuthenticatedRequest extends Request {
  userId?: string;
}

router.get('/all-todo', authMidd, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;
    console.log(`Fetching todos for user: ${userId}`);

    if (!userId) {
      return res.status(400).json({ msg: "User ID is missing" });
    }

    const todos = await Todo.find({ user: userId });
    

    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Server error");
  }
});

export default router;
