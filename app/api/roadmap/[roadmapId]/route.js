import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, {params}) {

    const { roadmapId } = await params

    try {
       
        const roadmap = await prisma.roadmap.findFirst({
            where: {
                id: roadmapId,
            },
            include: {
                topics: true,
                author: true,
                progress: true
            }
        })
       
        return NextResponse.json({ message: 'Roadmap Detail', data: roadmap }, { status: 200 })
            
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }

}
