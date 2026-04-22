-- CreateTable
CREATE TABLE "SensorLog" (
    "id" SERIAL NOT NULL,
    "distancia" DOUBLE PRECISION NOT NULL,
    "rele" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorLog_pkey" PRIMARY KEY ("id")
);
