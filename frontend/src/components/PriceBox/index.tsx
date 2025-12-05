import { Heart, Share2, ShoppingCart, Star } from "lucide-react";

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
const formatPrice = (cents: number) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const PriceBox: React.FC<{ product: Product }> = ({ product }) => {
    const savings = product.listPrice ? product.listPrice - product.price : 0;
    return (
        <aside className="w-full md:w-1/2 md:pl-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">{product.title}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-md border"><Heart size={18} /></button>
                        <button className="p-2 rounded-md border"><Share2 size={18} /></button>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex items-end gap-4">
                        <div>
                            <div className="text-3xl font-extrabold">{formatPrice(product.price)}</div>
                            {product.listPrice && (
                                <div className="text-sm line-through text-gray-500 mt-1">{formatPrice(product.listPrice)}</div>
                            )}
                            {savings > 0 && (
                                <div className="text-xs text-green-600 mt-1">Você economiza {formatPrice(savings)}</div>
                            )}
                        </div>
                        <div className="ml-auto text-sm">
                            <div className="flex items-center gap-1">
                                <Star size={16} />
                                <span className="font-medium">{product.rating?.toFixed(1)}</span>
                                <span className="text-sm text-gray-500">({product.reviewsCount})</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        <button className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                            <ShoppingCart size={18} /> Comprar agora
                        </button>
                        <button className="w-full border py-3 rounded-md">Adicionar ao carrinho</button>
                        {product.installments && (
                            <div className="text-sm text-gray-600 mt-1">
                                <span>{product.installments.count}x de {formatPrice(product.installments.value)}</span>
                                <span className="block">sem juros</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 text-sm text-gray-600 border-t pt-3">
                    <div>Vendido por <strong>{product.seller}</strong></div>
                    <div className="mt-2">{product.shortDescription}</div>
                </div>
            </div>
        </aside>
    );
};