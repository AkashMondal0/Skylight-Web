import { relations, sql } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    profilePicture: varchar('profile_picture'),
    bio: varchar('bio'),
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

export const posts = pgTable('posts', {
    id: uuid('id').primaryKey().defaultRandom(),
    caption: varchar('caption').notNull(),
    fileUrl: varchar('file_url').array(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const comments = pgTable('comments', {
    id: uuid('id').primaryKey().defaultRandom(),
    comment: varchar('comment').notNull(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    postId: uuid('post_id').notNull().references(() => posts.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const likes = pgTable('likes', {
    id: uuid('id').primaryKey().defaultRandom(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    postId: uuid('post_id').notNull().references(() => posts.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const followers = pgTable('followers', {
    id: uuid('id').primaryKey().defaultRandom(),
    followerUserId: uuid('follower_id').notNull().references(() => users.id),
    followingUserId: uuid('following_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const notifications = pgTable('notifications', {
    id: uuid('id').primaryKey().defaultRandom(),
    content: varchar('content').notNull(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    receiverId: uuid('receiver_id').notNull().references(() => users.id),
    postId: uuid('post_id').notNull().references(() => posts.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const dm = pgTable('dm', {
    id: uuid('id').primaryKey().defaultRandom(),
    content: varchar('content').notNull(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    receiverId: uuid('receiver_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const stories = pgTable('stories', {
    id: uuid('id').primaryKey().defaultRandom(),
    fileUrl: varchar('file_url').array(),
    caption: varchar('caption').notNull(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const storyViews = pgTable('story_views', {
    id: uuid('id').primaryKey().defaultRandom(),
    viewerId: uuid('viewer_id').notNull().references(() => users.id),
    storyId: uuid('story_id').notNull().references(() => stories.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const storyReplies = pgTable('story_replies', {
    id: uuid('id').primaryKey().defaultRandom(),
    content: varchar('content').notNull(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    storyId: uuid('story_id').notNull().references(() => stories.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const storyLikes = pgTable('story_likes', {
    id: uuid('id').primaryKey().defaultRandom(),
    authorId: uuid('author_id').notNull().references(() => users.id),
    storyId: uuid('story_id').notNull().references(() => stories.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const savedPosts = pgTable('saved_posts', {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id').notNull().references(() => posts.id),
    userId: uuid('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
})


export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, { fields: [posts.authorId], references: [users.id] }),
    comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one ,many}) => ({
    posts: one(posts, { fields: [comments.postId], references: [posts.id] }),
    likes: many(likes),
}));

export const likesRelations = relations(likes, ({ one }) => ({
    post: one(posts, { fields: [likes.postId], references: [posts.id] }),
}));
