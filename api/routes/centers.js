import express from 'express';
import { addUserCenter, getCenterById, getUserCenters } from '../controllers/centers.js';
import fakeAuth from '../middlewares/fakeAuth.js';

const router = express.Router();

router.route('/centers').get(fakeAuth, getUserCenters).post(fakeAuth, addUserCenter)
router.get('/centers/:centerId', fakeAuth, getCenterById)

export default router;