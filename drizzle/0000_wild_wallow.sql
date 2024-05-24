CREATE TABLE IF NOT EXISTS "college_review_colleges" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "college_review_reviews" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"collegeId" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"rating" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "college_review_reviews" ADD CONSTRAINT "college_review_reviews_collegeId_college_review_colleges_id_fk" FOREIGN KEY ("collegeId") REFERENCES "public"."college_review_colleges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
