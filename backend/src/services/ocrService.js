import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

export default async function ocrService(imagePath) {
  const cmd = `tesseract "${imagePath}" stdout -l por --psm 6`;
  const { stdout } = await execAsync(cmd, { maxBuffer: 20 * 1024 * 1024 });
  return stdout.trim();
}
