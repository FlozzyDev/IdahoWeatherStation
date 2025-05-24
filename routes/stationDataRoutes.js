import express from 'express';
import {
  getStationData,
  getStationDataByDate,
  createStationDataByDate,
  updateStationDataByDate,
  deleteStationData,
  deleteStationDataByDate,
} from '../controllers/stationDataController.js';

const routes = express.Router();

routes.get('/:stationId', getStationData);
routes.get('/:stationId/:date', getStationDataByDate);

routes.post('/:stationId/:date', createStationDataByDate);
routes.put('/:stationId/:date', updateStationDataByDate);

routes.delete('/:stationId', deleteStationData);
routes.delete('/:stationId/:date', deleteStationDataByDate);

export default routes;
