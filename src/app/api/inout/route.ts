import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const POST = async (req: Request, res: NextResponse) => {
  const { staffid, staffname, customername } = await req.json();
  const new_visit = await prisma.visit.create({
    data: {
      staffid: staffid,
      staffname: staffname,
      customername: customername,
    },
  });
  return NextResponse.json(new_visit);
};
