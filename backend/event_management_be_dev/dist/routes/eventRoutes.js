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
const express_1 = require("express");
const eventController_1 = __importDefault(require("../controllers/eventController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
// Public route
router.get('/events', eventController_1.default.getAllEvents);
router.get('/events/:id', eventController_1.default.getEventById);
router.post('/events', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield eventController_1.default.createEvent(req, res);
}));
router.put('/events/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield eventController_1.default.updateEvent(req, res);
}));
router.delete('/events/:id', authMiddleware_1.default, eventController_1.default.deleteEvent);
exports.default = router;
