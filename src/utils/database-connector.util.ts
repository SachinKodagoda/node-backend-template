import { AppDataSource } from '../configs/database.config';
import logger from './logger.util';

export const connectToDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info(`✅ Database Connection Success!`);
  } catch (err) {
    logger.error(`❌ Database Connection Failed: ${err}`);
    process.exit(1); // Exit process with failure
  }
};
