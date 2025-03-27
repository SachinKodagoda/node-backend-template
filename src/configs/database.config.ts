import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { validateEnv } from './env.config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const env = validateEnv();

const isProduction = env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  //   url: env.DB_URL,
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  ssl: true,
  synchronize: !isProduction, // Only enable in development
  logging: false,
  entities: [path.join(__dirname, '../entities/**/*.{js,ts}')],
  migrations: [path.join(__dirname, '../migrations/**/*.{js,ts}')],
  subscribers: [path.join(__dirname, '../subscribers/**/*.{js,ts}')],
});
