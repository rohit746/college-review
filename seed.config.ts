import { SeedPg } from "@snaplet/seed/adapter-pg";
import { defineConfig } from "@snaplet/seed/config";
import { Client } from "pg";

export default defineConfig({
  adapter: async () => {
    const client = new Client(
      "postgres://default:Y9Lz6mBPoFMt@ep-delicate-union-a49o4pka-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    );
    await client.connect();
    return new SeedPg(client);
  },
});
