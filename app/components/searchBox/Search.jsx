"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {

    const searchParams = useSearchParams();

    const pathName = usePathname(); // path of current url

    const { replace } = useRouter();

    const handleSearch = (query) => {
    
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }

        replace(`${pathName}?${params.toString()}`) //http://localhost:3000/blogs?query=science

    }


    return (
        <div className="flex flex-1 w-[280] flex-shrink-0 px-4 py-5">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full mx-2 mt-2 px-2 py-5 rounded-full border text-gray-200 bg-gray-800 border-gray-500 pl-10 text-sm outline-2 placeholder:text-gray-400"
                placeholder="Search Roadmaps by Title, Category, Tags..."
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}

            />

        </div>
    )
}

export default Search