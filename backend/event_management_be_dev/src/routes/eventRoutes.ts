import { Router, Request, Response } from 'express';
import EventController from '../controllers/eventController';
import tokenVerificationMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Public route
router.get('/events', EventController.getAllEvents);
router.get('/events/:id', EventController.getEventById);

router.post('/events', tokenVerificationMiddleware, async (req: Request, res: Response) => {
  await EventController.createEvent(req, res);
});

router.put('/events/:id', tokenVerificationMiddleware, async (req: Request, res: Response) => {
  await EventController.updateEvent(req, res);
});

router.delete('/events/:id', tokenVerificationMiddleware, EventController.deleteEvent);

export default router;
