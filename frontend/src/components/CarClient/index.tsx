"use client";

import { useState, useMemo } from "react";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";

interface CartItem { id: string; name: string; price: number; quantity: number; image?: string; };

type CarClientProps = {
    carItems: CartItem[],
    userId: string,
};

export const CarClient = ({ carItems, userId }: CarClientProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const increase = (id: string) => { setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)); };
    const decrease = (id: string) => { setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)); };
    const remove = (id: string) => { setCart((prev) => prev.filter((item) => item.id !== id)); };

    const total = useMemo(() => { return cart.reduce((sum, p) => sum + p.price * p.quantity, 0); }, [cart]);

    const handleCheckout = async () => {
        // Chamada para API de pagamento ou criação do pedido
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            body: JSON.stringify({ userId, cart }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) alert("Pedido realizado com sucesso!");
        else alert("Erro ao realizar o pedido");
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingCart /> Meu Carrinho
            </h1>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                        <div className="flex items-center gap-4">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            )}

                            <div>
                                <h2 className="font-semibold text-lg">{item.name}</h2>
                                <p className="text-gray-600">
                                    R$ {item.price.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => decrease(item.id)}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                                <Minus size={16} />
                            </button>

                            <span className="font-semibold">{item.quantity}</span>

                            <button
                                onClick={() => increase(item.id)}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                                <Plus size={16} />
                            </button>

                            <button
                                onClick={() => remove(item.id)}
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
