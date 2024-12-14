import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, {params}) {

    const session = await getServerSession(authOptions);

    const { roadmapId } = await params;

    const { title, description } = await req.json();


    try {

        const roadmapData = await prisma.roadmap.findFirst({
            where: {
                id: roadmapId,
            },
            include: {
                author: true
            }
        })

        if(roadmapData?.author?.id !== session?.user?.id) {
            return NextResponse.json({ message: 'You are not Allowed to Add Topic!' }, { status: 403 })
        }
        
        const roadmap = await prisma.topic.create({
                data: {
                    title: title,
                    description: description,
                    author: {connect: {id: session?.user?.id}},
                    roadmap: {connect: {id: roadmapId}},
                }
        })

        revalidatePath(`/roadmap-detail/${roadmapId}`);

        return NextResponse.json({ message: 'New Topic Added Successfully!', data: roadmap }, { status: 201 })
            
     } 

     catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
