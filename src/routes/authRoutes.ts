import { Router } from "express";
import { register, login, logout } from "../controllers/authContoroller";
import { validateRegister, validateLogin } from "../middlewares/validation";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", verifyToken, logout);

export default router;
