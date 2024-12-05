
// show all the roadmaps listing in cards grids views

import RoadmapCard from "@/app/components/admin/cards/RoadmapCard";
import Search from "@/app/components/searchBox/Search";



const fetchAllRoadmaps = async (query = '') => {
  try {

    // Construct the URL with query parameters
    const baseUrl = 'http://localhost:3000/api/admin/roadmap';
    const url = new URL(baseUrl);

    // if query is available
    if (query) {
      url.searchParams.append('query', query); // Add query filter
    }

    // Fetch data
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // cache: 'force-cache'
      // cache: 'no-store', // Prevent caching for real-time updates
    });

    if (res.ok) {
      const roadmaps = await res.json();

      console.log('Roadmaps --- ', roadmaps)
      return roadmaps.data; // Return products data
    } else {
      console.log('Failed to fetch roadmaps');
    }
  } catch (error) {
    console.log('Error fetching roadmaps:', error);
  }

  return [];
};




const AdminDashboard = async ({ searchParams }) => {

  const { query } = await searchParams

    console.log('query', query);

  const roadmaps = await fetchAllRoadmaps(query);

   console.log('roadmaps', roadmaps);

   
  

   
  return (
    <div>
        <h1 className="text-3xl text-center px-8 my-10 py-8 text-blue-200">Hi, Admin Dashboard</h1>

        <Search />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
          {roadmaps?.length > 0 && roadmaps?.map((roadmap) => {
             return <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          })}
      </div>
    </div>
  )
}

export default AdminDashboard


 // if (sortField) {
    //   url.searchParams.append('sort_field', sortField); // Add sort field
    // }

    // if (sortOrder) {
    //   url.searchParams.append('sort_order', sortOrder); // Add sort order
    // }