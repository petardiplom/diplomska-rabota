import express from 'express';
import { getCenterById, getUserCenters } from '../controllers/centers.js';
import fakeAuth from '../middlewares/fakeAuth.js';

const router = express.Router();

router.get('/centers', fakeAuth, getUserCenters)
router.get('/centers/:centerId', fakeAuth, getCenterById)

export default router;