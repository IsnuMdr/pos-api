import { db } from "../config/database";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

export async function waitForDb(): Promise<void> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const [rows] = await db.query("SELECT 1");
      console.log("✅ Database connected successfully.");
      return;
    } catch (error) {
      console.log(`🔁 Waiting for database... Attempt ${retries + 1}`);
      retries++;
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
    }
  }

  throw new Error("❌ Could not connect to database after several attempts.");
}
