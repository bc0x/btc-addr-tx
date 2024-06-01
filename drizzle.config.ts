import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

console.log(process.env.DRIZZLE_DATABASE_URL)
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!
  }
});