import pinoHttp from 'pino-http';
import logger from '../utils/logger.util';
import { validateEnv, NodeEnv } from '../configs/env.config';

const env = validateEnv();
const isDevelopment = env.NODE_ENV === NodeEnv.Development;

export const httpLogger = pinoHttp({
  logger,
  // Don't log health check endpoints to reduce noise
  autoLogging: {
    ignore: (req) => req.url === '/healthcheck',
  },
  // Include more request details in development
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
});
