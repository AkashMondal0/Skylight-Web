DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('ADMIN', 'MEMBER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
