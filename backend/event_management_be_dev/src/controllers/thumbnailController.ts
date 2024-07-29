// src/controllers/thumbnailController.ts
import { Request, Response } from 'express';
import path from 'path';

class FileController {
  public async uploadFile(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const filePath = path.join('uploads', req.file.filename);
    res.status(200).json({ filePath });
  }
}

export default new FileController();
