import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  getCenterSchedule,
  getStaffSchedule,
  updateSchedule,
} from "../controllers/schedules.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";

const router = express.Router();

router.get(
  "/schedules",
  authenticateUser,
  requireCenterAccess,
  getCenterSchedule
);

router.get(
  "/schedules/staff/:staffId",
  authenticateUser,
  requireCenterAccess,
  getStaffSchedule
);

router.patch(
  "/schedules",
  authenticateUser,
  requireCenterAccess,
  updateSchedule
);

export default router;
