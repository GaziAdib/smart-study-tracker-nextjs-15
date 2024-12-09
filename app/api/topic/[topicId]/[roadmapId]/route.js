import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, {params}) {

    const { roadmapId, topicId } = await params

    try {
       
        const topic = await prisma.topic.findFirst({
            where: {
                id: topicId,
                roadmapId: roadmapId
            },
            include: {
                resources: true,
                author: true,
                roadmap: true
            }
        })

        console.log('Topic Detail', topic);
       
        return NextResponse.json({ message: 'Topic Detail', data: topic }, { status: 200 })
            
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }

}
