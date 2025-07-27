import express from "express";
import {
  addProfilePicture,
  addUserCenter,
  getCenterById,
  getCenterGallery,
  getUserCenters,
  updateCenter,
} from "../controllers/centers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";

const router = express.Router();

router
  .route("/centers")
  .get(authenticateUser, getUserCenters)
  .post(authenticateUser, addUserCenter);
router.get("/centers/:centerId", authenticateUser, getCenterById);
router.get("/centers/:centerId/gallery", authenticateUser, getCenterGallery);
router.patch("/centers/:centerId", authenticateUser, updateCenter);
router.post(
  "/centers/:centerId/profile-picture",
  authenticateUser,
  requireCenterAccess,
  addProfilePicture
);

export default router;
