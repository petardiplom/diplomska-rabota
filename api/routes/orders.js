import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import { getCenterOrders } from "../controllers/orders.js";

const router = express.Router();

router.get("/orders", authenticateUser, requireCenterAccess, getCenterOrders);

export default router;
