import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import { getCalendarEvents } from "../controllers/calendar.js";

const router = express.Router();

router.get(
  "/calendar-events",
  authenticateUser,
  requireCenterAccess,
  getCalendarEvents
);

export default router;
