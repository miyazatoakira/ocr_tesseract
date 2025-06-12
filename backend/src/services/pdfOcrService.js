import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import ocrService from './ocrService.js';

const execFileAsync = promisify(execFile);

async function getTotalPages(pdfPath) {
  const { stdout } = await execFileAsync('pdfinfo', [pdfPath]);
  const match = stdout.match(/Pages:\s+(\d+)/i);
  return match ? Number(match[1]) : 1;
}

export default async function pdfOcrService(pdfPath, pages = []) {
  const totalPages = await getTotalPages(pdfPath);
  const targets = pages.length ? pages : Array.from({ length: totalPages }, (_, i) => i + 1);
  const results = [];

  for (const n of targets) {
    if (n < 1 || n > totalPages) {
      const err = new Error('Página fora do intervalo');
      err.status = 400;
      throw err;
    }
    const base = path.join(os.tmpdir(), `${path.basename(pdfPath, path.extname(pdfPath))}-${n}`);
    const png = `${base}.png`;
    await execFileAsync('pdftoppm', ['-png', '-f', String(n), '-singlefile', pdfPath, base]);
    const text = await ocrService(png);
    results.push({ n, text });
    await fs.unlink(png).catch(() => {});
  }

  return { totalPages, pages: results };
}

