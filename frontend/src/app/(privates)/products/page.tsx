import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Products() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");


    return (
        <div className='w-full min-h-screen relative bg-gray-100 transition-colors duration-500'>
            <h2>pagina de produtos</h2>
        </div>
    );
}