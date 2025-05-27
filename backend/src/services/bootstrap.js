import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs-node';

let model;
export default async function loadModels() {
  if (model) return model;
  await tf.ready();
  model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
  return model;
}
export function getModel() {
  if (!model) throw new Error('Modelo ainda não carregado');
  return model;
}
