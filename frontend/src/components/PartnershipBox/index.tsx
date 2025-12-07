import Image from "next/image";
import { HCustom } from "../HCustom";

const patrocinadores = [
    { id: 1, src: "/partnership/valor_software.png", alt: "Logo 1" },
    { id: 2, src: "/partnership/valor_software.png", alt: "Logo 2" },
    { id: 3, src: "/partnership/valor_software.png", alt: "Logo 3" },
    { id: 4, src: "/partnership/valor_software.png", alt: "Logo 4" },
    { id: 5, src: "/partnership/valor_software.png", alt: "Logo 2" },
    { id: 6, src: "/partnership/valor_software.png", alt: "Logo 3" },
];

export const PartnershipBox = () => {
    return (
        <section className="w-full bg-gray-200 py-10">
            <HCustom level={3} className="text-gray-800 text-center mt-2 mb-9">Parcerias</HCustom>
            <div className="max-w-[90%] mx-auto grid gap-2 px-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-items-center">
                {patrocinadores.map((item) => (
                    <div key={item.id} className="flex items-center justify-center">
                        <Image src={item.src} alt={item.alt} width={150} height={90} className="object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                    </div>
                ))}
            </div>
        </section>
    );
};
