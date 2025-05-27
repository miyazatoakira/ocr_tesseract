import ocrService from '../services/ocrService.js';
import db from '../db/index.js';
import fs from 'fs/promises';

export default async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Imagem ausente' });
  try {
    const text = await ocrService(req.file.path);
    await db('results').insert({ filename: req.file.filename, text });
    res.json({ text });
  } catch (e) {
    next(e);
  } finally {
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
  }
};
