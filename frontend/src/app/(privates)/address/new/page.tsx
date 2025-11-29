import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { FormRegisterAdress } from "@/src/components/Forms";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewAddress() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col justify-center items-center py-16 px-4">
            <h1 className="text-3xl text-center font-bold text-gray-800 mb-2">
                Olá, {session.user?.name}!
            </h1>
            <p className="text-center text-gray-600 mb-8 text-lg">
                Aqui você pode cadastrar um <span className="font-semibold text-gray-800">novo endereço</span> para sua conta.
            </p>
            <FormRegisterAdress />
        </div>
    );
}
