"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const videos = [
    { src: "https://youtu.be/HD2sMiAwpCQ?list=RDHD2sMiAwpCQ", texto: "Primeiro vídeo" },
    { src: "https://youtu.be/HD2sMiAwpCQ?list=RDHD2sMiAwpCQ", texto: "Segundo vídeo" },
    { src: "https://youtu.be/HD2sMiAwpCQ?list=RDHD2sMiAwpCQ", texto: "Terceiro vídeo" },
];

export default function VideoSliderCard() {
    const [index, setIndex] = useState(0);

    const next = () => { setIndex((prev) => (prev + 1) % videos.length); };
    const prev = () => { setIndex((prev) => (prev - 1 + videos.length) % videos.length); };

    const current = videos[index];

    return (
        <div className="w-full mx-auto flex items-center justify-center space-y-4 gap-4">
            <button onClick={prev} className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-400 transition">
                < ChevronLeftIcon color="#000"/>
            </button>

            {/* CARD DO VÍDEO */}
            <div className="relative w-[70%] h-[600px] rounded-4xl overflow-hidden bg-gray-200">

                {/* VIDEO */}
                <video src={current.src} autoPlay loop muted playsInline className="w-full h-[260px] object-cover" />

                {/* ÁREA DE TEXTO COM SHAPE */}
                <div className="absolute bottom-0 left-0 w-full h-[200px] bg-[#d9d9d9] p-5 text-black" style={{ clipPath: "polygon(0 20%, 70% 20%, 75% 40%, 100% 40%, 100% 100%, 0 100%)" }}>
                    <p className="text-sm">{current.texto}</p>
                    <button className="mt-3 px-4 py-1 bg-neutral-800 text-white rounded-full text-sm">
                        Ver mais
                    </button>
                </div>
            </div>

            <button onClick={next} className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-400 transition">
                < ChevronRightIcon color="#000" />
            </button>

        </div>
    );
}
