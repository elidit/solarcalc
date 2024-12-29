-- CreateTable
CREATE TABLE "solar_calculations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "roof_length" DOUBLE PRECISION NOT NULL,
    "roof_width" DOUBLE PRECISION NOT NULL,
    "roof_pitch" DOUBLE PRECISION NOT NULL,
    "roof_orientation" TEXT NOT NULL,
    "panel_count" INTEGER NOT NULL,
    "total_wattage" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "solar_calculations_pkey" PRIMARY KEY ("id")
);
