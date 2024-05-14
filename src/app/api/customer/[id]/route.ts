import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";


export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);

  const customer = await prisma.customer.findFirst({ where: { id } });
  return NextResponse.json(customer);
};