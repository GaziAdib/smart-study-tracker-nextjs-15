import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, {params}) {

    const session = await getServerSession(authOptions);

    const {topicId, roadmapId} = await params;
    
    try {
        // Log input data to ensure correct parameters
        console.log('Deleting topic with topicId:', topicId, 'for roadmapId:', roadmapId);
    
        // Retrieve the user progress for the specific roadmap
        const userProgress = await prisma.progress.findFirst({
            where: {
                userId: session?.user?.id,
                roadmapId: roadmapId
            }
        });
    
        // If user progress is not found, return an error response
        if (!userProgress) {
            console.error('User progress not found for userId:', session?.user?.id, 'and roadmapId:', roadmapId);
            return NextResponse.json({ message: 'User progress not found' }, { status: 404 });
        }
    
       // Retrieve the total count of topics for this roadmap
        const topicCounts = await prisma.topic.count({
            where: {
                roadmapId: roadmapId
            }
        });

    // Check if topic counts are valid
    if (topicCounts === null || topicCounts === 0) {
        console.error('Topic count is invalid or zero for roadmapId:', roadmapId);
        return NextResponse.json({ message: 'No topics found for the roadmap' }, { status: 404 });
    }
    
        // Update the user's completed topics by filtering out the deleted topicId
        const updatedCompletedTopics = userProgress?.completedTopics?.filter((id) => id !== topicId);
    
        console.log('Updated completed topics:', updatedCompletedTopics?.length);
    
        // Recalculate the percentage of completed topics
        const percentage = topicCounts > 0
            ? Math.round((updatedCompletedTopics?.length / topicCounts) * 100)
            : 0;  // Prevent division by zero
    
        // Update the user progress with the new completed topics and recalculated percentage
        const userProgressUpdate = await prisma.progress.update({
            where: {
                userId: userProgress?.userId,
                roadmapId: roadmapId
            },
            data: {
                completedTopics: {
                    set: updatedCompletedTopics
                },  // Set the updated completed topics
                percentage: percentage  // Update the percentage
            }
        });
    
        // Now, delete the topic from the roadmap
        await prisma.topic.delete({
            where: {
                id: topicId,
                roadmapId: roadmapId,
                roadmap: {
                    authorId: session?.user?.id
                }
            }
        });
    
        return NextResponse.json({ message: 'Topic deleted and progress updated' });
    
    } catch (error) {
        // Log the error in more detail
        console.error('Error during delete operation:', error);
    
        return NextResponse.json({ message: 'An error occurred during topic deletion', error: error?.message }, { status: 500 });
    }

    // const {topicId, roadmapId} = await params

    // try {
       

    //         // const topicRaw = await prisma.topic.findFirst({
    //         //     where: {
    //         //         id: topicId
    //         //     }
    //         // })

    //         // if(topicRaw?.authorId !== session?.user?.id) {
    //         //     return NextResponse.json({ message: 'You Must Be an Owner to Delete Topic!!' }, { status: 403 })
    //         // }
  

    

    // // update completed topics for that user progress
    // // Retrieve the user progress for the specific roadmap
    //     const userProgress = await prisma.progress.findFirst({
    //         where: {
    //             userId: session?.user?.id,
    //             roadmapId: roadmapId
    //         }
    //     });

    // // If user progress is not found, return an error response
    // if (!userProgress) {
    //     return NextResponse.json({ message: 'User progress not found' }, { status: 404 });
    // }

    //     // Retrieve the total count of topics for this roadmap
    //     const topicCounts = await prisma.topic.count({
    //         where: {
    //             roadmapId: roadmapId
    //         }
    //     });

    // // Update the user's completed topics by filtering out the deleted topicId
    // const updatedCompletedTopics = userProgress?.completedTopics?.filter((id) => id !== topicId);

    // console.log('Updated completed topics', updatedCompletedTopics?.length);

    // // Recalculate the percentage of completed topics
    // const percentage = topicCounts > 0
    //     ? Math.round((updatedCompletedTopics?.length / topicCounts) * 100)
    //     : 0;  // Prevent division by zero

    //     // Update the user progress with the new completed topics and recalculated percentage
    //     const userProgressUpdate = await prisma.progress.update({
    //         where: {
    //             userId: userProgress?.userId,
    //             roadmapId: roadmapId
    //         },
    //         data: {
    //             completedTopics: updatedCompletedTopics,  // Set the updated completed topics
    //             percentage: percentage  // Update the percentage
    //         }
    //     });


    //     await prisma.topic.delete({
    //         where: {
    //             id: topicId,
    //             roadmapId: roadmapId,
    //             roadmap: {
    //                 authorId: session?.user?.id
    //             }
    //         }
    //     })

    // // Revalidate the page path after updating
    // revalidatePath(`/roadmap-detail/${roadmapId}`);
             

    // return NextResponse.json({ message: 'Topic Deleted Successfully!' }, { status: 200 })
            

    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.json({ error: error.message }, { status: 500 });
    // }

}
