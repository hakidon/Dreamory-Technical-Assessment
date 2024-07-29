import { ThumbnailModel } from '../models/Thumbnail';

class ThumbnailService {
  static saveFile(file: Express.Multer.File): ThumbnailModel {
    return {
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path
    };
  }
}

export default ThumbnailService;
