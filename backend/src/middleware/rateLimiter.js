import rateLimit from 'express-rate-limit';
export default rateLimit({
  windowMs: 60 * 1000,   // 1 min
  max: 60,               // 60 req/min
  standardHeaders: true,
  legacyHeaders: false
});
