import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import { getCenterStaff, getSubserviceStaff } from "../controllers/staff.js";

const router = express.Router();

router.get("/staff", authenticateUser, requireCenterAccess, getCenterStaff);
router.get(
  "/staff/subservice/:subserviceId",
  authenticateUser,
  requireCenterAccess,
  getSubserviceStaff
);
export default router;
