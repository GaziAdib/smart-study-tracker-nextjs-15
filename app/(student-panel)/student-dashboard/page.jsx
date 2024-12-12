
// show all the roadmaps listing in cards grids views

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RoadmapCard from "@/app/components/admin/cards/RoadmapCard";
import CategoryFilter from "@/app/components/filter/CategoryFilter";
import SortFilter from "@/app/components/filter/SortFilter";
import Search from "@/app/components/searchBox/Search";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//http://localhost:3000/api/admin/roadmap

const fetchAllRoadmaps = async (query = '', sortBy='', categoryBy='') => {
  try {

    // Construct the URL with query parameters
    const baseUrl = `${process.env.NEXT_ROOT_URL}/api/student/roadmap`;
    const url = new URL(baseUrl);

    // if query is available
    if (query) {
      url.searchParams.append('query', query); // Add query filter
    }

    if (sortBy) {
      url.searchParams.append('sortBy', sortBy); // Add query filter
    }

    if (categoryBy) {
      url.searchParams.append('categoryBy', categoryBy); // Add query filter
    }

    // Fetch data
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //cache: 'force-cache'
      // cache: 'no-store', // Prevent caching for real-time updates
    });

    if (res.ok) {
      const roadmaps = await res.json();
      return roadmaps.data; // Return products data
    } else {
      console.log('Failed to fetch roadmaps');
    }
  } catch (error) {
    console.log('Error fetching roadmaps:', error);
  }

  return [];
};


const StudentDashboard = async ({searchParams}) => {

  //  for students user

  const session = await getServerSession(authOptions);

  if(!session) {
    return redirect('/login')
  }

  const { query, sortBy, categoryBy } = await searchParams

  const roadmaps = await fetchAllRoadmaps(query, sortBy, categoryBy);

  const categories = roadmaps?.map((roadmap) => roadmap?.category);


  return (
    <div className="container my-5 py-5 mx-auto">
      <h1 className="text-3xl text-center px-8 my-10 py-8 text-blue-200">
        Hi, Student Dashboard
      </h1>
  
    {/* Responsive container for filters */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-2">
      <Search />
      <SortFilter />
      <CategoryFilter categories={categories} />
    </div>
  
    {/* Roadmaps grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center justify-items-center gap-4 mt-5 mb-5 px-4 py-5">
      {roadmaps?.length > 0 &&
        roadmaps?.map((roadmap) => {
          return <RoadmapCard key={roadmap.id} roadmap={roadmap} />;
        })}
    </div>
  </div>
  )
}

export default StudentDashboard

