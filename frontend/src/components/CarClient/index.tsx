"use client";

import { useState, useMemo } from "react";
import { Plus, Minus, Trash2, ShoppingBasket, CreditCard, QrCode, Smartphone } from "lucide-react";
import { ItemWithProduct } from "@/src/utils/datatypes/items";
import { HCustom } from "../HCustom";

type CarClientProps = { carItems: ItemWithProduct[] };

export const CarClient: React.FC<CarClientProps> = ({ carItems }) => {
    const [items, setItems] = useState<ItemWithProduct[]>(carItems);

    const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "qrcode">("card");

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [isCvvFocused, setIsCvvFocused] = useState(false);

    const [installmentsSelected, setInstallmentsSelected] = useState(1);

    const increase = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.itemId === id
                    ? { ...item, quantProduct: item.quantProduct + 1 }
                    : item
            )
        );
    };

    const decrease = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.itemId === id
                    ? { ...item, quantProduct: Math.max(1, item.quantProduct - 1) }
                    : item
            )
        );
    };

    const remove = (id: string) => {
        setItems((prev) => prev.filter((item) => item.itemId !== id));
    };

    const total = useMemo(
        () => items.reduce((sum, p) => sum + p.price * p.quantProduct, 0),
        [items]
    );

    // 🔥 Opções de parcelamento até 12x
    const installments = useMemo(() => {
        const max = 12;
        const list = [];
        for (let i = 1; i <= max; i++) {list.push({ quantity: i, value: total / i });
    }
        return list;
    }, [total]);

    const handleCheckout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            body: JSON.stringify({
                items,
                paymentMethod,
                installments: installmentsSelected,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) alert("Pedido realizado com sucesso!");
        else alert("Erro ao realizar o pedido");
    };

    return (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* COLUNA ESQUERDA */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                <HCustom level={4} className="text-gray-800 font-bold mb-6 flex items-center gap-2">
                    <ShoppingBasket /> Meu Carrinho
                </HCustom>

                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.itemId}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow border"
                        >
                            <div className="flex items-center gap-4">
                                {item.product && (
                                    <img
                                        src={
                                            item.product.image
                                                ? `http://localhost:3000${item.product.image}`
                                                : ""
                                        }
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded-xl"
                                    />
                                )}

                                <div>
                                    <h2 className="font-semibold text-lg">{item.product.name}</h2>
                                    <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => decrease(item.itemId)}
                                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="font-semibold">{item.quantProduct}</span>

                                <button
                                    onClick={() => increase(item.itemId)}
                                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                >
                                    <Plus size={16} />
                                </button>

                                <button
                                    onClick={() => remove(item.itemId)}
                                    className="ml-4 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COLUNA DIREITA */}
            <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-10">
                <h2 className="text-xl font-bold mb-4">Resumo</h2>

                <div className="flex justify-between text-lg font-semibold mb-6">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                </div>

                <h3 className="text-lg font-bold mb-3">Forma de pagamento</h3>

                <div className="space-y-3">
                    {[
                        { id: "card", label: "Cartão de Crédito", icon: <CreditCard /> },
                        { id: "pix", label: "PIX (copia e cola)", icon: <Smartphone /> },
                        { id: "qrcode", label: "QR Code Pix", icon: <QrCode /> },
                    ].map((method) => (
                        <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id as any)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition ${paymentMethod === method.id
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {method.icon} {method.label}
                        </button>
                    ))}
                </div>

                {/* FORM CARTÃO */}
                {paymentMethod === "card" && (
                    <div className="mt-8">

                        {/* CARTÃO BONITO */}
                        <div className="w-full flex justify-center mb-6">
                            <div className="relative w-80 h-48 perspective">
                                <div
                                    className={`relative w-full h-full rounded-2xl shadow-xl transition-transform duration-700 ${isCvvFocused ? "rotate-y-180" : ""
                                        }`}
                                    style={{ transformStyle: "preserve-3d" }}
                                >

                                    {/* Frente */}
                                    <div
                                        className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-400 rounded-2xl text-white p-5 flex flex-col justify-between"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <div className="text-lg tracking-widest">
                                            {cardNumber || "**** **** **** ****"}
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <div>
                                                <div className="opacity-70">Nome</div>
                                                <div className="uppercase">{cardName || "SEU NOME"}</div>
                                            </div>
                                            <div>
                                                <div className="opacity-70">Validade</div>
                                                <div>{cardExp || "MM/AA"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Verso */}
                                    <div
                                        className="absolute inset-0 bg-gray-800 rounded-2xl p-5 text-white rotate-y-180"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <div className="bg-black h-10 mt-5"></div>
                                        <div className="mt-6">
                                            <div className="text-xs opacity-70">CVV</div>
                                            <div className="bg-white text-black w-20 p-2 rounded text-center">
                                                {cardCvv || "***"}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* CAMPOS DO FORM */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Número do Cartão</label>
                                <input
                                    maxLength={19}
                                    value={cardNumber}
                                    onChange={(e) =>
                                        setCardNumber(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .replace(/(.{4})/g, "$1 ")
                                                .trim()
                                        )
                                    }
                                    onFocus={() => setIsCvvFocused(false)}
                                    className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600"
                                    placeholder="1111 2222 3333 4444"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Nome Impresso</label>
                                <input
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                    onFocus={() => setIsCvvFocused(false)}
                                    className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600"
                                    placeholder="SEU NOME"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="text-sm font-medium text-gray-700">Validade</label>
                                    <input
                                        maxLength={5}
                                        value={cardExp}
                                        onChange={(e) =>
                                            setCardExp(
                                                e.target.value
                                                    .replace(/\D/g, "")
                                                    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
                                            )
                                        }
                                        onFocus={() => setIsCvvFocused(false)}
                                        className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600"
                                        placeholder="MM/AA"
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label className="text-sm font-medium text-gray-700">CVV</label>
                                    <input
                                        maxLength={3}
                                        value={cardCvv}
                                        onChange={(e) =>
                                            setCardCvv(e.target.value.replace(/\D/g, ""))
                                        }
                                        onFocus={() => setIsCvvFocused(true)}
                                        className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600"
                                        placeholder="123"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 🔥 PARCELAMENTO */}
                        <div className="mt-6">
                            <label className="text-sm font-medium text-gray-700">Parcelamento</label>
                            <select
                                value={installmentsSelected}
                                onChange={(e) => setInstallmentsSelected(Number(e.target.value))}
                                className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600"
                            >
                                {installments.map((p) => (
                                    <option key={p.quantity} value={p.quantity}>
                                        {p.quantity}x de R$ {p.value.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                )}

                <button
                    onClick={handleCheckout}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    Finalizar Pedido
                </button>
            </div>
        </div>
    );
};
