import express from 'express';
import stationRoutes from './stationRoutes.js';
import stationDataRoutes from './stationDataRoutes.js';
const router = express.Router();

router.use('/stations', stationRoutes);
router.use('/stationData', stationDataRoutes);

export default router;
