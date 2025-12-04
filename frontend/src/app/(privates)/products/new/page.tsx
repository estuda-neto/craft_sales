import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { FormRegisterProduct } from "@/src/components/Forms";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewProduct() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    return (
        <div className='w-full min-h-screen relative bg-gray-100 transition-colors p-20 duration-500'>
            <FormRegisterProduct />
        </div>
    );
}