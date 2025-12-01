"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const videos = [
    { src: "https://youtu.be/aFJtP9fCpLs", texto: "Primeiro vídeo" },
    { src: "https://youtu.be/HD2sMiAwpCQ?list=RDHD2sMiAwpCQ", texto: "Segundo vídeo" },
    { src: "https://youtu.be/HD2sMiAwpCQ?list=RDHD2sMiAwpCQ", texto: "Terceiro vídeo" },
];

function toEmbed(url: string) {
    const id =
        url.split("youtu.be/")[1]?.split("?")[0] ||
        url.split("v=")[1]?.split("&")[0];

    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0`;
}


export default function VideoSliderCard() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % videos.length);
    const prev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);

    const current = videos[index];
    const embedUrl = toEmbed(current.src);

    return (
        <div className="w-full mx-auto flex items-center justify-center space-y-4 gap-x-4">
            <button onClick={prev} className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-400 transition">
                <ChevronLeftIcon color="#000" />
            </button>

            <div className="relative w-[70%] h-[600px] rounded-4xl overflow-hidden bg-gray-200">
                <iframe src={embedUrl} className="w-full h-[400px] object-cover" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

                {/* ÁREA DE TEXTO */}
                <div className="absolute bottom-0 left-0 w-full h-[200px] bg-[#d9d9d9] text-black" style={{ clipPath: "polygon(0 5%, 70% 5%, 75% 40%, 100% 40%, 100% 100%, 0 100%)" }}>
                    <div className="relative p-4">
                        <p className="text-sm">{current.texto}</p>
                        <button className="mt-3 px-4 py-1 bg-neutral-800 text-white rounded-full text-sm">
                            Ver mais
                        </button>
                    </div>
                </div>
            </div>

            <button onClick={next} className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-400 transition">
                <ChevronRightIcon color="#000" />
            </button>
        </div>
    );
}
