-- drop old address columns and add new swish_confirmed column
ALTER TABLE "orders" DROP COLUMN IF EXISTS "shipping_address";
ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_address";
ALTER TABLE "orders" ADD COLUMN "swish_confirmed" text DEFAULT 'false' NOT NULL;
ALTER TABLE "orders" ALTER COLUMN "customer_phone" SET NOT NULL;

