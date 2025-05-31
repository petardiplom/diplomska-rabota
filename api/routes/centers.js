import express from 'express';
import { getUserCenters } from '../controllers/centers.js';

const router = express.Router();

router.get('/centers', getUserCenters)

export default router;