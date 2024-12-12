import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { roadmapId, topicId } = params;

  const { isDone } = await req.json();

  const session = await getServerSession(authOptions);

  try {
    // Update the topic's isDone state
    const topic = await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        isDone: isDone,
      },
    });

    const totalTopics = await prisma.topic.count({
      where: {
        roadmapId: roadmapId,
      },
    });

    // Check if a progress record exists
    const existingProgress = await prisma.progress.findFirst({
      where: {
        roadmapId: roadmapId,
        userId: session?.user?.id,
      },
    });

    if (existingProgress) {
      // Determine if the topic is already marked as done
      const isTopicCompleted = existingProgress.completedTopics.includes(topicId);

      if (isTopicCompleted && !isDone) {
        // Remove topic from completedTopics and decrement percentage
        await prisma.progress.update({
          where: {
            id: existingProgress.id,
          },
          data: {
            completedTopics: {
              set: existingProgress.completedTopics?.filter((id) => id !== topicId),
            },
            percentage: {
              decrement: (1 / totalTopics) * 100,
            },
          },
        });
      } else if (!isTopicCompleted && isDone) {
        // Add topic to completedTopics and increment percentage
        await prisma.progress.update({
          where: {
            id: existingProgress.id,
          },
          data: {
            completedTopics: {
              push: topicId,
            },
            percentage: {
              increment: (1 / totalTopics) * 100,
            },
          },
        });
      }
    } else if (isDone) {
      // Create new progress record if it doesn't exist and the topic is marked as done
      await prisma.progress.create({
        data: {
          roadmap: { connect: { id: roadmapId } },
          user: { connect: { id: session?.user?.id } },
          completedTopics: [topicId],
          percentage: (1 / totalTopics) * 100,
        },
      });
    }

    // Revalidate the roadmap detail page
    revalidatePath(`/roadmap-detail/${roadmapId}`);

    return NextResponse.json({ message: "Topic updated successfully", data: topic }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}












// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth";
// import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function PUT(req, {params}) {

//     const { roadmapId, topicId } = await params

//     const { isDone } = await req.json();

//     const session = await getServerSession(authOptions);

//     try {
       
//         const topic = await prisma.topic.update({
//             where: {
//                 id: topicId,
//                 roadmapId: roadmapId
//             },
//             data: {
//                 isDone: isDone
//             }
//         })

//         const totalTopics = await prisma.topic.findMany({
//             where: {
//                 roadmapId: roadmapId
//             }
//         })

//         let topicCounts = totalTopics.length;



//         const existingProgress = await prisma.progress.findFirst({
//             where: {
//               roadmapId: roadmapId,
//               userId: session?.user?.id,
//             },
//           });
          
//           if (existingProgress) {
//             // Update the existing progress
//             await prisma.progress.update({
//               where: {
//                 id: existingProgress.id,
//               },
//               data: {
//                 completedTopics: {
//                   push: topicId, // Add the topicId to completedTopics
//                 },
//                 percentage: {
//                   increment: (1 / topicCounts) * 100, // Adjust percentage based on total topics
//                 },
//               },
//             });
//           } else {
//             // Create new progress record
//             const progress = await prisma.progress.create({
//               data: {
//                 roadmap: { connect: { id: roadmapId } },
//                 user: { connect: { id: session?.user?.id } },
//                 completedTopics: [topicId], // Initialize with the completed topic
//                 percentage: (1 / topicCounts) * 100, // Initial progress percentage
//               },
//             });
//           }

//         revalidatePath(`/roadmap-detail/${roadmapId}`)

//         return NextResponse.json({ message: 'Topic Detail', data: topic }, { status: 200 })
            
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ error: error?.message }, { status: 500 });
//     }

// }
