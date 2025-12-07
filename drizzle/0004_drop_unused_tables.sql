-- drop unused tables from initial migration
DROP TABLE IF EXISTS "polar_customer" CASCADE;
DROP TABLE IF EXISTS "polar_subscription" CASCADE;
DROP TABLE IF EXISTS "shipping_provider" CASCADE;
DROP TABLE IF EXISTS "uploads" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "session" CASCADE;
DROP TABLE IF EXISTS "two_factor" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "verification" CASCADE;

-- drop unused enum type (must be after dropping tables that reference it)
DROP TYPE IF EXISTS "public"."type";

