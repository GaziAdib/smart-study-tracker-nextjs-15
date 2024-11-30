import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {

    const session = await getServerSession(authOptions);

    try {
        
        const roadmaps = await prisma.roadmap.findMany({})

        return NextResponse.json({ message: 'All Roadmaps!', data: roadmaps }, { status: 201 })
            
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
