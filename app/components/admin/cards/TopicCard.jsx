"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineCheck } from "react-icons/ai";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TopicCard = ({ topic, index, roadmapId, userRoadmapBasedProgress }) => {
  const { id, title, description } = topic || {};

  const session = useSession();
  const router = useRouter();

  // Check if the current topic ID is in the user's completed topics
  const isTopicPresent = userRoadmapBasedProgress?.completedTopics?.includes(id);

  // Initialize `done` state based on whether the topic is completed for this user
  const [done, setDone] = useState(isTopicPresent);

  useEffect(() => {
    setDone(isTopicPresent);
  }, [isTopicPresent]);

  const handleToggleDone = async () => {
    try {
      setDone((prev) => !prev);

      const response = await fetch(`/api/topic/complete/${id}/${roadmapId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !done }),
      });

      if (response.ok) {
        router.refresh();
        toast.success(
          `Topic ${
            !done ? "marked as completed" : "progress reverted"
          } successfully!`
        );
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      setDone(isTopicPresent);
      toast.error("Error updating topic status. Please try again.");
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 border-l-4 border-gray-600 my-5 px-4 py-4 w-full rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row sm:items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center">
        {/* Index */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
          {index + 1}
        </div>

        {/* Vertical Divider */}
        <div className="hidden sm:block h-16 ml-4 w-px bg-gray-300 dark:bg-gray-600"></div>

        {/* Content */}
        <Link href={{ pathname: `/topic-detail/${id}/${roadmapId}` , query: {isTopicPresent: isTopicPresent} }} className="ml-4 flex-grow">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {title || "Untitled Topic"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              {description || "No description available for this topic."}
            </p>
          </div>
        </Link>
      </div>

      {/* Done Button */}
      <button
        onClick={handleToggleDone}
        className={`mt-4 sm:mt-0 sm:ml-4 px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center ${
          done
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
        }`}
      >
        {done ? (
          <>
            <AiOutlineCheck className="mr-2" />
            Done
          </>
        ) : (
          "Mark as Done"
        )}
      </button>
    </div>
  );
};

export default TopicCard;


// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { AiOutlineCheck } from "react-icons/ai";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const TopicCard = ({ topic, index, roadmapId, userRoadmapBasedProgress }) => {
//   const { id, title, description } = topic || {};

//   const session = useSession();

//   const router = useRouter();

//   // Check if the current topic ID is in the user's completed topics
//   const isTopicPresent = userRoadmapBasedProgress?.completedTopics?.includes(id);

//   // Initialize `done` state based on whether the topic is completed for this user
//   const [done, setDone] = useState(isTopicPresent);

//   useEffect(() => {
//     // Sync `done` state with user-specific progress
//     setDone(isTopicPresent);
//   }, [isTopicPresent]);

//   const handleToggleDone = async () => {
//     try {
//       // Optimistic update
//       setDone((prev) => !prev);

//       // Call backend API to update `isDone` for the specific topic and user
//       const response = await fetch(`/api/topic/complete/${id}/${roadmapId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isDone: !done }),
//       });

//       if (response.ok) {
//         router.refresh();
//         toast.success(
//           `Topic ${
//             !done ? "marked as completed" : "progress reverted"
//           } successfully!`
//         );
//       } else {
//         throw new Error("Failed to update status");
//       }
//     } catch (error) {
//       // Revert optimistic update in case of error
//       setDone(isTopicPresent);
//       toast.error("Error updating topic status. Please try again.");
//       console.error("Error updating status:", error);
//     }
//   };

//   return (

//     <>
//     <Link href={`/topic-detail/${id}/${roadmapId}`}>
//     <div className="relative flex items-center bg-white border-l-4 border-gray-600 my-5 px-4 py-4 w-full dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       {/* Index */}
//       <div className="absolute left-3 top-3 mt-4 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
//         {index + 1}
//       </div>

//       {/* Vertical Divider */}
//       <div className="h-16 ml-12 w-px bg-gray-300 dark:bg-gray-600"></div>

//       {/* Content with Divider */}
//       <div className="flex items-center ml-5 space-x-4 w-full justify-between">
//         {/* Main Content */}
//         <div>
//           {/* Title */}
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             {title || "Untitled Topic"}
//           </h2>
//           {/* Description */}
//           <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//             {description || "No description available for this topic."}
//           </p>
//         </div>

       
//       </div>
//     </div>
//     </Link>

//      {/* Toggle Button or Done Icon */}
//      <button
//      onClick={handleToggleDone}
//      className={`flex items-center  px-4 py-2 text-sm font-medium rounded-md transition-all ${
//        done
//          ? "bg-green-500 text-white hover:bg-green-600"
//          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
//      }`}
//    >
//      {done ? (
//        <>
//          <AiOutlineCheck className="mr-2" />
//          Done
//        </>
//      ) : (
//        "Mark as Done"
//      )}
//    </button>

//     </>
    
    
    
//   );
// };

// export default TopicCard;












// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { AiOutlineCheck } from "react-icons/ai";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const TopicCard = ({ topic, index, roadmapId, userRoadmapBasedProgress }) => {
//   const { id, title, description, isDone } = topic || {};

//   // check if topic id is present in userRoadmapbasedProgress

//   // const isTopicPresent = userRoadmapBasedProgress.completedTopics?.includes(id)

//   // const [done, setDone] = useState(isDone);

//   const session = useSession();

//   const router = useRouter();

//   // Check if the current topic ID is in the user's completed topics
//   const isTopicPresent = userRoadmapBasedProgress?.completedTopics?.includes(id);

//   // Initialize `done` state based on whether the topic is completed for this user
//   const [done, setDone] = useState(isTopicPresent);

//   useEffect(() => {
//     // Sync `done` state with user-specific progress
//     setDone(isTopicPresent);
//   }, [isTopicPresent]);


//   const handleToggleDone = async () => {
//     try {
//       // Optimistic update
//       setDone((prev) => !prev);

//       // Call your backend to update the `isDone` status
//       const response = await fetch(`/api/topic/complete/${id}/${roadmapId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isDone: !done }),
//       });

//       if (response.ok) {
//         router.refresh();
//         toast.success(
//           `Topic ${
//             !done ? "marked as completed" : "progress reverted"
//           } successfully!`
//         );
//       } else {
//         throw new Error("Failed to update status");
//       }
//     } catch (error) {
//       // Revert optimistic update in case of error
//       setDone(isDone);
//       toast.error("Error updating topic status. Please try again.");
//       console.error("Error updating status:", error);
//     }
//   };

//   const isUserProgressOwner =
//     userRoadmapBasedProgress?.userId === session?.data?.user?.id;

//   return (
//     <div className="relative flex items-center bg-white border-l-4 border-gray-600 my-5 px-4 py-4 w-full dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       {/* Index */}
//       <div className="absolute left-3 top-3 mt-4 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
//         {index + 1}
//       </div>

//       {/* Vertical Divider */}
//       <div className="h-16 ml-12 w-px bg-gray-300 dark:bg-gray-600"></div>

//       {/* Content with Divider */}
//       <div className="flex items-center ml-5 space-x-4 w-full justify-between">
//         {/* Main Content */}
//         <div>
//           {/* Title */}
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             {title || "Untitled Topic"}
//           </h2>
//           {/* Description */}
//           <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//             {description || "No description available for this topic."}
//           </p>
//         </div>

//         {/* Toggle Button or Done Icon */}
//         <button
//           onClick={handleToggleDone}
//           className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
//             done && isUserProgressOwner
//               ? "bg-green-500 text-white hover:bg-green-600"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
//           }`}
//         >
//           {done && isUserProgressOwner ? (
//             <>
//               <AiOutlineCheck className="mr-2" />
//               Done
//             </>
//           ) : (
//             "Mark as Done"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopicCard;














// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { AiOutlineCheck } from "react-icons/ai";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";

// const TopicCard = ({ topic, index, roadmapId, userRoadmapBasedProgress }) => {
//   const { id, title, description, isDone } = topic || {};
  
//   const [done, setDone] = useState(isDone);

//   const session = useSession();

//   const handleToggleDone = async () => {

//     setDone((prev) => !prev);

//     try {
//       // Call your backend to update the `isDone` status
//       const response = await fetch(`/api/topic/complete/${id}/${roadmapId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isDone: !done }),
//       });

//       if (response.ok) {
//         // Update local state after successful response
//         toast.success('Congratualtions!!! Topic Has been successfully Completed')
//       } else {
//         console.error("Failed to update status");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="relative flex items-center bg-white border-l-4 border-gray-600 my-5 px-4 py-4 w-full dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       {/* Index */}
//       <div className="absolute left-3 top-3 mt-4 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
//         {index + 1}
//       </div>

//       {/* Vertical Divider */}
//       <div className="h-16 ml-12 w-px bg-gray-300 dark:bg-gray-600"></div>

//       {/* Content with Divider */}
//       <div className="flex items-center ml-5 space-x-4 w-full justify-between">
//         {/* Main Content */}
//         <div>
//           {/* Title */}
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             {title || "Untitled Topic"}
//           </h2>
//           {/* Description */}
//           <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//             {description || "No description available for this topic."}
//           </p>
//         </div>

//         {/* Toggle Button or Done Icon */}
//         <button
//           onClick={handleToggleDone}
//           className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
//             done
//               ? "bg-green-500 text-white hover:bg-green-600"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
//           }`}
//         >
//           {done && userRoadmapBasedProgress?.userId === session?.data?.user?.id ? (
//             <>
//               <AiOutlineCheck className="mr-2" />
//               Done
//             </>
//           ) : (
//             "Mark as Done"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopicCard;











// // import Link from "next/link";

// // const TopicCard = ({ topic, index, roadmapId }) => {
// //     const { id, title, description, isDone, createdAt } = topic || {};
  
// //     return (

      
// //       <Link href={`/topic-detail/${id}/${roadmapId}`}>
// //       <div className="relative flex items-center bg-white border-l-4 border-gray-600 my-5 px-4 py-4 w-full dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
// //         {/* Index */}
// //         <div className="absolute left-3 top-3 mt-4 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
// //           {index + 1}
// //         </div>


// //         {/* Vertical Divider */}
// //         <div className="h-16 ml-12 w-px bg-gray-300 dark:bg-gray-600"></div>
          
     
// //         {/* Content with Divider */}
// //         <div className="flex items-center ml-5 space-x-4">
// //           {/* Main Content */}
// //           <div>

            
// //             {/* Title */}
// //             <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
// //               {title || "Untitled Topic"}
              
// //             </h2>
// //             {/* Description */}
// //             <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
// //               {description || "No description available for this topic."}
// //             </p>
// //           </div>
    
// //         </div>
// //       </div>
// //     </Link>
      
// //     );
// //   };
  
// //   export default TopicCard;

   
