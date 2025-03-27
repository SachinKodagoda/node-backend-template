import { AppDataSource } from '../configs/database.config';

export const connectToDB = async () => {
  try {
    await AppDataSource.initialize();
    const now = new Date().toLocaleString();
    console.log(`[${now}] ✅ Database Connection Success!`);
  } catch (err) {
    const now = new Date().toLocaleString();
    console.error(`[${now}] ❌ Database Connection Failed:`, err);
    process.exit(1); // Exit process with failure
  }
};
