"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const SortFilter = () => {
  const [sortBy, setSortBy] = useState("");

    const searchParams = useSearchParams();

    const pathName = usePathname(); // path of current url

    const { replace } = useRouter();

  const handleSortChange = (value) => {
    setSortBy(value);
    console.log("Selected Sort Option:", value);

    const params = new URLSearchParams(searchParams);

    if (value) {
        params.set('sortBy', value);
    } else {
        params.delete('sortBy');
    }

    replace(`${pathName}?${params.toString()}`) //http://localhost:3000/blogs?query=science

  };

  
  return (
    <div className="w-[50] max-w-sm mx-auto p-3">
      <div className="bg-gray-800 p-2 rounded-lg shadow-md border border-gray-600">
        <h3 className="text-white text-md font-semibold mb-3">Sort by Date</h3>

        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full bg-gray-900 text-white border-gray-700 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select sorting option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Sort by Newest</SelectItem>
            <SelectItem value="asc">Sort by Oldest</SelectItem>
          </SelectContent>
        </Select>

        {/* Optional: Display the current sort order */}
        {sortBy && (
          <div className="mt-4 text-gray-300">
            Currently selected:{" "}
            <span className="text-white font-semibold">
              {sortBy === "Nested"
                ? "Newest"
                : "Oldest"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortFilter;