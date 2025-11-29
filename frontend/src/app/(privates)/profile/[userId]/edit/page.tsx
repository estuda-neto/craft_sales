import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { ContainerUpdateUser } from "@/src/components/Containers";
import { Loader } from "@/src/components/shared/Loader";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props { params: { userId: string }; };
export default async function ProfileEdit({ params }: Props) {
    const isLoading = false;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const { userId } = await params;

    if (isLoading) {
        return (<div className="w-full h-full flex justify-center items-center"><Loader /></div>);
    }

    return (
        <div className='w-full min-h-screen relative bg-gray-100 py-5 transition-colors duration-500'>
            <ContainerUpdateUser />
        </div>);
}