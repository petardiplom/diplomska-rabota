import express from "express";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { getTimeslots } from "../controllers/timeslots.js";

const router = express.Router();

router.get("/timeslots", authenticateUser, requireCenterAccess, getTimeslots);

export default router;
