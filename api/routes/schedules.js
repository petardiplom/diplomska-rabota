import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  getCenterSchedule,
  updateCenterSchedule,
} from "../controllers/schedules.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";

const router = express.Router();

router.get(
  "/schedules",
  authenticateUser,
  requireCenterAccess,
  getCenterSchedule
);

router.patch(
  "/schedules",
  authenticateUser,
  requireCenterAccess,
  updateCenterSchedule
);

export default router;
