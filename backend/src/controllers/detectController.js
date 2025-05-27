import detectService from '../services/detectService.js';
import fs from 'fs/promises';

export default async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Imagem ausente' });
  try {
    const objects = await detectService(req.file.path);
    res.json({ objects });
  } catch (e) {
    next(e);
  } finally {
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
  }
};
