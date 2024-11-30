import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutButton from "./components/button/LogoutButton";

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] dark:bg-gray-900 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl text-center px- py-8 text-blue-200">Hi, Welcome {session?.user?.username} to the World Of Study Roadmap Progress Tracker!</h1>

        <LogoutButton label={'Logout'} color={'red'} />
      </main>
    </div>
  );
}
