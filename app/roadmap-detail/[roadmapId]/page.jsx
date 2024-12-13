import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TopicCard from "@/app/components/admin/cards/TopicCard";
import AddTopicForm from "@/app/components/admin/forms/AddTopicForm";
import ProgressCard from "@/app/components/cards/ProgressCard";
import TopicsManageTable from "@/app/components/tables/TopicsManageTable";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth";

const fetchRoadmapDetail = async (id) => {
    try {
  
      // Construct the URL with query parameters
      const baseUrl = `${process.env.NEXT_ROOT_URL}/api/roadmap/${id}`;
      const url = new URL(baseUrl);

      // Fetch single roadmap data
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        const roadmap = await res.json();
        return roadmap.data; 
      } else {
        console.log('Failed to fetch roadmap details');
      }
    } catch (error) {
      console.log('Error fetching roadmap detail:', error);
    }
  
    return {};
  };


  const RoadMapDetail = async ({ params }) => {

    const { roadmapId } = await params;
    const session = await getServerSession(authOptions);
  
    const roadmap = await fetchRoadmapDetail(roadmapId);
  
    const { id, title, description, thumbnailUrl, category, tags, createdAt, topics } =
      roadmap || {};
  
    // progress information for each user

    //const userRoadmapBasedProgress = roadmap.progress?.find((progress) => progress.roadmapId === id)

    const userRoadmapBasedProgress = roadmap.progress?.find((progress) => progress?.userId === session?.user?.id)

    const { completedTopics, userId, percentage } = userRoadmapBasedProgress || {}

    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {/* Thumbnail */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={
                    thumbnailUrl ||
                    "https://via.placeholder.com/800x400?text=Roadmap+Image"
                  }
                  alt={title}
                  className="w-full h-auto object-cover"
                />
              </div>
  
              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-bold mt-6 text-center">
                {title}{" "}
                <span className="font-extrabold text-purple-500">Roadmap</span>
              </h1>
  
              {/* Metadata */}
              <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
                <Badge
                  className="bg-purple-100 text-sm text-gray-700 dark:bg-indigo-700 dark:text-gray-50"
                  variant="default"
                >
                  {category || "Uncategorized"}
                </Badge>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📅 {createdAt ? new Date(createdAt).toISOString().substring(0,10) : "N/A"}
                </p>
              </div>
  
              {/* Description */}
              <p className="mt-6 text-justify  text-gray-700 dark:text-gray-300">
                {description || "No description available for this roadmap."}
                {description || "No description available for this roadmap."}
                {description || "No description available for this roadmap."}
                {description || "No description available for this roadmap."}
              </p>
  
              {/* Tags */}
              <div className="mt-8">
                {/* <h3 className="text-lg font-semibold text-center mb-4">Tags</h3> */}
                {tags?.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-2">
                   {tags?.length > 0 && tags?.map((tag, index) => {
                    return <span
                    key={index}
                    className="px-2 py-2  bg-gray-600 text-slate-200 mx-1 text-xs sm:text-sm font-medium rounded-full border-2 shadow-md"
                >
                    {tag}
                </span>
                    })}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No tags available.
                  </p>
                )}
              </div>
            </div>

            
            {/* Right Side: Add Topics Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-center">
                Add a New Topic
              </h2>
              <AddTopicForm roadmapId={id}/>

              <div className="my-5 py-5">
              <div className="manage-tables w-full">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
                Manage Topics
              </h2>

              <div className="mx-2">
                <TopicsManageTable
                  topics={topics}
                  roadmap={roadmap}
                  userRoadmapBasedProgress={userRoadmapBasedProgress}
                />
              </div>
            </div>
            </div>
            </div>

           

            
        {/* Left Below : Show Listings Topics */}
        <div className="showlistings w-full mx-auto my-5 py-5">
  <h2 className="text-xl sm:text-2xl font-bold mb-5">
    All Topics Listings ({topics?.length})
  </h2>

  {/* Responsive Grid Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-5">
    {/* Left Section */}
    <div className="left-section">
      <ProgressCard
        completedTopics={completedTopics}
        topics={topics}
        userId={userId}
        percentage={percentage}
      />

      <div className="mx-2 my-5">
        {topics?.length > 0 ? (
          topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              userRoadmapBasedProgress={userRoadmapBasedProgress}
              index={index}
              roadmapId={roadmapId}
              topic={topic}
            />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            No topics available.
          </p>
        )}
      </div>
    </div>

    {/* Right Section */}
    
  </div>
</div>

  
          </div>
        </div>
      </div>
    );
  };
  
  export default RoadMapDetail;
















// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import TopicCard from "@/app/components/admin/cards/TopicCard";
// import AddTopicForm from "@/app/components/admin/forms/AddTopicForm";
// import ProgressCard from "@/app/components/cards/ProgressCard";
// import TopicsManageTable from "@/app/components/tables/TopicsManageTable";
// import { Badge } from "@/components/ui/badge";
// import { getServerSession } from "next-auth";

// const fetchRoadmapDetail = async (id) => {
//     try {
  
//       // Construct the URL with query parameters
//       const baseUrl = `${process.env.NEXT_ROOT_URL}/api/roadmap/${id}`;
//       const url = new URL(baseUrl);

//       // Fetch single roadmap data
//       const res = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (res.ok) {
//         const roadmap = await res.json();
//         return roadmap.data; 
//       } else {
//         console.log('Failed to fetch roadmap details');
//       }
//     } catch (error) {
//       console.log('Error fetching roadmap detail:', error);
//     }
  
