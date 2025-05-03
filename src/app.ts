import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { waitForDb } from "./utils/db-check";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);

async function startServer() {
  try {
    await waitForDb();

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", (error as Error).message);
    process.exit(1);
  }
}

startServer();
