CREATE TABLE "site_content" (
	"id" text PRIMARY KEY DEFAULT 'default' NOT NULL,
	"notifications" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"hero_heading" text NOT NULL,
	"hero_subheading" text NOT NULL,
	"hero_description" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" text
);
