import { Badge } from "@/components/ui/badge";
import ResourceCard from "../../../components/admin/cards/ResourceCard";
import AddResourceForm from "@/app/components/admin/forms/AddResourceForm";
import { getUserInitials } from "@/app/utils/getUserNameInitials";

const fetchTopicDetail = async (roadmapId, topicId) => {
    try {
  
      // Construct the URL with query parameters
      const baseUrl = `http://localhost:3000/api/topic/${topicId}/${roadmapId}`;
      const url = new URL(baseUrl);

      // Fetch single roadmap data
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        const topic = await res.json();
        return topic?.data; 
      } else {
        console.log('Failed to fetch roadmap details');
      }
    } catch (error) {
      console.log('Error fetching roadmap detail:', error);
    }
  
    return {};
  };



  const TopicDetailPage = async ({ params }) => {

    const { roadmapId, topicId } = await params;

    const topic = await fetchTopicDetail(roadmapId, topicId);

    const { id, title, description, createdAt  } =  topic || {};
  
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 py-8">
        <div className="container my-10 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {/* Thumbnail */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={
                    topic?.roadmap?.thumbnailUrl ||
                    "https://via.placeholder.com/800x400?text=Roadmap+Image"
                  }
                  alt={title}
                  className="w-full h-auto object-cover"
                />
              </div>
  
              {/* Title */}

              <h1 className="text-2xl sm:text-4xl font-bold mt-6 text-center">
                {topic?.roadmap?.title}{" "}
                <span className="font-extrabold text-purple-500">(RoadMap)</span>
              </h1>
  
       
              <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
                <Badge
                  className="bg-purple-100 text-sm text-gray-700 dark:bg-indigo-700 dark:text-gray-50"
                  variant="default"
                >
                  {topic?.roadmap?.category || "Uncategorized"}
                </Badge>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📅 {createdAt ? new Date(createdAt).toISOString().substring(0,10) : "N/A"}
                </p>
              </div>

              <div className="relative flex items-center bg-white border-l-4 border-gray-600 my-5 px-4 py-4 w-full dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {/* Index */}
                <div className="absolute left-3 top-3 mt-4 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                  {getUserInitials(topic?.author?.username)}
                </div>

                


        {/* Vertical Divider */}
        <div className="h-16 ml-12 w-px bg-gray-300 dark:bg-gray-600"></div>
          
     
        {/* Content with Divider */}
          <div className="flex items-center ml-5 space-x-4">
            {/* Main Content */}
            <div>

              
              {/* Title */}
              <h2 className="text-xl lg:text-2xl md:text-xl font-bold text-gray-800 dark:text-gray-100">
                {title || "Untitled Topic"}
                
              </h2>
              {/* Description */}
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {description || "No description available for this topic."}
              </p>
            </div>
      
          </div>
            </div>

             
            </div>

       
            <div className="resource-add-form">
              <AddResourceForm roadmapId={roadmapId} topicId={id}  />
            </div>    
       

            
        {/* Left Below : Show Listings Topics */}
            <div className="showlistings w-full  my-2 py-2">
             <h2 className="text-xl sm:text-2xl font-bold text-center">
              {topic?.resources?.length > 0 ? 'Resources' : 'No Resources Available Yet!'}
              </h2>

              <div className="my-2 py-2">
                {topic?.resources?.length > 0 && topic?.resources?.map((resource, index) => {
                    return <ResourceCard key={resource?.id} index={index} topic={topic}  resource={resource} />
                })}
            </div>

            </div>


          


            
  
          </div>
        </div>
      </div>
    );
  };
  
  export default TopicDetailPage;










