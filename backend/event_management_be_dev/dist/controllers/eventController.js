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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventService_1 = __importDefault(require("../services/eventService"));
class EventController {
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, location, startDate, endDate, thumbnail } = req.body;
            // Validate that all required fields are present
            if (!name || !startDate || !endDate || !thumbnail) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }
            try {
                const event = yield eventService_1.default.createEvent(req.body);
                res.status(201).json(event);
            }
            catch (error) {
                console.error('Error Creating Event:', error);
                res.status(500).json({ error: 'Error creating event' });
            }
        });
    }
    getEventById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventService_1.default.getEventById(req.params.id);
                if (event) {
                    res.json(event);
                }
                else {
                    res.status(404).json({ error: 'Event not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error fetching event' });
            }
        });
    }
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Filter out empty fields from req.body
                const updatedFields = Object.fromEntries(Object.entries(req.body).filter(([_, value]) => value !== '' && value != null));
                if (Object.keys(updatedFields).length === 0) {
                    res.status(400).json({ error: 'No fields to update' });
                    return;
                }
                const event = yield eventService_1.default.updateEvent(req.params.id, updatedFields);
                if (event) {
                    res.json(event);
                }
                else {
                    res.status(404).json({ error: 'Event not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error updating event' });
            }
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield eventService_1.default.deleteEvent(req.params.id);
                if (event) {
                    res.json({ message: 'Event deleted' });
                }
                else {
                    res.status(404).json({ error: 'Event not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting event' });
            }
        });
    }
    getAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield eventService_1.default.getAllEvents();
                res.json(events);
            }
            catch (error) {
                res.status(500).json({ error: 'Error fetching events' });
            }
        });
    }
}
exports.default = new EventController();
