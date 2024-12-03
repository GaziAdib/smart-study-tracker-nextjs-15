import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {

    //const session = await getServerSession(authOptions);

    const queryTitle = req.nextUrl.searchParams.get("query") || '';


    try {
        
        const roadmaps = await prisma.roadmap.findMany({
            where: queryTitle
                ? {
                      title: {
                          contains: queryTitle, // Filter roadmaps containing the title
                          mode: "insensitive",  // Optional: makes the search case-insensitive
                      },
                  }
                : { }, // No filter applied if `title` is not provided
        });

    
        return NextResponse.json({ message: 'All Roadmaps!', data: roadmaps }, { status: 200 })
            
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }

}
