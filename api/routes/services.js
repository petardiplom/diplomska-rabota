import express from "express";
import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import {
  addService,
  addSubservice,
  archiveService,
  editService,
  editSubservice,
  getArchivedServicesByCenter,
  getCenterSubservices,
  getServicesByCenter,
  getServiceSubservices,
  restoreService,
  toggleServiceStatus,
} from "../controllers/services.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/services")
  .get(authenticateUser, requireCenterAccess, getServicesByCenter);
router.get(
  "/services/archived",
  authenticateUser,
  requireCenterAccess,
  getArchivedServicesByCenter
);
router.get(
  "/subservices",
  authenticateUser,
  requireCenterAccess,
  getCenterSubservices
);

router.post("/services", authenticateUser, requireCenterAccess, addService);
router.post(
  "/subservices",
  authenticateUser,
  requireCenterAccess,
  addSubservice
);

router
  .route("/services/:serviceId/status")
  .patch(authenticateUser, toggleServiceStatus);
router
  .route("/services/:serviceId/archive")
  .patch(authenticateUser, archiveService);
router
  .route("/services/:serviceId/restore")
  .patch(authenticateUser, restoreService);

router.route("/services/:serviceId").patch(authenticateUser, editService);

router
  .route("/services/:serviceId/subservices")
  .get(authenticateUser, getServiceSubservices);
router.patch("/subservices/:subserviceId", authenticateUser, editSubservice);

export default router;
