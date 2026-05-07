import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { scripts } from "./scripts";

export const scenes = pgTable("scenes", {
  body: text("body").notNull().default(""),
  heading: text("heading").notNull().default(""),
  id: uuid("id").primaryKey().defaultRandom(),
  ord: integer("ord").notNull(),
  scriptId: uuid("script_id")
    .notNull()
    .references(() => scripts.id, { onDelete: "cascade" }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
