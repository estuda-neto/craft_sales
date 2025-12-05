import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ImageGallery } from "@/src/components/ImageGallery";
import { PriceBox } from "@/src/components/PriceBox";

type Product = {
    id: string;
    title: string;
    brand?: string;
    price: number; // in cents
    listPrice?: number; // in cents
    images: string[];
    shortDescription?: string;
    seller?: string;
    installments?: { count: number; value: number };
    rating?: number;
    reviewsCount?: number;
    description?: string;
};

const mockProduct: Product = {
    id: "6889655",
    title: "Bala de Gelatina e Marshmallows Dentadura 90g - Fini",
    brand: "Fini",
    price: 599, // R$5,99 -> 599 cents
    listPrice: 799,
    images: ["/images/fini-1.jpg","/images/fini-2.jpg","/images/fini-3.jpg","/images/fini-4.jpg"],
    shortDescription: "Mistura de balas gelatina e marshmallows em formato divertido.",
    seller: "Americanas",
    installments: { count: 3, value: 199 }, // R$1,99 per installment example
    rating: 4.6,
    reviewsCount: 128,
    description:
        "<p>Caixinha com 90g de confeitos. Ideal para festas, lembrancinhas e lancheiras.</p>",
};


interface Props { params: { productId: string }; };

export default async function ProductDetails({ params }: Props) {
    const product = mockProduct;
    const { productId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");


    return (<div className='w-full min-h-screen relative bg-gray-100 transition-colors duration-500'>

        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <ImageGallery images={product.images} />
                    <PriceBox product={product} />
                </div>

                {/* Tabs / Description */}
                <div className="mt-8">
                    <div className="bg-white rounded-lg p-6 border shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Descrição do produto</h2>
                        <div
                            className="prose max-w-none text-sm"
                            dangerouslySetInnerHTML={{ __html: product.description || "" }}
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