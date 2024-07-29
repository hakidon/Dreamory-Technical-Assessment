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
const express_1 = __importDefault(require("express"));
const jwtUtils_1 = require("../utils/jwtUtils");
const authService_1 = __importDefault(require("../services/authService"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = __importDefault(require("../services/userService"));
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.default.createUser(req.body);
        console.log(user);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authService_1.default.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = yield authService_1.default.comparePassword(user, password);
        if (isMatch) {
            const token = (0, jwtUtils_1.generateToken)(user._id.toString());
            res.status(200).json({ message: 'Login successful', token });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
router.get('/verify', authMiddleware_1.default, (req, res) => {
    if (req.body.isTokenValid) {
        res.status(200).json({ message: 'Token is valid', valid: true });
    }
    else {
        res.status(200).json({ message: 'Token is invalid', valid: false });
    }
});
router.post('/check-id-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, password } = req.body;
    try {
        const user = yield authService_1.default.getUserById(user_id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Credentials are correct' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
