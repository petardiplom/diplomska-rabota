import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import { getCenterStaff } from "../controllers/staff.js";

const router = express.Router();

router.get("/staff", authenticateUser, requireCenterAccess, getCenterStaff);

export default router;
