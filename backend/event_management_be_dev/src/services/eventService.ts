import { EventModel, IEvent } from '../models/Event';

class EventService {
  async createEvent(eventData: Partial<IEvent>): Promise<IEvent> {
    console.log('Creating Event with data:', eventData);
    try {
      const event = new EventModel(eventData);
      const savedEvent = await event.save();
      console.log('Event saved successfully:', savedEvent);
      return savedEvent;
    } catch (error) {
      console.error('Error saving event:', error);
      throw error;  // Rethrow error to be handled by the controller
    }
  }

  async getEventById(id: string): Promise<IEvent | null> {
    return EventModel.findById(id).exec();
  }

  async updateEvent(id: string, eventData: Partial<IEvent>): Promise<IEvent | null> {
    return EventModel.findByIdAndUpdate(id, eventData, { new: true }).exec();
  }

  async deleteEvent(id: string): Promise<IEvent | null> {
    return EventModel.findByIdAndDelete(id).exec();
  }

  async getAllEvents(): Promise<IEvent[]> {
    return EventModel.find().exec();
  }
}

export default new EventService();
