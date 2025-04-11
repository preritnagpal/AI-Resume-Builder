import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificatesTable = pgTable("certificates", {
  id: serial("id").primaryKey(),
  docId: integer("document_id")
    .references(() => documentTable.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  url: text("url"),
  year: text("year"), // ✅ Existing field
  certHeading: text("cert_heading").default("Certificates"), // ✅ NEW FIELD
});

export const certificatesRelations = relations(certificatesTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [certificatesTable.docId],
    references: [documentTable.id],
  }),
}));

export const certificatesTableSchema = createInsertSchema(certificatesTable, {
  id: z.number().optional(),
}).pick({
  id: true,
  name: true,
  issuer: true,
  url: true,
  year: true,
  certHeading: true, // ✅ NEW FIELD in schema
});

export type CertificatesSchema = z.infer<typeof certificatesTableSchema>;
