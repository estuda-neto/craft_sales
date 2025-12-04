import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { Loader } from "@/src/components/shared/Loader";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import {  Truck, ArrowRight } from "lucide-react";
import OrderTimeline from "@/src/components/OrderTimeline";

export default async function Orders() {
    const isLoading = false;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");

    // Fake data: pedidos
    const orders = [
        {
            id: "A1B2C3D4",
            orderDate: "2025-01-20",
            deliveryDate: "2025-01-28",
            status: "Em trânsito",
            shippingAddress: "Rua das Flores, 120 - São Paulo, SP",
            paymentMethod: "Cartão de Crédito (Mastercard •••• 1428)",
            total: "R$ 249,90",
            items: [
                {
                    name: "Fone de Ouvido Bluetooth WishSound X2",
                    qty: 1,
                    price: "R$ 149,90",
                    image: "https://m.media-amazon.com/images/I/71g2EDxJoUL._AC_SX522_.jpg"
                },
                {
                    name: "Cabo USB-C Reforçado 2m",
                    qty: 1,
                    price: "R$ 39,90",
                    image: "https://m.media-amazon.com/images/I/51A9qv4IgNL._AC_SX522_.jpg"
                }
            ],
        }
    ];

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Meus Pedidos</h1>

                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-10"
                    >
                        {/* Cabeçalho */}
                        <div className="flex justify-between items-center flex-wrap gap-3">
                            <div>
                                <p className="text-sm text-gray-500">Pedido realizado em</p>
                                <p className="text-gray-800 font-medium">
                                    {order.orderDate}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Entrega prevista</p>
                                <p className="text-gray-800 font-medium">
                                    {order.deliveryDate}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-gray-800 font-medium">{order.total}</p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mt-6">
                            <div className="flex items-center gap-3">
                                <Truck className="text-blue-600 w-6 h-6" />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {order.status}
                                </h2>
                            </div>

                            {/* Mini Timeline */}
                            <OrderTimeline />
                        
                        </div>

                        {/* Itens */}
                        <div className="mt-8 space-y-4">
                            {order.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 items-center bg-gray-50 rounded-xl p-4 hover:shadow-sm transition"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded-lg object-cover"
                                    />

                                    <div className="flex flex-col">
                                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-600">Qtd: {item.qty}</p>
                                        <p className="text-sm text-gray-800 font-semibold">
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Endereço + Pagamento */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-xl">
                                <h4 className="text-gray-700 font-semibold mb-2">Endereço de entrega</h4>
                                <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl">
                                <h4 className="text-gray-700 font-semibold mb-2">Pagamento</h4>
                                <p className="text-gray-600 text-sm">{order.paymentMethod}</p>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2">
                                Ver detalhes <ArrowRight className="w-4 h-4" />
                            </button>

                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
                                Repetir pedido
                            </button>

                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
                                Suporte
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
