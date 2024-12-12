import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {

    const session = await getServerSession(authOptions);

    const roadmapId = await params?.roadmapId || '';

    try {
        if (session?.user?.role === 'STUDENT') {
  
            await prisma.roadmap.delete({
                where: {
                    id: roadmapId,
                    authorId: session.user.id
                }
            })
                
            revalidatePath('/student-dashboard');

            return NextResponse.json({ message: 'Roadmap Deleted Successfully!' }, { status: 200 })
            
        } else {
            return NextResponse.json({ message: 'You Must Be a Auth User to Delete Roadmap!' }, { status: 403 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
