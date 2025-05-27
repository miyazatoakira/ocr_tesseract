import fs from 'fs/promises';
import sharp from 'sharp';
import * as tf from '@tensorflow/tfjs-node';
import { getModel } from './bootstrap.js';

export default async function detectService(imgPath, { threshold = 0.4 } = {}) {
  const processed = await sharp(await fs.readFile(imgPath))
    .resize({ width: 640, height: 640, fit: 'inside' })
    .toFormat('jpeg')
    .toBuffer();

  const imgTensor = tf.node.decodeImage(processed, 3);
  const predictions = await getModel().detect(imgTensor);
  imgTensor.dispose();

  return predictions
    .filter(p => p.score >= threshold)
    .map(p => ({
      label: p.class,
      score: Number(p.score.toFixed(3)),
      bbox: p.bbox
    }));
}
