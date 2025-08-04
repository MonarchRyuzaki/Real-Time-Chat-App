import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma";
import { getUserCache } from "../utils/userCache";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    const userCache = await getUserCache();
    const existingUser = await userCache.get(username);

    if (existingUser) {
      res.status(409).json({ error: "Username already exists" });
      return;
    }
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    await Promise.all([
      prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      }),
      userCache.set(username),
    ]);

    res.status(201).json({
      message: "User registered successfully",
      username,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    // Find user by username
    const userCache = await getUserCache();
    const user = await userCache.get(username);

    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  try {
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
