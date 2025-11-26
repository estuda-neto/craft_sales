import Link from "next/link";
import { FolderOpenDotIcon, MessageCircleMoreIcon, ShieldIcon, UserCog2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "@/utils/datatypes/session";
import Image from "next/image";
import { Loader } from "@/components/shared/Loader";

export default async function Manager() {
  const isLoading = false;
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");

  // const projectData = await getProjectsData();
  // const proposalData = await getProposalsData();
  // const getUserData = await getusersData();

  if (isLoading) {
    return (<div className="w-full h-full flex justify-center items-center"><Loader /></div>);
  }

  return (
    <div className="w-full min-h-screen relative bg-gray-100 transition-colors duration-500">
      {/* Main */}
      <div className="relative w-full min-h-screen p-4 md:p-8 transition-all duration-500">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full sm:w-[400px]">
            <label className="relative flex items-center w-full">
              {/* <SearchIcon size={20} className="absolute left-3 text-[#2a2185]"/> */}
              <input type="text" placeholder="Search here" className="w-full h-10 rounded-full border border-gray-300 pl-10 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500" />
            </label>
          </div>

          {/* User */}
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
            <Image src={session.user.image ? `http://localhost:3000${session.user.image}` : `http://localhost:3001/default/user.png`} alt="user-photo" width={40} height={40} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"> {[
          { value: "0", label: "Projetos", icon: <FolderOpenDotIcon size={28} />, link: "/projects" },
          { value: "5", label: "Tecnologias", icon: <ShieldIcon size={28} />, link: "/" },
          { value: "0", label: "Propostas", icon: <MessageCircleMoreIcon size={28} />, link: "/" },
          { value: "0", label: "Usuarios Ativos", icon: <UserCog2Icon size={28} />, link: "/" },
        ].map((card, index) => (
          <Link href={card.link} key={index} className="bg-white rounded-2xl p-6 flex justify-between items-center shadow-md hover:bg-(--brand-400) transition-colors duration-300 cursor-pointer group">
            <div>
              <div className="text-3xl font-semibold text-black group-hover:text-white">
                {card.value}
              </div>
              <div className="text-gray-500 text-sm sm:text-base group-hover:text-white">
                {card.label}
              </div>
            </div>
            <div className="text-gray-400 group-hover:text-white">{card.icon}</div>
          </Link>
        ))}
        </div>

        {/* Conteúdo */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-md overflow-auto">
          conteudo
        </div>
      </div>
    </div>
  );
}
