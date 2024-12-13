import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {

    const session = await getServerSession(authOptions);

    const {topicId, roadmapId} = await params

    try {
        if (session?.user?.role === 'ADMIN') {
  
            await prisma.topic.delete({
                where: {
                    id: topicId,
                    roadmapId: roadmapId
                }
            })
                
            revalidatePath('/admin-dashboard');

            return NextResponse.json({ message: 'Roadmap Deleted Successfully!' }, { status: 200 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Delete Roadmap!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
