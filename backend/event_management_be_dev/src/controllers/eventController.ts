import { Request, Response } from 'express';
import EventService from '../services/eventService';

class EventController {
  async createEvent(req: Request, res: Response): Promise<void> {
    const { name, location, startDate, endDate, thumbnail } = req.body;

    // Validate that all required fields are present
    if (!name || !startDate || !endDate || !thumbnail) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    try {
      const event = await EventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error('Error Creating Event:', error);
      res.status(500).json({ error: 'Error creating event' });
    }
  }


  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const event = await EventService.getEventById(req.params.id);
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching event' });
    }
  }

  async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      // Filter out empty fields from req.body
      const updatedFields = Object.fromEntries(
        Object.entries(req.body).filter(([_, value]) => value !== '' && value != null)
      );
  
      if (Object.keys(updatedFields).length === 0) {
        res.status(400).json({ error: 'No fields to update' });
        return;
      }
  
      const event = await EventService.updateEvent(req.params.id, updatedFields);
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating event' });
    }
  }
  
  async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await EventService.deleteEvent(req.params.id);
      if (event) {
        res.json({ message: 'Event deleted' });
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting event' });
    }
  }

  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await EventService.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching events' });
    }
  }
}

export default new EventController();
