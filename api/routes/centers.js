import express from "express";
import {
  addUserCenter,
  getCenterById,
  getUserCenters,
} from "../controllers/centers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/centers")
  .get(authenticateUser, getUserCenters)
  .post(authenticateUser, addUserCenter);
router.get("/centers/:centerId", authenticateUser, getCenterById);

export default router;
