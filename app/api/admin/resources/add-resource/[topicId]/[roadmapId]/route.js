import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, {params}) {

    const session = await getServerSession(authOptions);

    const { topicId, roadmapId } = await params;

    const { blogLink, driveLink, videoLink, imageLink, pdfLink, shortNote } = await req.json();

    try {
        if (session?.user?.role === 'ADMIN') {

            const resource = await prisma.resource.create({
                data: {
                    blogLink: blogLink ?? blogLink,
                    driveLink: driveLink ?? driveLink,
                    videoLink: videoLink ?? videoLink,
                    imageLink: imageLink ?? imageLink,
                    pdfLink: pdfLink ?? pdfLink,
                    shortNote: shortNote ?? shortNote,
                    topic: {connect: {id: topicId}}
                }
            })

            revalidatePath(`/roadmap-detail/${roadmapId}`);

            return NextResponse.json({ message: 'New Resource Added Successfully!', data: resource }, { status: 201 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User To Add Resource' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
