"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Example component imports, adjust to your setup

// Zod validation schema
const resourceSchema = z.object({
  shortNote: z.string().optional(),
  videoLink: z.string().url("Must be a valid URL").optional(),
  driveLink: z.string().url("Must be a valid URL").optional(),
  blogLink: z.string().url("Must be a valid URL").optional(),
  imageLink: z.string().url("Must be a valid URL").optional(),
  pdfLink: z.string().url("Must be a valid URL").optional(),
});

const AddResourceForm = ({ topicId, roadmapId }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      videoLink: "",
      driveLink: "",
      blogLink: "",
      imageLink: "",
      pdfLink: "",
      shortNote: "",
    },
  });

  // onSubmit handler
  const onSubmit = async (data) => {
    console.log("data", data);

    const mainData = {
        videoLink: data?.videoLink,
        driveLink: data?.driveLink,
        blogLink: data?.blogLink,
        imageLink: data?.imageLink,
        pdfLink: data?.pdfLink,
        shortNote: data?.shortNote,
    }

    try {
      const response = await fetch(`/api/admin/resources/add-resource/${topicId}/${roadmapId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainData),
      });

      if (response.ok) {
        router.push(`/roadmap-detail/${roadmapId}`);
        toast.success("Resource added successfully!");
        form.reset();
      } else {
        toast.error("Failed to add resource!");
      }
    } catch (error) {
      console.error("Error adding resource:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 my-8 py-8 mx-auto px-6 max-w-2xl border-2 border-gray-600 rounded-lg shadow-lg"
      >
        
      

        {/* Additional Fields */}
        {[
          { name: "videoLink", label: "Video Link" },
          { name: "driveLink", label: "Drive Link" },
          { name: "blogLink", label: "Blog Link" },
          { name: "imageLink", label: "Image Link" },
          { name: "pdfLink", label: "PDF Link" },
          { name: "shortNote", label: "Short Note" },
        ].map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            control={form.control}
            render={({ field: inputField }) => (
              <>
                <FormLabel className="block text-lg font-semibold text-gray-200">
                  {field.label}
                </FormLabel>
                <FormControl>
                  <Input
                    {...inputField}
                    placeholder={`Enter ${field.label.toLowerCase()} (optional)`}
                    className="border-2 border-gray-300 rounded-lg w-full p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600 mt-1" />
              </>
            )}
          />
        ))}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 px-5 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add New Resource
        </Button>
      </form>
    </Form>
  );
};

export default AddResourceForm;