import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import {
  addSessionSubscription,
  cancelSession,
  cancelSubscription,
  createCenterSession,
  getCenterSessions,
  getSessionSubscriptions,
} from "../controllers/sessions.js";

const router = express.Router();

router.get(
  "/sessions",
  authenticateUser,
  requireCenterAccess,
  getCenterSessions
);

router.get(
  "/sessions/:sessionId/subscriptions",
  authenticateUser,
  requireCenterAccess,
  getSessionSubscriptions
);

router.post(
  "/sessions/:sessionId/subscription",
  authenticateUser,
  requireCenterAccess,
  addSessionSubscription
);

router.post(
  "/sessions",
  authenticateUser,
  requireCenterAccess,
  createCenterSession
);

router.patch(
  "/sessions/:sessionId/cancel",
  authenticateUser,
  requireCenterAccess,
  cancelSession
);

router.patch(
  "/sessions/subscription/:subscriptionId/cancel",
  authenticateUser,
  requireCenterAccess,
  cancelSubscription
);

export default router;
