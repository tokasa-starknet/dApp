-- CreateEnum
CREATE TYPE "PROPERTY_STATUS" AS ENUM ('Pending', 'Verified', 'Rejected');

-- CreateTable
CREATE TABLE "Owner" (
    "id" UUID NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "kyc_doc_hash" TEXT NOT NULL,
    "registration_tx_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" UUID NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "full_name" TEXT,
    "email" TEXT,
    "kyc_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "area_sqm" DECIMAL(65,30),
    "amenities" TEXT[],
    "estimated_value" DECIMAL(65,30) NOT NULL,
    "tokenization_percentage" DECIMAL(65,30) NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "price_per_token" DECIMAL(65,30) NOT NULL,
    "verification_status" "PROPERTY_STATUS" NOT NULL DEFAULT 'Pending',
    "legal_docs_hash" TEXT NOT NULL,
    "metadata_ipfs_hash" TEXT NOT NULL,
    "registration_tx_hash" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyToken" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "token_contract_address" TEXT NOT NULL,
    "owner_wallet_address" TEXT NOT NULL,
    "property_value" DECIMAL(20,2) NOT NULL,
    "tokenization_percentage" INTEGER NOT NULL,
    "total_token_supply" BIGINT NOT NULL,
    "token_price" DECIMAL(20,6) NOT NULL,
    "distribution_model" TEXT NOT NULL,
    "legal_document_hash" TEXT NOT NULL,
    "metadata_uri" TEXT NOT NULL,
    "royalty_percentage" INTEGER,
    "minimum_lock_period" INTEGER,
    "expected_annual_yield" INTEGER,
    "images" JSONB,
    "amenities" JSONB,
    "terms_accepted" BOOLEAN NOT NULL,
    "creation_tx_hash" TEXT NOT NULL,
    "creation_timestamp" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoulboundNft" (
    "id" UUID NOT NULL,
    "nft_id_onchain" BIGINT NOT NULL,
    "property_id" UUID NOT NULL,
    "owner_wallet_address" TEXT NOT NULL,
    "owner_profile_id" UUID,
    "token_contract_address" TEXT NOT NULL,
    "metadata_uri" TEXT NOT NULL,
    "metadata_hash" TEXT NOT NULL,
    "issue_tx_hash" TEXT NOT NULL,
    "issued_at_onchain" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoulboundNft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_wallet_address_key" ON "Owner"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_wallet_address_key" ON "Investor"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_email_key" ON "Investor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SoulboundNft_nft_id_onchain_key" ON "SoulboundNft"("nft_id_onchain");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyToken" ADD CONSTRAINT "PropertyToken_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoulboundNft" ADD CONSTRAINT "SoulboundNft_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
