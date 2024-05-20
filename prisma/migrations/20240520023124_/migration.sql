-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "staffname" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit" (
    "id" SERIAL NOT NULL,
    "staffid" TEXT,
    "staffname" TEXT,
    "customername" TEXT,
    "in_time" TIMESTAMP(3),
    "out_time" TIMESTAMP(3),

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);
