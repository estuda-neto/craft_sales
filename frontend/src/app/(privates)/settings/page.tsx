import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { Users, UserCog, PackageSearch, ShieldCheck, Layers, ClipboardList, Settings as Cog, Store } from "lucide-react";

import Link from "next/link";

export default async function AdminSettings() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    return (
        <div className="w-full min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 flex items-center text-black gap-2">
                    <ShieldCheck className="w-7 h-7 text-red-600" />
                    Painel do Administrador
                </h1>

                <p className="text-gray-600 mb-8">
                    Gerencie usuários, produtos, artesãos e configurações do sistema.
                </p>

                {/* GRID DE FUNÇÕES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Gerenciar Usuários */}
                    <Link
                        href="/admin/usuarios"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Gerenciar Usuários</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Liste, edite, bloqueie ou exclua usuários do sistema.
                            </p>
                        </div>
                    </Link>

                    {/* Gerenciar Artesãos */}
                    <Link
                        href="/admin/artesaos"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <UserCog className="w-8 h-8 text-purple-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Gerenciar Artesãos</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Aprove artesãos, revise documentos e gerencie perfis.
                            </p>
                        </div>
                    </Link>

                    {/* Produtos Pendentes de Aprovação */}
                    <Link
                        href="/admin/produtos/aprovacao"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <ShieldCheck className="w-8 h-8 text-orange-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Aprovar Produtos</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Produtos aguardando revisão e aprovação.
                            </p>
                        </div>
                    </Link>

                    {/* Todos os Produtos */}
                    <Link
                        href="/admin/produtos"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <PackageSearch className="w-8 h-8 text-green-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Todos os Produtos</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Veja todos os produtos cadastrados no marketplace.
                            </p>
                        </div>
                    </Link>

                    {/* Categorias */}
                    <Link
                        href="/admin/categorias"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <Layers className="w-8 h-8 text-indigo-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Gerenciar Categorias</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Adicione, edite e exclua categorias de produtos.
                            </p>
                        </div>
                    </Link>

                    {/* Pedidos */}
                    <Link
                        href="/admin/pedidos"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <ClipboardList className="w-8 h-8 text-teal-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Pedidos</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Acompanhe todos os pedidos realizados no sistema.
                            </p>
                        </div>
                    </Link>

                    {/* Lojas / Artesãos Ativos */}
                    <Link
                        href="/admin/lojas"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <Store className="w-8 h-8 text-pink-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Lojas</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Gerencie lojas artesanais e sua situação no sistema.
                            </p>
                        </div>
                    </Link>

                    {/* Configurações do Sistema */}
                    <Link
                        href="/admin/configuracoes"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <Cog className="w-8 h-8 text-gray-700" />
                        <div>
                            <h2 className="text-lg font-semibold">Configurações do Sistema</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Controle regras, permissões e parâmetros globais.
                            </p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
