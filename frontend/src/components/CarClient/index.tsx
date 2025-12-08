"use client";

import { useState, useMemo } from "react";
import { Plus, Minus, Trash2, ShoppingBasket } from "lucide-react";
import { ItemWithProduct } from "@/src/utils/datatypes/items";
import { HCustom } from "../HCustom";

type CarClientProps = {
    carItems: ItemWithProduct[],
    userId: string,
};

export const CarClient: React.FC<CarClientProps> = ({ carItems, userId }) => {
    const [items, setItems] = useState<ItemWithProduct[]>(carItems);

    const increase = (id: string) => { setItems((prev) => prev.map((item) => item.itemId === id ? { ...item, quantity: item.quantProduct + 1 } : item)); };
    const decrease = (id: string) => { setItems((prev) => prev.map((item) => item.itemId === id ? { ...item, quantity: Math.max(1, item.quantProduct - 1) } : item)); };
    const remove = (id: string) => { setItems((prev) => prev.filter((item) => item.itemId !== id)); };

    const total = useMemo(() => { return items.reduce((sum, p) => sum + p.price * p.quantProduct, 0); }, [items]);

    const handleCheckout = async () => {
        // Chamada para API de pagamento ou criação do pedido
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            body: JSON.stringify({ userId, items }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) alert("Pedido realizado com sucesso!");
        else alert("Erro ao realizar o pedido");
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow">
            <HCustom level={5} className="text-gray-800 font-bold mb-6 flex items-center gap-2"> <ShoppingBasket /> Meu Carrinho</HCustom>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.itemId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                        <div className="flex items-center gap-4">
                            {item.product && (
                                <img src={item.product.image ? `http://localhost:3000${item.product.image}` : ""} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                            )}

                            <div>
                                <h2 className="font-semibold text-lg">{item.product.name}</h2>
                                <p className="text-gray-600">
                                    R$ {item.price.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => decrease(item.itemId)}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                                <Minus size={16} />
                            </button>

                            <span className="font-semibold">{item.quantProduct}</span>

                            <button
                                onClick={() => increase(item.itemId)}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                                <Plus size={16} />
                            </button>

                            <button
                                onClick={() => remove(item.itemId)}
                                className="ml-4 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 border-t border-gray-200">
                <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                </div>

                <button onClick={handleCheckout} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                    Finalizar Pedido
                </button>
            </div>
        </div>
    );
}
