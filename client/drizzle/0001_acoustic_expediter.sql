ALTER TABLE "followers" ADD COLUMN "follower_username" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "followers" ADD COLUMN "following_username" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_follower_username_users_username_fk" FOREIGN KEY ("follower_username") REFERENCES "users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_following_username_users_username_fk" FOREIGN KEY ("following_username") REFERENCES "users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
