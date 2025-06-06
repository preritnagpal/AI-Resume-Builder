import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { personalInfoTable, personalInfoTableSchema } from "./personal-info";
import { experienceTable, experienceTableSchema } from "./experience";
import { educationTable, educationTableSchema } from "./education";
import { skillsTable, skillsTableSchema } from "./skills";
import { hobbiesTable, hobbiesTableSchema } from "./hobbies";
import { certificatesTableSchema } from "./certificates"; // <-- NEW

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const statusEnum = pgEnum("status", ["archived", "private", "public"]);

export const documentTable = pgTable("document", {
  id: serial("id").notNull().primaryKey(),
  documentId: varchar("document_id").unique().notNull(),
  userId: varchar("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  themeColor: varchar("theme_color", { length: 255 })
    .notNull()
    .default("#7c3aed"),
  thumbnail: text("thumbnail"),
  currentPosition: integer("current_position").notNull().default(1),
  status: statusEnum("status").notNull().default("private"),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  certHeading: varchar("cert_heading", { length: 255 }).default("Certificates"), // ✅ NEW FIELD
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const documentRelations = relations(documentTable, ({ one, many }) => {
  return {
    personalInfo: one(personalInfoTable),
    experiences: many(experienceTable),
    educations: many(educationTable),
    skills: many(skillsTable),
    hobbies: many(hobbiesTable),
    // If needed, add relation for certificates as well
  };
});

export const createDocumentTableSchema = createInsertSchema(documentTable, {
  title: (schema) => schema.title.min(1),
  themeColor: (schema) => schema.themeColor.optional(),
  thumbnail: (schema) => schema.thumbnail.optional(),
  currentPosition: (schema) => schema.currentPosition.optional(),
  certHeading: (schema) => schema.certHeading.optional(), // ✅ NEW
}).pick({
  title: true,
  status: true,
  summary: true,
  themeColor: true,
  thumbnail: true,
  currentPosition: true,
  certHeading: true, // ✅ NEW
});

export const updateCombinedSchema = z.object({
  title: createDocumentTableSchema.shape.title.optional(),
  status: createDocumentTableSchema.shape.status.optional(),
  thumbnail: createDocumentTableSchema.shape.thumbnail.optional(),
  summary: createDocumentTableSchema.shape.summary.optional(),
  themeColor: createDocumentTableSchema.shape.themeColor.optional(),
  currentPosition: createDocumentTableSchema.shape.currentPosition.optional(),
  certHeading: createDocumentTableSchema.shape.certHeading.optional(), // ✅ NEW

  personalInfo: personalInfoTableSchema.optional(),
  education: z.array(educationTableSchema).optional(),
  experience: z.array(experienceTableSchema).optional(),
  skills: z.array(skillsTableSchema).optional(),
  hobbies: z.array(hobbiesTableSchema).optional(),
  certificates: z.array(certificatesTableSchema).optional(), // ✅ Added
});

export type DocumentSchema = z.infer<typeof createDocumentTableSchema>;
export type UpdateDocumentSchema = z.infer<typeof updateCombinedSchema>;
