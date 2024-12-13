"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Shadcn Select
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
import { useState } from "react";


// Zod validation schema
const roadmapSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  thumbnailUrl: z.string().url("Must be a valid URL").optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1, "Please select a category"), // Ensure a category is selected
});

const UpdateRoadMapForm = ({roadmap, userRole}) => {

 
 const {id, title, description, thumbnailUrl, category, tags:roadmapTags } = roadmap || {};


  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      title: title,
      description: description,
      thumbnailUrl: thumbnailUrl,
      category: category,
      tags: roadmapTags,
    },
  });


  const [tags, setTags] = useState([...roadmapTags]);

  // Function to handle tag addition
  const addTag = (event) => {
    if (event.key === "Enter" && event.target.value) {
      event.preventDefault();
      if (!tags.includes(event.target.value)) {
        setTags([...tags, event.target.value]);
        form.setValue("tags", [...tags, event.target.value]); // Update form state
      }
      event.target.value = "";
    }
  };

  // Function to handle tag removal
  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags); // Update form state
  };


  // onSubmit handler

  const onSubmit = async (data) => {

    // api call to backend to handle Add New RoadMap

    console.log(data);
    
    const roadmapData = {
      ...data,
      tags,
    };


    try {

      if(userRole) {
        const response = await fetch(`/api/${userRole}/roadmap/update-roadmap/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(roadmapData),
        });
  
        if(response.ok) {
           userRole === 'admin' ? router.push('/admin-dashboard') : router.push('/student-dashboard')
           toast.success('Roadmap Updated successfully!')
           form.reset();
        }
      }
      

    } catch (error) {
      console.log("Error adding roadmap:", error);
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

    {/* Category Select */}
    <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <>
              <FormLabel className="block text-lg font-semibold text-gray-200">Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)} // Update form field
                  defaultValue={field.value} // Set default value
                >
                  <SelectTrigger className="border-2 border-gray-300 rounded-lg w-full p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-sm text-red-600 mt-1" />
            </>
          )}
        />


    {/* Tags Input */}
    <div>
          <FormLabel className="block text-lg font-semibold text-gray-200">Tags</FormLabel>
          <div className="border-2 border-gray-300 rounded-lg w-full p-3 mt-2 flex flex-wrap gap-2 bg-gray-700">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => removeTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              onKeyDown={addTag}
              className="bg-transparent outline-none flex-grow text-gray-200"
              placeholder="Type and press Enter to add tags"
            />
          </div>
        </div>

    {/* Submit Button */}
    <Button
      type="submit"
      className="w-full py-3 px-5 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Update RoadMap Journey!
    </Button>
  </form>
</Form>
  );
};

export default UpdateRoadMapForm;