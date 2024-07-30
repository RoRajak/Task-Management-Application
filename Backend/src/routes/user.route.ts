import jwt,{Secret} from "jsonwebtoken";
import bcrypt from "bcrypt";
import express, { Response, Request } from "express";
import z from "zod";
import { User } from "../model/user.model";
import mongoose from "mongoose";


const router = express.Router();

const userSchema = z.object({
  name: z.string(),
  email: z.string({required_error:"email is required"}),
  password: z.string({required_error:"password is required"}).min(8),
});
router.post("/signup", async (req: Request, res: Response) => {
  const parse = userSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ msg: "Input is not valid", errors: parse.error.errors });
  }

  const { email, password, name } = parse.data;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    jwt.sign({ userId: user._id }, process.env.JWT_SECRET as Secret, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token, name: user.name });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ msg: "Error registering user" });
  }
});

const loginSchema=z.object({
    email:z.string({required_error:"email is required"}),
    password:z.string({required_error:"password is required"}),
})

router.post('/signin', async (req: Request, res: Response) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ msg: "Input is incorrect", errors: parse.error.errors });
  }

  const { email, password } = parse.data;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ msg: "Incorrect credentials" });
    }

    jwt.sign({ userId: user._id }, process.env.JWT_SECRET as Secret, { expiresIn: process.env.JWT_EXPIRES_IN }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token, msg: "Login successful", name: user.name });
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ msg: "Error while logging in" });
  }
});


export default router


