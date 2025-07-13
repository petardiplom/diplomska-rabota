import express from 'express';
import { requireCenterAccess } from '../middlewares/centerMiddleware.js';
import { editService, getServicesByCenter, getServiceSubservices, toggleServiceStatus } from '../controllers/services.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/services').get(authenticateUser, requireCenterAccess, getServicesByCenter)

router.route('/services/:serviceId/status').patch(authenticateUser, toggleServiceStatus)
router.route('/services/:serviceId').patch(authenticateUser, editService)

router.route('/services/:serviceId/subservices').get(authenticateUser, getServiceSubservices)

export default router;