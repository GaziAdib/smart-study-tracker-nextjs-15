const ResourceCard = ({ resource, topic, index }) => {
    const { id, imageLink, shortNote, pdfLink, driveLink, videoLink, blogLink } = resource || {};

  
    return (
      <div className="bg-white border-l-4 dark:border-indigo-600 dark:bg-gray-800 border-gray-300  my-5 px-6 py-4 w-full mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {/* Image */}
       
  
        {/* Title */}
        <div className="mt-4 flex items-center justify-center  bg-gray-200 text-gray-800 font-bold rounded-full border border-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700">
          <span className="dark:bg-gray-800 rounded-full border-2 border-gray-900 px-2 my-2">{index+1} </span> -  Resource for {topic?.title}
        </div>

  
        {/* Links */}
        <div className="my-5 mx-2 flex flex-wrap justify-center gap-4">

        {pdfLink && (
            <div className="relative group">
                <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 bg-gray-900 px-3 py-1 border-2 border-purple-700 rounded-full no-underline hover:text-purple-800 dark:hover:text-purple-300 text-sm"
                >
                View PDF
                </a>

                {/* Tooltip */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mt-10 w-max bg-gray-800 text-gray-100 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out z-10">
                Click to view or download the PDF file
                </div>
            </div>
        )}

        {driveLink && (
        <div className="relative group">
            <a
            href={driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 bg-gray-900 px-3 py-1 border-2 rounded-full border-blue-700 dark:text-blue-400 no-underline hover:text-blue-800 dark:hover:text-blue-300 text-sm"
            >
            Open in Drive
            </a>
            {/* Tooltip */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mt-10 w-max bg-gray-800 text-gray-100 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out z-10">
            Click to open this resource in Google Drive
            </div>
        </div>
        )}

        {videoLink && (
        <div className="relative group">
            <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 bg-gray-900 px-3 py-1 border-2 border-red-700 rounded-full dark:text-red-400 no-underline hover:text-red-800 dark:hover:text-red-300 text-sm"
            >
            Watch Video
            </a>
            {/* Tooltip */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mt-10 w-max bg-gray-800 text-gray-100 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out z-10">
            Watch the video on an external platform
            </div>
        </div>
        )}

        {blogLink && (
        <div className="relative group">
            <a
            href={blogLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 bg-gray-900 px-3 py-1 border-2 border-green-700 rounded-full no-underline hover:text-green-800 dark:hover:text-green-300 text-sm"
            >
            Read Blog
            </a>
            {/* Tooltip */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mt-10 w-max bg-gray-800 text-gray-100 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out z-10">
            Read the full blog on the linked website
            </div>
        </div>
        )}
                </div>

        {/* Description */}
        <div className="mt-4 flex items-start bg-yellow-50  dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
            {/* Left Divider */}
        
            {/* Note Text */}
            <p className=" text-start text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
            ⚠️ {shortNote || "No description available for this resource."}
            </p>
        </div>
      </div>
    );
  };
  
  export default ResourceCard;