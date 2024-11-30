import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, {params}) {

    const session = await getServerSession(authOptions);

    const roadmapId = await params?.roadmapId || '';

    const { title, description, thumbnailUrl } = await req.json();


    try {
        if (session?.user?.role === 'ADMIN') {


            const roadmap = await prisma.topic.create({
                data: {
                    title: title,
                    description: description,
                    thumbnailUrl: thumbnailUrl ? thumbnailUrl : '',
                    author: {connect: {id: session?.user?.id}},
                    roadmap: {connect: {id: roadmapId}},
                }
            })

            revalidatePath('/create-topic');

            return NextResponse.json({ message: 'Roadmap Added Successfully!', data: roadmap }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User To Add Roadmap' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
