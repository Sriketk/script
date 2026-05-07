import { env } from "@script/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    allowMethods: ["GET", "POST", "OPTIONS"],
    origin: env.CORS_ORIGIN,
  })
);

app.get("/", (c) => c.text("OK"));

export default app;
