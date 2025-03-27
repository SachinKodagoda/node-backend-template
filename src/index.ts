import createApp from "./utils/server.util";
import { validateEnv } from "./configs/env.config";
import { connectToDB } from "./utils/database-connector.util";

const app = createApp();
const env = validateEnv();
const PORT = env.PORT;

if (env.NODE_ENV !== "production") {
  app
    .listen(PORT, async () => {
      await connectToDB();
      const now = new Date().toLocaleString();
      console.log(
        `[${now}] 🔥 Server is up and running on port number: ${PORT}`
      );
    })
    .on("error", (error) => {
      console.error(`❌ Error occurred: ${error.message}`);
    });
}
