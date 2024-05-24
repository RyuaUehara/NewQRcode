import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const POST = async (req: Request, res: NextResponse) => {
  const { staffid, staff, customer } = await req.json();
  const in_visit = await prisma.visit.create({
    data: {
      staffid: staffid,
      staffname: staff,
      customername: customer,
    },
  });
  return NextResponse.json(in_visit);
};

export const PUT = async (req: Request, res: NextResponse) => {
  const { staffid, customer } = await req.json();
  const now = new Date();
  const out_time = new Date(now.getTime());
  const out_visit = await prisma.visit.updateMany({
    data: { out_time },
    where: {
      staffid: staffid,
      customername: customer,
      out_time: null,
    },
  });
  return NextResponse.json(out_visit);
};

export const GET = async (req: Request, res: NextResponse) => {
  const view_logs = await prisma.visit.findMany({
    where: {
      staffid: 1
    },
    orderBy: { in_time: "desc" },
  });
  return NextResponse.json(view_logs);
};
