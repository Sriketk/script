import { env } from "@script/env/server";
import { drizzle } from "drizzle-orm/node-postgres";

import { scenes, scripts } from "./schema";

const schema = { scenes, scripts };

export const createDb = () => drizzle(env.DATABASE_URL, { schema });

export const db = createDb();
