import { FlightController } from '../controllers/flightController';
import { Router } from 'express';

const router: Router = Router();
const flightController = new FlightController();

router.post('/track', (req, res) => flightController.trackFlight(req, res));

router.get('/', (req, res) => flightController.getAllFlights(req, res));

router.delete('/:flightNumber', (req, res) => flightController.removeFlight(req, res));

router.post('/refresh', (req, res) => flightController.refreshAllFlights(req, res));

export default router; 