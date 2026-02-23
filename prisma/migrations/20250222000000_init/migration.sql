-- CreateEnum
CREATE TYPE "DealerType" AS ENUM ('INDEPENDENT', 'FRANCHISE', 'WHOLESALE', 'BHPH');

-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "dealership_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "dealer_type" "DealerType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyBoxEntry" (
    "id" TEXT NOT NULL,
    "dealer_id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year_min" INTEGER NOT NULL,
    "year_max" INTEGER NOT NULL,
    "generation_label" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyBoxEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyBoxTier" (
    "id" TEXT NOT NULL,
    "entry_id" TEXT NOT NULL,
    "mileage_min" INTEGER NOT NULL DEFAULT 0,
    "mileage_max" INTEGER NOT NULL,
    "max_price" INTEGER NOT NULL,

    CONSTRAINT "BuyBoxTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicLinkToken" (
    "id" TEXT NOT NULL,
    "dealer_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MagicLinkToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_email_key" ON "Dealer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MagicLinkToken_token_key" ON "MagicLinkToken"("token");

-- AddForeignKey
ALTER TABLE "BuyBoxEntry" ADD CONSTRAINT "BuyBoxEntry_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyBoxTier" ADD CONSTRAINT "BuyBoxTier_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "BuyBoxEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MagicLinkToken" ADD CONSTRAINT "MagicLinkToken_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
