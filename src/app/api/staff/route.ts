import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const GET = async (req: Request, res: NextResponse) => {
  const staffs = await prisma.staff.findMany({
    where: {
      active: true,
    },
  });
  return NextResponse.json(staffs);
};
