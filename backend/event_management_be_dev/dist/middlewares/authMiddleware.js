"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../utils/jwtUtils");
const tokenVerificationMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        req.body.isTokenValid = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        req.body.decoded = decoded;
        req.body.isTokenValid = true;
        next();
    }
    catch (error) {
        req.body.isTokenValid = false;
        next();
    }
};
exports.default = tokenVerificationMiddleware;
