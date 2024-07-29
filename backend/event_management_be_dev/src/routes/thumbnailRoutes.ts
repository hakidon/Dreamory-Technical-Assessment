import { Router } from 'express';
import FileController from '../controllers/thumbnailController';
import upload from '../utils/multerConfig';

const router = Router();

// File upload route
router.post('/upload', upload.single('file'), FileController.uploadFile);

export default router;