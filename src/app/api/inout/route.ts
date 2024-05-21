import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const POST = async (req: Request, res: NextResponse) => {
  const { staffid, staff, customer } = await req.json();
  const new_visit = await prisma.visit.create({
    data: {
      staffid: staffid,
      staffname: staff,
      customername: customer,
    },
  });
  return NextResponse.json(new_visit);
};
