"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const ImageGallery: React.FC<{ images: string[]; }> = ({ images }) => {
    const [index, setIndex] = useState(0);
    return (
        <div className="w-full md:w-1/2">
            <div className="relative bg-white rounded-lg overflow-hidden border">
                {/* Main image */}
                <div className="relative h-[420px] md:h-[520px]">
                    <Image src={`http://localhost:3000${images[index]}`} alt={`Imagem ${index + 1}`} fill style={{ objectFit: "contain" }} sizes="(max-width: 768px) 100vw, 50vw" priority />
                </div>

                {/* arrows */}
                <button aria-label="Anterior" onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
                    <ChevronLeft size={20} />
                </button>
                <button aria-label="Próxima" onClick={() => setIndex((i) => (i + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* thumbnails */}
            <div className="mt-3 flex gap-2">
                {images.map((src, i) => (
                    <button key={src + i} onClick={() => setIndex(i)} className={`w-20 h-20 rounded-md overflow-hidden border ${i === index ? "ring-2 ring-offset-2 ring-indigo-500" : "opacity-80"}`}>
                        <Image src={src} alt={`Thumb ${i + 1}`} width={80} height={80} style={{ objectFit: "cover" }} />
                    </button>
                ))}
            </div>
        </div>
    );
}