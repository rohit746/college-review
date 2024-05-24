import { relations } from "drizzle-orm";
import { integer, pgTableCreator, text, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `college_review_${name}`);

// Colleges Table
export const colleges = createTable("colleges", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
});

export const collegesRelations = relations(colleges, ({ many }) => ({
  reviews: many(reviews),
}));

// Reviews Table
export const reviews = createTable("reviews", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(), // Clerk user ID
  collegeId: varchar("collegeId", { length: 255 }).notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  college: one(colleges, {
    fields: [reviews.collegeId],
    references: [colleges.id],
  }),
}));
