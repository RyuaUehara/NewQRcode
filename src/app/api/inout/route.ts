import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const POST = async (req: Request, res: NextResponse) => {
    const { helperID, helperName, customerName } = await req.json();
    console.log(helperID,helperName,customerName)
    const new_visit = await prisma.visits.create({
        data: {
            helperID: helperID,
            helperName: helperName,
            customerName: customerName,
        },
    });
    return NextResponse.json(new_visit);
};

export const PUT = async (req: Request,{ params }:{params: {id:string}}, res: NextResponse) => {
  
};