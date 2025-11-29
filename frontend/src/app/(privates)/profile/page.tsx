import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { Loader } from "@/src/components/shared/Loader";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
    const isLoading = false;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">

            {/* BLOCO 1 - Informações primárias */}
            <div className="flex flex-col items-center  shadow-sm rounded-xl p-6 w-full max-w-md gap-4">

                {/* Foto */}
                <div className="w-40 h-40 rounded-full overflow-hidden border shadow-sm">
                    <Image src={session.user.image ? `http://localhost:3000${session.user.image}` : `http://localhost:3001/default/user.png`}
                        alt="Foto do usuário" width={160} height={160} className="w-full h-full object-cover"
                    />
                </div>

                {/* Nome + Ícone editar */}
                <div className="flex justify-center items-center gap-2 mt-2">
                    <h1 className="text-xl font-bold text-gray-800">
                        {session.user?.name} profile
                    </h1>
                    <Link href={`/profile/${session.user.id}/edit`}>
                        <Edit2Icon className="w-5 h-5 text-gray-700 cursor-pointer hover:text-green-600 transition" />
                    </Link>
                </div>

                {/* Email */}
                <p className="text-gray-700 text-sm">
                    <span className="font-medium">e-mail:</span> {session.user?.email}
                </p>

                {/* CPF */}
                <p className="text-gray-700 text-sm">
                    <span className="font-medium">CPF:</span> 118.084-54
                </p>
            </div>

            {/* BLOCO 2 - Informações Editáveis */}
            <div className="bg-white shadow-sm rounded-xl p-6 w-full max-w-2xl mt-6">

                {/* Título + Edit Icon */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Informações importantes
                    </h2>
                    <Edit2Icon className="w-5 h-5 text-gray-700 cursor-pointer hover:text-green-600 transition" />
                </div>

                {/* Campos */}
                <div className="space-y-3">

                    <div>
                        <p className="text-gray-600 text-sm font-medium">Data de Nascimento</p>
                        <p className="text-gray-900 text-sm">—</p>
                    </div>

                    <div>
                        <p className="text-gray-600 text-sm font-medium">Outros</p>
                        <p className="text-gray-900 text-sm">—</p>
                    </div>

                </div>
            </div>

        </div>
    );
}
