"use client";

import { useSession } from "next-auth/react";

const ProgressCard = ({ topics, completedTopics, userId, percentage }) => {

    const session = useSession();

  return (
    <div className="mx-auto mt-5">
      <div className="shadow-lg rounded-lg bg-white dark:bg-gray-800 p-6">
        {/* Card Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
          See Progress
        </h2>

        {/* Card Content */}
        <div className="dark:bg-gray-700 dark:text-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Completed Topics:</span>
            <span>{completedTopics?.length} / {topics?.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">User ID:</span>
            <span>{userId === session?.data?.user?.id ? session?.data?.user?.username : userId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Percentage:</span>
            <span>{Math.round((completedTopics?.length / topics?.length) * 100)}%</span>
          </div>
            {/* Progress Bar */}
            <div className="mt-4">
            <p className="text-sm font-medium mb-2">Progress</p>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-6 relative">
                {/* Filled Bar */}
                <div
                    className="bg-green-500 h-6 ml-l rounded-full flex items-center justify-center text-xs font-semibold text-white dark:text-gray-200"
                    style={{ width: `${Math.round((completedTopics?.length / topics?.length) * 100)}%` }} // Prevent width > 100%
                >
                    {Math.round((completedTopics?.length / topics?.length) * 100)}% {/* Display rounded percentage */}
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;