import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const GET = async (req: Request, res: NextResponse) => {
  const staffid = parseInt(req.url.split("/").pop() || "");
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const view_logs = await prisma.visit.findMany({
    where: {
      staffid: staffid,
      in_time: {
        gte: startOfDay,
      },
    },
    orderBy: { in_time: "desc" },
  });
  return NextResponse.json(view_logs);
};