//     return {};
//   };


//   const RoadMapDetail = async ({ params }) => {

//     const { roadmapId } = await params;
//     const session = await getServerSession(authOptions);
  
//     const roadmap = await fetchRoadmapDetail(roadmapId);
  
//     const { id, title, description, thumbnailUrl, category, tags, createdAt, topics } =
//       roadmap || {};
  
//     // progress information for each user

//     //const userRoadmapBasedProgress = roadmap.progress?.find((progress) => progress.roadmapId === id)

//     const userRoadmapBasedProgress = roadmap.progress?.find((progress) => progress?.userId === session?.user?.id)

//     const { completedTopics, userId, percentage } = userRoadmapBasedProgress || {}

//     return (
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-8">
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Side: Details */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//               {/* Thumbnail */}
//               <div className="rounded-lg overflow-hidden">
//                 <img
//                   src={
//                     thumbnailUrl ||
//                     "https://via.placeholder.com/800x400?text=Roadmap+Image"
//                   }
//                   alt={title}
//                   className="w-full h-auto object-cover"
//                 />
//               </div>
  
//               {/* Title */}
//               <h1 className="text-2xl sm:text-4xl font-bold mt-6 text-center">
//                 {title}{" "}
//                 <span className="font-extrabold text-purple-500">Roadmap</span>
//               </h1>
  
//               {/* Metadata */}
//               <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
//                 <Badge
//                   className="bg-purple-100 text-sm text-gray-700 dark:bg-indigo-700 dark:text-gray-50"
//                   variant="default"
//                 >
//                   {category || "Uncategorized"}
//                 </Badge>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   📅 {createdAt ? new Date(createdAt).toISOString().substring(0,10) : "N/A"}
//                 </p>
//               </div>
  
//               {/* Description */}
//               <p className="mt-6 text-justify  text-gray-700 dark:text-gray-300">
//                 {description || "No description available for this roadmap."}
//                 {description || "No description available for this roadmap."}
//                 {description || "No description available for this roadmap."}
//                 {description || "No description available for this roadmap."}
//               </p>
  
//               {/* Tags */}
//               <div className="mt-8">
//                 {/* <h3 className="text-lg font-semibold text-center mb-4">Tags</h3> */}
//                 {tags?.length > 0 ? (
//                   <div className="flex flex-wrap justify-center gap-2">
//                    {tags?.length > 0 && tags?.map((tag, index) => {
//                     return <span
//                     key={index}
//                     className="px-2 py-2  bg-gray-600 text-slate-200 mx-1 text-xs sm:text-sm font-medium rounded-full border-2 shadow-md"
//                 >
//                     {tag}
//                 </span>
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-center text-gray-500 dark:text-gray-400">
//                     No tags available.
//                   </p>
//                 )}
//               </div>
//             </div>

            
//             {/* Right Side: Add Topics Form */}
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-center">
//                 Add a New Topic
//               </h2>
//               <AddTopicForm roadmapId={id}/>

//               <div className="manage-table">
//                 <div className="showlistings">
                
//                 <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
//                     Manage Topics
//                   </h2>

//                   <div className="container my-2 py-2">
//                   <TopicsManageTable topics={topics} roadmapId={roadmapId} userRoadmapBasedProgress={userRoadmapBasedProgress} />
//                 </div>
    
//               </div>
//               </div> 
//             </div>

            

            
//         {/* Left Below : Show Listings Topics */}
//             <div className="showlistings my-5 py-5">
              
//              <h2 className="text-xl sm:text-2xl font-bold text-center">
//                 All Topics Listings ({topics?.length})
//               </h2>

//              <ProgressCard completedTopics={completedTopics} percentage={percentage} topics={topics} userId={userId} />

//              <div className="container mx-2 my-5 py-5">
//                   {topics?.length > 0 && topics?.map((topic, index) => {
//                       return <TopicCard key={topic.id} userRoadmapBasedProgress={userRoadmapBasedProgress} index={index} roadmapId={roadmapId} topic={topic} />
//                   })}
//                 </div>

//             </div>
  
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default RoadMapDetail;













// const fetchRoadmapDetail = async (id) => {
//     try {
  
//       // Construct the URL with query parameters
//       const baseUrl = `${process.env.NEXT_ROOT_URL}/api/roadmap/${id}`;
//       const url = new URL(baseUrl);

//       // Fetch single roadmap data
//       const res = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (res.ok) {
//         const roadmap = await res.json();
//         return roadmap.data; 
//       } else {
//         console.log('Failed to fetch roadmap details');
//       }
//     } catch (error) {
//       console.log('Error fetching roadmap detail:', error);
//     }
  
//     return {};
//   };


// const RoadMapDetail = async ({params}) => {

//  const { roadmapId } = await params;

//  const roadmap = await fetchRoadmapDetail(roadmapId);


//  const { id, title, description, thumbnailUrl, category, tags, createdAt } = roadmap || {};


//   return (
//     <div className="flex items-center justify-center">
//     <div className="container mt-10 pt-10">
//       <h1 className="text-3xl font-bold m-auto text-center my-10 py-10">
//         {title} <b className="font-extrabold text-purple-500">Roadmap</b> / Journey
//       </h1>
      
//     </div>
// </div>
//   )
// }

// export default RoadMapDetail