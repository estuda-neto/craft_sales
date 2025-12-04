
import Link from "next/link";
import { Session } from "@/src/utils/datatypes/session";
import { Brush, ClipboardList, PackagePlus, PackageSearch, Tags } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Atelie() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    return (
        <div className="w-full min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 flex items-center text-black gap-2">
                    <Brush className="w-7 h-7 text-purple-600" />
                    Área do Artesão
                </h1>

                <p className="text-gray-600 mb-8">
                    Gerencie seus produtos, ofertas e pedidos em um só lugar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Cadastrar Produto */}
                    <Link href="/products/new" className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4">
                        <PackagePlus className="w-8 h-8 text-green-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Cadastrar Produto</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Adicione novos itens ao seu catálogo.
                            </p>
                        </div>
                    </Link>

                    {/* Meus Produtos */}
                    <Link href={`/products/${session.user.id}`} className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4">
                        <ClipboardList className="w-8 h-8 text-blue-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Meus Produtos</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Veja, edite ou remova seus produtos cadastrados.
                            </p>
                        </div>
                    </Link>

                    {/* Produtos Ofertados / Ativos */}
                    <Link
                        href="/artesao/produtos/ofertas"
                        className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4"
                    >
                        <Tags className="w-8 h-8 text-orange-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Produtos Ativos</h2>
                            <p className="text-gray-500 text-sm mt-1"> Gerencie preços, promoções e visibilidade.</p>
                        </div>
                    </Link>

                    {/* Buscar / Filtrar Produtos */}
                    <Link href="/artesao/produtos/buscar" className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all flex items-start gap-4">
                        <PackageSearch className="w-8 h-8 text-purple-600" />
                        <div>
                            <h2 className="text-lg font-semibold">Buscar Produtos</h2>
                            <p className="text-gray-500 text-sm mt-1">Pesquise por nome, categoria ou estoque.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}