"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../models/Event");
class EventService {
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Creating Event with data:', eventData);
            try {
                const event = new Event_1.EventModel(eventData);
                const savedEvent = yield event.save();
                console.log('Event saved successfully:', savedEvent);
                return savedEvent;
            }
            catch (error) {
                console.error('Error saving event:', error);
                throw error; // Rethrow error to be handled by the controller
            }
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Event_1.EventModel.findById(id).exec();
        });
    }
    updateEvent(id, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            return Event_1.EventModel.findByIdAndUpdate(id, eventData, { new: true }).exec();
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Event_1.EventModel.findByIdAndDelete(id).exec();
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return Event_1.EventModel.find().exec();
        });
    }
}
exports.default = new EventService();
