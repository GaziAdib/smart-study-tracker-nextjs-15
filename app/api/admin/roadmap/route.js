import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {


    const queryTitle = await req.nextUrl.searchParams.get("query") || '';
    const sortBy  = await req.nextUrl.searchParams.get('sortBy') || '';
    const categoryBy  = await req.nextUrl.searchParams.get('categoryBy') || '';
    


    try {
        
        // fetch and filter by title, category, description, tags

        const where = {};

        if (categoryBy) {
            where.category = {
                equals: categoryBy,
                mode: 'insensitive'
            };
        }
    
        if (queryTitle) {
            where.OR = [
                {
                    title: {
                        contains: queryTitle,
                        mode: 'insensitive',
                    },
                },
                {
                    category: {
                        contains: queryTitle,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: queryTitle,
                        mode: 'insensitive',
                    },
                },
                {
                    tags: {
                        hasSome: [queryTitle],
                    },
                },
            ];
        }
    
        // Fetch roadmaps with filters and sorting
        const roadmaps = await prisma.roadmap.findMany({
            where, // Apply dynamic filters
            orderBy: sortBy ? { createdAt: sortBy } : {}, // Apply sorting if provided
        });

        return NextResponse.json({ message: 'All Roadmaps!', data: roadmaps }, { status: 200 })
            
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }

}
