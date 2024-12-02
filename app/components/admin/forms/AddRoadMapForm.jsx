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
  FormDescription,
  FormMessage,
} from "@/components/ui/form"; // Example component imports, adjust to your setup


// Zod validation schema
const roadmapSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  thumbnailUrl: z.string().url("Must be a valid URL").optional(),
});

const AddRoadMapForm = () => {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnailUrl: "",
    },
  });

  // onSubmit handler
  const onSubmit = async (data) => {
    console.log("Form data submitted: ", data);


    // api call to backend to handle Add New RoadMap

    const roadmapData = {
      title: data?.title,
      description: data?.description,
      thumbnailUrl: data?.thumbnailUrl
    }

    try {
      const response = await fetch("/api/admin/roadmap/create-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Inform backend it's JSON
        },
        body: JSON.stringify(roadmapData),
      });

      if(response.ok) {
         router.push('/')
         toast.success('Roadmap created successfully')
      }

    } catch (error) {
      console.log("Error adding product:", error);
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
            Roadmap Title
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
            Description
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

    {/* Thumbnail URL */}
    <FormField
      name="thumbnailUrl"
      control={form.control}
      render={({ field }) => (
        <>
          <FormLabel className="block text-lg font-semibold text-gray-200">
            Thumbnail URL
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className="border-2 border-gray-300 rounded-lg w-full p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/image.jpg"
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
      Create new Journey!
    </Button>
  </form>
</Form>
  );
};

export default AddRoadMapForm;