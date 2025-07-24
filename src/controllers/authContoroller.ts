import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getPrismaClient } from "../services/prisma";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    const prisma = getPrismaClient();

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      res.status(409).json({ error: "Username already exists" });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    res.status(201).json({ 
      message: "User registered successfully",
      username: newUser.username 
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {}
export async function logout(req: Request, res: Response) {}
