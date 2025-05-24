import express from 'express';
import {
  getAllStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,
} from '../controllers/stationController.js';

const routes = express.Router();

routes.get('/', getAllStations);
routes.get('/:stationId', getStation);

routes.post('/', createStation);
routes.put('/:stationId', updateStation);

routes.delete('/:stationId', deleteStation);

export default routes;
