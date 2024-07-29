import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  thumbnail: string;
}

const eventSchema: Schema<IEvent> = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  thumbnail: { type: String, required: true }
});

export const EventModel: Model<IEvent> = mongoose.model<IEvent>('Event', eventSchema);
