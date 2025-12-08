import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ImageGallery } from "@/src/components/ImageGallery";
import { Product } from "@/src/utils/datatypes/products";
import { Loader } from "@/src/components/shared/Loader";
import { FormInterativeSeller } from "@/src/components/Forms";

async function getProduct(session: Session, productId: string): Promise<Product | null> {
    try {
        if (!session?.accessToken) {
            console.error("Missing access token.");
            return null;
        }
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Request failed with status ${response.status}`);
            return null;
        }

        const data = (await response.json()) as Product;
        return data;

    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};

interface Props { params: { productId: string }; };

export default async function ProductDetails({ params }: Props) {
    const { productId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const product = await getProduct(session, productId);
    const produtImages = [product?.image ? product?.image : "", "/images/fini-2.jpg", "/images/fini-3.jpg", "/images/fini-4.jpg"];


    return (<div className='w-full min-h-screen relative bg-gray-100 transition-colors duration-500'>

        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <ImageGallery images={produtImages} />
                    {product ? (
                        <FormInterativeSeller product={product} cartId={"81f545ca-ef45-41e8-bb51-233c9d27de06"} />
                    ) : (
                        <Loader />
                    )}
                </div>

                {/* Tabs / Description */}
                <div className="mt-8">
                    <div className="bg-white rounded-lg p-6 border shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Descrição do produto</h2>
                        <div className="prose max-w-none text-sm" dangerouslySetInnerHTML={{ __html: product ? product.description : "" }}
                        />
                    </div>
                </div>

                {/* Similar / Reviews */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-white rounded-lg p-4 border">
                        <h3 className="font-semibold mb-2">Avaliações</h3>
                        <div className="text-sm text-gray-600">Nenhuma avaliação detalhada disponível (mock).</div>
                    </div>
                    <aside className="bg-white rounded-lg p-4 border">
                        <h3 className="font-semibold mb-2">Mais vendidos</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li>Produto similar 1</li>
                            <li>Produto similar 2</li>
                            <li>Produto similar 3</li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>

    </div>);
}