import { NextFunction, Request, Response } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, password } = req.body;

  // Check if required fields are provided
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  // Validate username
  if (username.trim().length < 3) {
    res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
    return;
  }

  // Validate password
  if (password.length < 6) {
    res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
    return;
  }

  // Trim username and add to request body
  req.body.username = username.trim();

  next();
};
