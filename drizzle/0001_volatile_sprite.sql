ALTER TABLE "products" ALTER COLUMN "features" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "rating";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "specs";