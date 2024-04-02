import { pgTable, serial, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('Users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  email: varchar('email').unique(),
  password: varchar('password'),
});

export const posts = pgTable('Posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title'),
  content: varchar('content'),
  authorId: uuid('author_id').references(() => users.id),
});