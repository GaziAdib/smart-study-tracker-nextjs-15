import { Badge } from "@/components/ui/badge";
import ResourceCard from "../../../components/admin/cards/ResourceCard";

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

    console.log('topicDetail', topic);


    const { id, title, description, createdAt  } =
      topic || {};
  
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
                    topic?.roadmap?.thumbnailUrl ||
                    "https://via.placeholder.com/800x400?text=Roadmap+Image"
                  }
                  alt={title}
                  className="w-full h-auto object-cover"
                />
              </div>
  
              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-bold mt-6 text-center">
                {title}{" "}
                <span className="font-extrabold text-purple-500">Topic</span>
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
              {/* Description */}
              {/* <p className="mt-6 text-justify  text-gray-700 dark:text-gray-300">
                {topic?.roadmap?.description || "No description available for this roadmap."}
              </p> 
  
              {/* Tags */}
              <div className="mt-8">
                {/* <h3 className="text-lg font-semibold text-center mb-4">Tags</h3> */}
                {topic?.roadmap?.tags?.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-2">
                   {topic?.roadmap?.tags?.length > 0 && topic?.roadmap?.tags?.map((tag, index) => {
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

            
        {/* Left Below : Show Listings Topics */}
            <div className="showlistings my-5 py-5">
             <h2 className="text-xl sm:text-2xl font-bold text-center">
                All Resources Listing
              </h2>

              <div className="container mx-2 my-5 py-5">
                {topic?.resources?.length > 0 && topic?.resources?.map((resource) => {
                    return <ResourceCard key={resource?.id} resource={resource} />
                })}
            </div>

            </div>
  
          </div>
        </div>
      </div>
    );
  };
  
  export default TopicDetailPage;










