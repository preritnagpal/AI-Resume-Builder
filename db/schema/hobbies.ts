import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const hobbiesTable = pgTable("hobbies", {
  id: serial("id").primaryKey(),
  docId: integer("doc_id").notNull().references(() => documentTable.id),
  name: varchar("name", { length: 255 }).notNull(),
});

export const hobbiesRelations = relations(hobbiesTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [hobbiesTable.docId],
    references: [documentTable.id],
  }),
}));

export const hobbiesTableSchema = createInsertSchema(hobbiesTable, {
  name: (schema) => schema.name.min(1),
});

export const hobbiesArraySchema = z.array(hobbiesTableSchema);

export type Hobby = z.infer<typeof hobbiesTableSchema>;
