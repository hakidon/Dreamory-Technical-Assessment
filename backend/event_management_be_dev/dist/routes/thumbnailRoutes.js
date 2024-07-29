"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thumbnailController_1 = __importDefault(require("../controllers/thumbnailController"));
const multerConfig_1 = __importDefault(require("../utils/multerConfig"));
const router = (0, express_1.Router)();
// File upload route
router.post('/upload', multerConfig_1.default.single('file'), thumbnailController_1.default.uploadFile);
exports.default = router;
