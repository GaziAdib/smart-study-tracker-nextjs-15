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

const CategoryFilter = ({categories}) => {
    
    const [categoris, setCategories] = useState([...categories])

    const [categoryBy, setCategoryBy] = useState("");

    const searchParams = useSearchParams();

    const pathName = usePathname(); // path of current url

    const { replace } = useRouter();

  const handleCategoryChange = (value) => {

    setCategoryBy(value);
    
    const params = new URLSearchParams(searchParams);

    if (value) {
        params.set('categoryBy', value);
    } else {
        params.delete('categoryBy');
    }

    replace(`${pathName}?${params.toString()}`) //http://localhost:3000/blogs?query=science

  };

  
  return (
    <div className="w-[200px] max-w-sm mx-auto p-3">
      <div className="bg-gray-800 p-2 rounded-lg shadow-md border border-gray-600">
        <h3 className="text-white text-md font-semibold mb-3">Category Filter</h3>

        <Select value={categoryBy} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full bg-gray-900 text-white border-gray-700 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="#">Category Select</SelectItem>
            {
                categoris?.length > 0 && categoris?.map((category, index) => {
                    return <SelectItem key={index} value={category}>{category}</SelectItem>
                })
            }
           
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CategoryFilter;