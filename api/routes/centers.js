import express from "express";
import {
  addUserCenter,
  getCenterById,
  getUserCenters,
  updateCenter,
} from "../controllers/centers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/centers")
  .get(authenticateUser, getUserCenters)
  .post(authenticateUser, addUserCenter);
router.get("/centers/:centerId", authenticateUser, getCenterById);
router.patch("/centers/:centerId", authenticateUser, updateCenter);

export default router;
