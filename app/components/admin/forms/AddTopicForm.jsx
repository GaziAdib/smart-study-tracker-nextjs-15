"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner'

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Example component imports, adjust to your setup


// Zod validation schema
const roadmapSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
});

const AddTopicForm = ({roadmapId}) => {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  });

  
  // onSubmit handler

  const onSubmit = async (data) => {

    // api call to backend to handle Add New RoadMap
     
    console.log('data', data)

    const topicData = {
      title: data?.title,
      description: data?.description
    };

    // using try catch blogs wot watch for future

    try {
      const response = await fetch(`/api/admin/topic/add-topic/${roadmapId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(topicData),
      });

      if(response.ok) {
         router.push(`/roadmap-detail/${roadmapId}`)
         toast.success('New Topic Added successfully!')
         form.reset();
      }

    } catch (error) {
      console.log("Error adding topic:", error);
    }

  };



  return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 my-8 py-8 mx-auto px-6 max-w-2xl border-2 border-gray-600 rounded-lg shadow-lg"
        >
            {/* Title */}
            <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
                <>
                <FormLabel className="block text-lg font-semibold text-gray-200">
                    Topic Title
                </FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    className="border-2 border-gray-300 rounded-lg w-full p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter roadmap title"
                    />
                </FormControl>
                <FormMessage className="text-sm text-red-600 mt-1" />
                </>
            )}
            />

            {/* Description */}
            <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
                <>
                <FormLabel className="block text-lg font-semibold text-gray-200">
                    Topic Description
                </FormLabel>
                <FormControl>
                    <Textarea
                    {...field}
                    className="border-2 border-gray-300 rounded-lg w-full p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter description (optional)"
                    />
                </FormControl>
                <FormMessage className="text-sm text-red-600 mt-1" />
                </>
            )}
            />

        

            {/* Submit Button */}
            <Button
            type="submit"
            className="w-full py-3 px-5 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            Add New Topic!
            </Button>
        </form>
    </Form>
  );
};

export default AddTopicForm;