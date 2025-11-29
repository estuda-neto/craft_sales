import { CheckCircle2, Package, Truck, MapPin } from "lucide-react";

export default function OrderTimeline({ currentStep = 2 }) {

    const steps = [
        { label: "Pedido confirmado", color: "text-green-600", bg: "bg-green-200", border: "border-green-600", icon: <CheckCircle2 /> },
        { label: "Preparando envio", color: "text-yellow-500", bg: "bg-yellow-200", border: "border-yellow-500", icon: <Package /> },
        { label: "Em transporte", color: "text-blue-600", bg: "bg-blue-200", border: "border-blue-600", icon: <Truck /> },
        { label: "Entregue", color: "text-gray-500", bg: "bg-gray-200", border: "border-gray-400", icon: <MapPin /> },
    ];

    // Usa a cor da etapa atual para a barra
    const currentColor = {
        0: "bg-green-600",
        1: "bg-yellow-500",
        2: "bg-blue-600",
        3: "bg-red-600",  // vermelho quando está "em rota / prestes a entregar"
        4: "bg-gray-500",
    }[currentStep] || "bg-blue-600";

    return (
        <div className="w-full flex flex-col items-center mt-6">

            {/* Linha de progresso */}
            <div className="relative w-full max-w-xl">
                {/* Linha de fundo */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-300 rounded-full" />

                {/* Linha preenchida com a cor da etapa atual */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 h-2 ${currentColor} rounded-full transition-all duration-500`}
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
            </div>

            {/* Ícones + labels */}
            <div className="flex justify-between w-full max-w-xl mt-6 px-1">
                {steps.map((step, index) => {
                    const isDone = index <= currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center text-center w-20">

                            {/* Ícone circular */}
                            <div className={`
                                w-10 h-10 flex items-center justify-center rounded-full border-2
                                transition-all duration-300
                                ${isDone ? step.border + " " + step.color + " " + step.bg : "border-gray-400 text-gray-400 bg-gray-100 opacity-60"}
                            `}>
                                {step.icon}
                            </div>

                            {/* Label */}
                            <span className={`text-xs mt-2 ${isDone ? "text-gray-800" : "text-gray-500 opacity-60"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
