import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";

import { requireCenterAccess } from "../middlewares/centerMiddleware.js";
import {
  addCustomer,
  archiveCustomer,
  getArchivedCenterCustomers,
  getCenterCustomers,
  restoreCustomer,
  updateCustomer,
} from "../controllers/customers.js";

const router = express.Router();

router.get(
  "/customers",
  authenticateUser,
  requireCenterAccess,
  getCenterCustomers
);

router.get(
  "/customers/archived",
  authenticateUser,
  requireCenterAccess,
  getArchivedCenterCustomers
);

router.post("/customers", authenticateUser, requireCenterAccess, addCustomer);

router.patch(
  "/customers/:customerId",
  authenticateUser,
  requireCenterAccess,
  updateCustomer
);

router.patch(
  "/customers/:customerId/archive",
  authenticateUser,
  requireCenterAccess,
  archiveCustomer
);
router.patch(
  "/customers/:customerId/restore",
  authenticateUser,
  requireCenterAccess,
  restoreCustomer
);

export default router;
