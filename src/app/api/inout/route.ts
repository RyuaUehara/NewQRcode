import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient"

export const POST = async (req: Request, res:NextResponse) => {
    const { helperid, helpername, customername} = await req.json();

    const new_visits = await prisma.visits.create({
        data: {
            helperid,
            helpername,
            customername,
        },
    });
    return NextResponse.json(new_visits);
};