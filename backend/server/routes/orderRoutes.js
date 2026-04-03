import { Router } from "express";
import {
  createOrder,
  listMyOrders,
  listOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/mine", requireAuth, listMyOrders);
router.get("/", requireAuth, requireAdmin, listOrders);
router.patch("/:id/status", requireAuth, requireAdmin, updateOrderStatus);

export default router;
