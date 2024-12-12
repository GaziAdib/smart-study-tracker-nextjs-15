import AddRoadMapForm from "@/app/components/admin/forms/AddRoadMapForm"

const AddRoadmapPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mt-10 pt-10">
        <h1 className="text-3xl font-bold m-auto text-center my-10 py-10">
          Create New <b className="font-extrabold text-purple-500">Roadmap</b> / Journey
        </h1>
        <AddRoadMapForm />
      </div>
  </div>
  )
}

export default AddRoadmapPage