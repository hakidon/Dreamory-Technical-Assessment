"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThumbnailService {
    static saveFile(file) {
        return {
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: file.path
        };
    }
}
exports.default = ThumbnailService;
