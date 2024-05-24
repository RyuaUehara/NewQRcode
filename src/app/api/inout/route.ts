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
  const jstOffset = 9 * 60 * 60 * 1000; // 9時間をミリ秒に変換
  const out_time = new Date(now.getTime() + jstOffset);
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
  const { staffid, customer } = await req.json();
  const today = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const startofDay = new Date(today.getTime() + jstOffset);
  startofDay.setHours(0, 0, 0, 0);
  const endofDay = new Date(startofDay.getTime() + 24 * 60 * 60 * 1000);

  const view_visit = await prisma.visit.findMany({
    where: {
      staffid: staffid,
      customername: customer,
      in_time: {
        gte: startofDay,
        lt: endofDay,
      },
    },
  });
  return NextResponse.json(view_visit);
};
