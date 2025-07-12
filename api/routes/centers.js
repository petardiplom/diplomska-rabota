import express from 'express';
import { addUserCenter, getCenterById, getUserCenters } from '../controllers/centers.js';
import fakeAuth from '../middlewares/fakeAuth.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/centers').get(authenticateUser, getUserCenters).post(fakeAuth, addUserCenter)
router.get('/centers/:centerId', fakeAuth, getCenterById)

export default router;