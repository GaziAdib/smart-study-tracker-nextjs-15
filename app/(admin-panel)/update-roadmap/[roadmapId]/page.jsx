import UpdateRoadMapForm from "@/app/components/admin/forms/UpdateRoadMapForm";

const fetchRoadmapDetail = async (id) => {
    try {
  
      // Construct the URL with query parameters
      const baseUrl = `${process.env.NEXT_ROOT_URL}/api/roadmap/${id}`;
      const url = new URL(baseUrl);

      // Fetch single roadmap data
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        const roadmap = await res.json();
        return roadmap.data; 
      } else {
        console.log('Failed to fetch roadmap details');
      }
    } catch (error) {
      console.log('Error fetching roadmap detail:', error);
    }
  
    return {};
  };



const UpdateRoadMapPage = async ({params}) => {


const { roadmapId } = await params;

const roadmap = await fetchRoadmapDetail(roadmapId);

console.log('roadmap details', roadmap);
  


   
return (

<div className="flex items-center justify-center min-h-screen">
    <div className="container mt-10 pt-10">
      <h1 className="text-3xl font-bold m-auto text-center my-10 py-10">
        Update <b className="font-extrabold text-purple-500">Roadmap</b> / Journey
      </h1>
      <UpdateRoadMapForm roadmap={roadmap} />
    </div>
</div>

 )
}
   
   export default UpdateRoadMapPage