const ResourceCard = ({ resource }) => {
    const { id, imageLink, shortNote } = resource || {};
  
    return (

      <>
      <div className="bg-white border-l-4 border-gray-600 my-5 px-3 py-4 w-full dark:bg-gray-800 rounded-lg shadow-md  hover:shadow-lg transition-shadow">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {imageLink || "Untitled Topic"}
        </h2>
  
        {/* Description */}
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
          {shortNote || "No description available for this topic."}
        </p>
      </div>
      </>
      
    );
  };
  
  export default ResourceCard;

   
