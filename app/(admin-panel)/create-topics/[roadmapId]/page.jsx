const AddTopicsPage = async ({params}) => {


  const { roadmapId } =  await params

  return (
    <div className="bg-gray-800 mt-13">
      <h1 className="text-4xl text-center mt-13 py-14">AddTopics - roadmap id: {roadmapId}</h1> 
    </div>
  )
}

export default AddTopicsPage