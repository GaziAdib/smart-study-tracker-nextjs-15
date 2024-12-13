import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const session = await getServerSession(authOptions);

    const { topicId, roadmapId } = await params;

    const { title, description } = await req.json();


    try {
        
        if(session?.user?.role === 'ADMIN') {
            const roadmap = await prisma.topic.update({
                where: {
                    id: topicId,
                    roadmapId: roadmapId,
                },
                data: {
                    title: title,
                    description: description,
                    author: {connect: {id: session?.user?.id}},
                    roadmap: {connect: {id: roadmapId}},
                }
            })
    
            revalidatePath(`/roadmap-detail/${roadmapId}`);

            return NextResponse.json({ message: 'Topic Added Successfully!', data: roadmap }, { status: 201 })
        } else {
            return NextResponse.json({ message: 'You are not Allowed to Modify Topic!'}, { status: 403 })
        }
        
            
     } 

     catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
