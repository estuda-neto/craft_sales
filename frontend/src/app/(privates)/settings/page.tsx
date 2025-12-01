
import { Loader } from "@/src/components/shared/Loader";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Settings() {
    const isLoading = false;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    if (isLoading) {
        return (<div className="w-full h-full flex justify-center items-center"><Loader /></div>);
    }

    return (<div className='w-full min-h-screen relative bg-gray-100 transition-colors duration-500'></div>);
}