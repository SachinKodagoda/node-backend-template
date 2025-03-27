import pino from 'pino';
import { validateEnv, NodeEnv } from '../configs/env.config';

const env = validateEnv();
const isDevelopment = env.NODE_ENV === NodeEnv.Development;

// Configure pino logger
const logger = pino({
  level: env.LOG_LEVEL || 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
});

export default logger;
