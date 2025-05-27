import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import rateLimiter from './middleware/rateLimiter.js';
import ocrRouter from './routes/ocr.js';
import detectRouter from './routes/detect.js';
import errorHandler from './middleware/errorHandler.js';
import loadModels from './services/bootstrap.js';

await loadModels();             // pré-carrega modelos ML

const app = express();
app.use(pinoHttp());
app.use(helmet());
app.use(rateLimiter);

app.use('/ocr', ocrRouter);
app.use('/detect', detectRouter);
app.get('/status', (_req, res) => res.json({ ok: true }));
app.use(errorHandler);

app.listen(3000, () => console.log('API pronta na porta 3000'));
