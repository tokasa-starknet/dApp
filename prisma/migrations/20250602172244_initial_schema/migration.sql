-- CreateEnum
CREATE TYPE "PROPERTY_STATUS" AS ENUM ('Pending', 'Verified', 'Rejected');

-- CreateTable
CREATE TABLE "Property" (
    "owner_id" VARCHAR(12) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "area_sqm" DECIMAL(65,30),
    "amenities" JSONB,
    "estimated_value" DECIMAL(65,30) NOT NULL,
    "tokenization_percentage" DECIMAL(65,30) NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "price_per_token" DECIMAL(65,30) NOT NULL,
    "verification_status" "PROPERTY_STATUS" NOT NULL DEFAULT 'Pending',
    "legal_docs_hash" TEXT NOT NULL,
    "metadata_ipfs_hash" TEXT NOT NULL,
    "registration_tx_hash" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("owner_id")
);
