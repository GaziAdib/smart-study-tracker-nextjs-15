"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RoadmapCard = ({ roadmap }) => {

const {id, title, description, thumbnailUrl, createdAt } = roadmap || {};

  const router = useRouter();

  const handleDelete =  async (roadmapId) => {

      try {
        const res = await fetch(`http://localhost:3000/api/admin/roadmap/remove-roadmap/${roadmapId}`, {
            method: "DELETE",
            cache: 'no-store',
            
        });

        if (res.ok) {
            router.refresh();
            toast.success('Roadmap removed successfully')
        } else {
            const errorData = await res.json();
            console.log('Something went wrong in else block', errorData);
            
        }
    } catch (error) {
      console.log('error', error);
    }
}

  return (
    <Card className="w-full bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Card Header */}
      <CardHeader>
        <img
          src={thumbnailUrl? thumbnailUrl : 'https://img.freepik.com/free-photo/3d-cartoon-beauty-products_23-2151503319.jpg'}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <CardDescription className="mt-2 flex items-center space-x-2">
          <CardDescription>{description}</CardDescription>  
          <Badge className="bg-gray-700 rounded-xl" variant={'default'}>Machine Leaning</Badge>
          <span className="text-gray-200 font-semibold text-lg">$50</span>
        </CardDescription>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 flex items-center space-x-2">
        <Button variant="secondary" className="w-full">
          View Details
        </Button>
        <Button variant="destructive" className="w-full" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoadmapCard;

