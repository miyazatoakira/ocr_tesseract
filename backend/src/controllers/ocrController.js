import ocrService from '../services/ocrService.js';
import pdfOcrService from '../services/pdfOcrService.js';
import db from '../db/index.js';
import fs from 'fs/promises';

export default async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Imagem ausente' });
  try {
    let result;
    if (req.file.mimetype === 'application/pdf') {
      result = await pdfOcrService(req.file.path);
      await db('results').insert({
        filename: req.file.filename,
        text: result.pages.map(p => p.text).join('\n\n')
      });
      res.json(result);
    } else {
      const text = await ocrService(req.file.path);
      await db('results').insert({ filename: req.file.filename, text });
      res.json({ text });
    }
  } catch (e) {
    next(e);
  } finally {
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
  }
};
