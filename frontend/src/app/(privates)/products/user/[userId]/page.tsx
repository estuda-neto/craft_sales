import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { BASE_URL_BACKEND } from "@/src/app/api/base_url";
import { Product } from "@/src/utils/datatypes/products";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function GetMyProducts(session: Session, userId: string): Promise<Product[]> {
    try {
        const response = await fetch(`${BASE_URL_BACKEND}/products/user/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json") && response.status === 200) {
            const projucts = await response.json();
            return projucts;
        }
        return [];
    } catch (error) {
        throw new Error("erro de conexão...")
    }
}

interface Props { params: { userId: string }; };
export default async function MyProducts({ params }: Props) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const { userId } = await params;
    const myProducts = await GetMyProducts(session, userId);



    return (
        <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col">

            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Meus Produtos
            </h1>

            {myProducts.length === 0 ? (
                <p className="text-center text-gray-600 mt-10">
                    Você ainda não cadastrou nenhum produto.
                </p>
            ) : (
                <div
                    className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        gap-6
                    "
                >
                    {myProducts.map((product) => (
                        <div key={product.productId} className=" bg-white shadow-md rounded-2xl overflow-hidden  border border-gray-200 hover:shadow-lg  transition-all duration-300 cursor-pointer">
                            {/* Imagem */}
                            <div className="w-full h-40 bg-gray-200 overflow-hidden">
                                <img src={product.image ?? ""} alt={product.name} className="w-full h-full object-cover"/>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-4 flex flex-col gap-2">

                                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                    {product.name}
                                </h2>

                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-indigo-600 font-semibold">
                                        R$ {product.price.toFixed(2)}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        Estoque: {product.quantStock}
                                    </span>
                                </div>

                                {/* Status de validação */}
                                {!product.isValidated && (
                                    <span className="mt-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full w-fit">
                                        Aguardando validação
                                    </span>
                                )}

                                {/* Botões */}
                                <div className="mt-4 flex gap-2">
                                    <button
                                        className="
                                            flex-1 bg-indigo-600 text-white py-2 rounded-xl 
                                            hover:bg-indigo-700 transition
                                        "
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="
                                            flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl 
                                            hover:bg-gray-300 transition
                                        "
                                    >
                                        Ver
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}