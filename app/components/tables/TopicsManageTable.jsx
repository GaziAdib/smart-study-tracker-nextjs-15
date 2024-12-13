"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Shadcn button
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // React Icons
import Link from "next/link"; // For navigation to the view page
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TopicsManageTable = ({ topics, roadmap, userRoadmapBasedProgress }) => {

    const session = useSession();

    const router = useRouter();

    const userRole = session?.data?.user?.role?.toLowerCase()

// get userRole for deleting a topic

// handle delete 

const handleDeleteTopic = async (topicId,roadmapId) => {

    try {
      const res = await fetch(`http://localhost:3000/api/${userRole}/topic/remove-topic/${topicId}/${roadmapId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",  // Specify that the content type is JSON
        },
      });

      if (res.ok) {
        router.refresh();
        toast.success("Topic removed successfully");
      } 

      if(!res.ok) {
        const errorData = await res.json();
        console.log("Something went wrong in else block", errorData);
        toast.error(`${errorData?.message}`);
      }


    } catch (error) {
      console.log("error", error?.message);
    }
  };


  return (
    <div className="container mx-2 my-5 py-5">
      {topics?.length > 0 ? (
        <div className="overflow-x-auto">
          <Table className="min-w-full border border-gray-200 dark:border-gray-700">
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Topic Name</TableHead>
                <TableHead>Roadmap Author</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.map((topic, index) => (
                <TableRow
                  key={topic?.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{topic.title}</TableCell>
                  <TableCell>{roadmap?.author?.username}</TableCell>
                  <TableCell className="flex space-x-2">
                    {/* View Button */}
                    <Link href={`/topics/${topic.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <AiOutlineEye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    {/* Edit Button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center"
                    >
                      <AiOutlineEdit className="h-4 w-4 mr-2" />
                      
                    </Button>
                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleDeleteTopic(topic?.id, roadmap?.id)}
                    >
                      <AiOutlineDelete className="h-4 w-4 mr-2" />
                      
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No topics available.</p>
      )}
    </div>
  );
};

export default TopicsManageTable;