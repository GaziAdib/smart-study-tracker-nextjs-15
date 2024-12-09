import Link from "next/link";

const TopicCard = ({ topic, index, roadmapId }) => {
    const { id, title, description } = topic || {};
  
    return (

      
      <Link href={`/topic-detail/${id}/${roadmapId}`}>
      <div className="relative flex items-center bg-white border-l-4 border-gray-600 my-5 px-4 py-4 w-full dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {/* Index */}
        <div className="absolute left-3 top-3 mt-4 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
          {index + 1}
        </div>


   {/* Vertical Divider */}
   <div className="h-16 ml-12 w-px bg-gray-300 dark:bg-gray-600"></div>
    
     
        {/* Content with Divider */}
        <div className="flex items-center ml-5 space-x-4">
          {/* Main Content */}
          <div>

            
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {title || "Untitled Topic"}
              
            </h2>
            {/* Description */}
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              {description || "No description available for this topic."}
            </p>
          </div>
    
        </div>
      </div>
    </Link>
      
    );
  };
  
  export default TopicCard;

   
