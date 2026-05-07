import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const scripts = pgTable("scripts", {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
});
