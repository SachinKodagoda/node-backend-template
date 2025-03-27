import express, { Express } from 'express';
import dotenv from 'dotenv'; // or import "dotenv/config";
import cors from 'cors';
import userRoutes from '../routes/user.route';
import { NodeEnv, validateEnv } from '../configs/env.config';

import HttpStatusCode from './status-codes.util';
import helmet from 'helmet';
import { apiLimiter } from '../middlewares/rate-limiter.middleware';
import { errorHandler } from '../middlewares/common-errors.middleware';

dotenv.config();
const env = validateEnv();
const createApp = (): Express => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(helmet());

  if (env.NODE_ENV === NodeEnv.Production) {
    app.use('/api', apiLimiter);
  }

  app.use('/api', userRoutes);
  app.get('/healthcheck', (_, res) => {
    res.status(HttpStatusCode.OK).json({ status: 'ok', message: 'Server is running' });
  });

  app.use(errorHandler);
  return app;
};

export default createApp;
