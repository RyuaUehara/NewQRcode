import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";
import { parse } from "path";
import { error } from "console";

export const POST = async (req: Request, res: NextResponse) => {
  const { helperID, helperName, customerName } = await req.json();
  console.log(helperID, helperName, customerName);
  const new_visit = await prisma.visits.create({
    data: {
      helperID: helperID,
      helperName: helperName,
      customerName: customerName,
    },
  });
  return NextResponse.json(new_visit);
};

export const GET = async (req: Request, res: NextResponse) => {
    const view_visits = await prisma.visits.findMany();
    return NextResponse.json(view_visits);
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  try {
    const id: number = parseInt(params.id);
    const { start_time, end_time } = await req.json();

    const update_visits = await prisma.visits.update({
      data: { start_time, end_time },
      where: { id },
    });
    return NextResponse.json(update_visits);
  }
};