import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddRoadMapForm from "@/app/components/admin/forms/AddRoadMapForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const AddRoadmapPage = async () => {

  const session = await getServerSession(authOptions);
  
    if(!session || session.user.role !== 'ADMIN') {
      return redirect('/login')
    }
  

  const userRole = session?.user?.role.toLowerCase()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mt-10 pt-10">
        <h1 className="text-3xl font-bold m-auto text-center my-10 py-10">
          Create New <b className="font-extrabold text-purple-500">Roadmap</b> / Journey ({userRole})
        </h1>
        <AddRoadMapForm userRole={userRole} />
      </div>
  </div>
  )
}

export default AddRoadmapPage