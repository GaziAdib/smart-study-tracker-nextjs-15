"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Menu } from "@headlessui/react"; // For context menu
import {
  AiOutlineEllipsis,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai"; // Icons
import { Button } from "@/components/ui/button";

const RoadmapCard = ({ roadmap }) => {
  const { id, title, description, category, tags, thumbnailUrl, createdAt } = roadmap || {};

  console.log('topics', tags);

  const router = useRouter();

  const handleDelete = async (roadmapId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/roadmap/remove-roadmap/${roadmapId}`, {
        method: "DELETE",
        cache: "no-store",
      });

      if (res.ok) {
        router.refresh();
        toast.success("Roadmap removed successfully");
      } else {
        const errorData = await res.json();
        console.log("Something went wrong in else block", errorData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdate = (roadmapId) => {
    router.push(`/update-roadmap/${roadmapId}`);
  };

  const handleViewDetails = (roadmapId) => {
    router.push(`/roadmap-detail/${roadmapId}`);
  };

  return (
    <Card className="w-full sm:w-auto bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
      {/* Card Header */}
      <CardHeader>
        <img
          src={
            thumbnailUrl
              ? thumbnailUrl
              : "https://img.freepik.com/free-photo/3d-cartoon-beauty-products_23-2151503319.jpg"
          }
          alt={title}
          className="w-full h-48 sm:h-64 object-cover rounded-t-lg"
        />
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4">
        <p className="text-sm my-2 text-gray-400">
          📅 {new Date(createdAt).toLocaleDateString()}
        </p>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <CardDescription className="text-sm sm:text-base flex-1">{description}</CardDescription>
          <Badge className="bg-gray-200 rounded-xl" variant={"default"}>
            {category}
          </Badge>
        </div>
        <div className="my-1 py-1">
            {tags?.length > 0 && tags?.map((tag, index) => {
            return <span
             key={index}
             className="px-2 py-1  bg-gray-700 text-slate-200 mx-1 text-xs sm:text-sm font-medium rounded-full border-2 shadow-md"
           >
             {tag}
           </span>
            })}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
       
        <div className="flex justify-between w-full space-x-2">
          {/* View Details Button */}
          <Button variant="secondary" onClick={() => handleViewDetails(id)} className="flex bg-indigo-900 rounded-lg items-start space-x-1">
            <AiOutlineEye className="w-5  h-5" />
            <span>View Detail</span>
          </Button>

          {/* Context Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 rounded-full hover:bg-gray-700 focus:outline-none">
              <AiOutlineEllipsis className="w-6 h-6 text-gray-200" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40 z-50 bg-gray-900 rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleViewDetails(id)}
                    className={`${
                      active ? "bg-gray-700" : ""
                    } flex items-center w-full px-4 py-2 text-sm text-gray-200`}
                  >
                    <AiOutlineEye className="mr-2" />
                    View Details
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleUpdate(id)}
                    className={`${
                      active ? "bg-gray-700" : ""
                    } flex items-center w-full px-4 py-2 text-sm text-gray-200`}
                  >
                    <AiOutlineEdit className="mr-2" />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleDelete(id)}
                    className={`${
                      active ? "bg-gray-700" : ""
                    } flex items-center w-full px-4 py-2 text-sm text-red-500`}
                  >
                    <AiOutlineDelete className="mr-2" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RoadmapCard;








// "use client"

// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// const RoadmapCard = ({ roadmap }) => {

// const {id, title, category, topics, description, thumbnailUrl, createdAt } = roadmap || {};

//   const router = useRouter();

//   const handleDelete =  async (roadmapId) => {


//       try {
//         const res = await fetch(`http://localhost:3000/api/admin/roadmap/remove-roadmap/${roadmapId}`, {
//             method: "DELETE",
//             cache: 'no-store',
            
//         });

//         if (res.ok) {
//             router.refresh();
//             toast.success('Roadmap removed successfully')
//         } else {
//             const errorData = await res.json();
//             console.log('Something went wrong in else block', errorData);
            
//         }
//     } catch (error) {
//       console.log('error', error);
//     }
// }

//   return (
//     <Card className="w-full bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       {/* Card Header */}
//       <CardHeader>
//         <img
//           src={thumbnailUrl? thumbnailUrl : 'https://img.freepik.com/free-photo/3d-cartoon-beauty-products_23-2151503319.jpg'}
//           alt={title}
//           className="w-full h-48 object-cover rounded-t-lg"
//         />
//       </CardHeader>

//       {/* Card Content */}
//       <CardContent className="p-4">
//         <CardTitle className="text-lg font-bold">{title}</CardTitle>
//         <CardDescription className="mt-2 flex items-center space-x-2">
//           <CardDescription>{description}</CardDescription>  
//           <Badge className="bg-gray-200 rounded-xl" variant={'default'}>{category}</Badge>
//           <span className="text-gray-200 font-semibold text-lg">$50</span>
//         </CardDescription>
//       </CardContent>

//       {/* Card Footer */}
//       <CardFooter className="p-4 flex items-center space-x-2">
//         <Button variant="secondary" className="w-full">
//           View Details
//         </Button>
//         <Button variant="destructive" className="w-full" onClick={() => handleDelete(id)}>
//           Delete
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default RoadmapCard;

