import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import {
  createCenterReservation,
  getCenterReservations,
} from "../controllers/reservations.js";

const router = express.Router();

router.get(
  "/reservations",
  authenticateUser,
  requireCenterAccess,
  getCenterReservations
);

router.post(
  "/reservations",
  authenticateUser,
  requireCenterAccess,
  createCenterReservation
);

export default router;
