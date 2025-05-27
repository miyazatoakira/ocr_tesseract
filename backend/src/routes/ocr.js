import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import ocrController from '../controllers/ocrController.js';

const router = Router();
const storage = multer.diskStorage({
  destination: '/tmp/uploads',
  filename: (_, file, cb) => cb(null, uuid() + path.extname(file.originalname))
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) =>
    /image\/(png|jpe?g|webp)/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Formato não suportado'))
});
export default router.post('/', upload.single('image'), ocrController);
