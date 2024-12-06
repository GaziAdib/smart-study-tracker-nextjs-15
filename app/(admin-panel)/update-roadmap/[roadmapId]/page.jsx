const UpdateRoadMapPage = async ({params}) => {

const roadmapId = (await params).roadmapId || '';
   
return (
    
    <div className='bg-gray-900 text-white text-3xl mt-14 py-14'>Update Roadmap {roadmapId}</div>
 )
}
   
   export default UpdateRoadMapPage