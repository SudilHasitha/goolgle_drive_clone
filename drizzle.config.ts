import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    database: env.SINGLESTORE_DB_NAME,
    port: parseInt(env.SINGLESTORE_PORT),
    ssl: {},
  },
  // tablesFilter: ["db_sudil_drive_*"],
} satisfies Config;
