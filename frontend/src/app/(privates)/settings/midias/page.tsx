import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FileVideoCameraIcon, FilePenIcon, FileXCornerIcon, FileStackIcon, MonitorPlayIcon } from "lucide-react";

import Link from "next/link";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export default async function SettingsMidias() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    return (
        <div className="w-full min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 flex items-center text-black gap-2">
                    <MonitorPlayIcon className="w-7 h-7 text-red-600" />
                    Painel do Administrador - Mídias
                </h1>

                <p className="text-gray-600 mb-8">
                    Gerencie e configure a visualização de midias no sistema.
                </p>

                {/* GRID DE FUNÇÕES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Gerenciar Usuários */}
                    <Link href="/admin/usuarios" className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4">
                        <FileVideoCameraIcon className="w-8 h-8 text-blue-600" />
                        <div>
                            <h2 className="text-lg text-gray-700 font-semibold">Adicionar Midia</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                cadastre a url de um video para aparecer na home.
                            </p>
                        </div>
                    </Link>

                    {/* Gerenciar Artesãos */}
                    <Link href="/admin/artesaos" className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4">
                        <FilePenIcon className="w-8 h-8 text-purple-600" />
                        <div>
                            <h2 className="text-lg text-gray-700 font-semibold">Editar Url</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                edite a url, atualize. de um video ja exibido.
                            </p>
                        </div>
                    </Link>

                    {/* Produtos Pendentes de Aprovação */}
                    <Link
                        href="/admin/produtos/aprovacao"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <FileXCornerIcon className="w-8 h-8 text-orange-600" />
                        <div>
                            <h2 className="text-lg text-gray-700 font-semibold">Excluir Vídeo</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Faça exclusão de um Video cadastrado na aplicação.
                            </p>
                        </div>
                    </Link>

                    {/* Todos as urls */}
                    <Link
                        href="/admin/produtos"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <FileStackIcon className="w-8 h-8 text-green-600" />
                        <div>
                            <h2 className="text-lg text-gray-700 font-semibold">Todos os Videos</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Veja todos os videos cadastrados na plataforma.
                            </p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
