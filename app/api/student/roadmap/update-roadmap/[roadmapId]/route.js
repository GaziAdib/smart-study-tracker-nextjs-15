import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, {params}) {

    const session = await getServerSession(authOptions);

    const roadmapId = await params?.roadmapId || '';

    const {  title, description, thumbnailUrl, tags, category  }  =  await req.json();


    try {
        if ((session?.user?.role === 'STUDENT')) {

            const roadmap = await prisma.roadmap.update({
                where: {
                    id: roadmapId,
                    authorId: session?.user?.id
                },
                data: {
                    title: title,
                    category: category,
                    tags: tags,
                    description: description,
                    thumbnailUrl: thumbnailUrl,
                    author: {connect: {id: session?.user?.id}},
                }
            })

            revalidatePath('/student-dashboard');

            return NextResponse.json({ message: 'Roadmap Updated Successfully!', data: roadmap }, { status: 200 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User To Update Roadmap' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
