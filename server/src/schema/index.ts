import { sql } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    profilePicture: varchar('profile_picture'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const messages = pgTable('messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    content: varchar('content').notNull(),
    fileUrl: varchar('file_url').array(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    deleted: boolean('deleted').default(false),
    seenBy: varchar('seen_by').array(),
    conversationId: uuid('conversation_id').notNull().references(() => conversations.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const conversations = pgTable('conversations', {
    id: uuid('id').primaryKey().defaultRandom(),
    members: uuid('members').array(),
    isGroup: boolean('is_group').default(false),
    groupName: varchar('group_name'),
    groupImage: varchar('group_image'),
    groupDescription: varchar('group_description'),
    authorId: uuid('author_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});