import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: real("price"),
  categoryId: varchar("category_id").references(() => categories.id),
  imageUrl: text("image_url"),
  available: boolean("available").default(true),
});

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  price: real("price"),
  originalPrice: real("original_price"),
  imageUrl: text("image_url"),
  campaignType: text("campaign_type"), // "KAMPANJ", "SPECIALPRIS", "KUNDFAVORIT"
  active: boolean("active").default(true),
});

export const stores = pgTable("stores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  phone: text("phone"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  openingHours: text("opening_hours"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
});

export const insertStoreSchema = createInsertSchema(stores).omit({
  id: true,
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Store = typeof stores.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type InsertStore = z.infer<typeof insertStoreSchema>;
