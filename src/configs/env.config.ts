import { cleanEnv, str, port, num } from 'envalid';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export interface EnvConfig {
  NODE_ENV: NodeEnv;
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN: string;
  LOG_LEVEL: string;
  RATE_LIMIT_MAX: number;
  RATE_LIMIT_WINDOW_MS: number;
}

export const validateEnv = (): EnvConfig => {
  return cleanEnv(process.env, {
    NODE_ENV: str({
      choices: [NodeEnv.Development, NodeEnv.Production, NodeEnv.Test],
      default: NodeEnv.Development,
    }),
    PORT: port({ default: 8081 }),
    DB_HOST: str({ default: 'localhost' }),
    DB_PORT: port({ default: 5432 }),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
    DB_URL: str(),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str({ default: '1d' }),
    CORS_ORIGIN: str({ default: '*' }),
    LOG_LEVEL: str({ default: 'info' }),
    RATE_LIMIT_MAX: num({ default: 100 }),
    RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000 }), // 15 minutes
  });
};
