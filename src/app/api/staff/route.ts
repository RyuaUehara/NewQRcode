import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const GET = async (req: Request, res: NextResponse) => {
  const staffs = await prisma.staff.findMany({
    where: {
      active: true,
    },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(staffs);
};

export const POST = async (req:Request,res:NextResponse) => {
  const { staffname } = await req.json();

  const new_staff = await prisma.staff.create({
    data:{
      staffname,
    },
  });
  return NextResponse.json(new_staff);
}
