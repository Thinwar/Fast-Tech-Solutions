import { Router } from "express";
import {
  adminCheck,
  login,
  logout,
  me,
  register,
} from "../controllers/authController.js";
import { requireAuth, requireBearerToken } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/logout", requireAuth, logout);
router.post("/admin-check", requireBearerToken, adminCheck);

export default router;
