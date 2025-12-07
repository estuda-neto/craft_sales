import { EventCard } from "@/src/components/EnetCard";
import { HCustom } from "@/src/components/HCustom";
import { PartnershipBox } from "@/src/components/PartnershipBox";
import { SellerCard } from "@/src/components/SellerCard";
import { SellerSlider } from "@/src/components/SellerSlideCards";
import { VideoSliderCard } from "@/src/components/VideoSlider";
import Image from "next/image";

const events = [{ id: 1, title: "Cordas Dedilhadas com Alexandre Ribeiro e Alunos", date: new Date("2024-12-06 17:00"), dateFormatted: "6 de Dezembro às 17:00", image: "https://picsum.photos/id/433/800/600" }, { id: 2, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }, { id: 3, title: "Encontro de Corais & Coral Infantil da UNIBES", date: new Date("2024-12-07 19:00"), dateFormatted: "7 de Dezembro às 19:00", image: "https://picsum.photos/id/1027/800/600" }, { id: 4, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }, { id: 5, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }, { id: 6, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }];
export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center bg-gray-100 overflow-x-hidden">

      {/* 1º Seção principal */}
      <section className="flex flex-col justify-center sm:px-4 md:px-12 md:pt-20 md:gap-10 bg-gray-100">
        <div className="w-full lg:flex ">
          <div className="w-full lg:w-[30%]">
            <HCustom level={1} className="text-black text-center py-4 lg:py-7">Artesanatos</HCustom>
            <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap gap-4">
              <SellerCard />
              <SellerCard />
              <SellerCard />
              <SellerCard />
            </div>
          </div>

          <div className="w-full lg:w-[70%]">
            {/* título 60% */}
            <HCustom level={2} className="text-black text-center py-4 md:py-7">Conheça sobre nossos Artesões</HCustom>

            {/* conteúdo 60% (ex: vídeo) */}
            <div className="w-full aspect-video py-4">
              <VideoSliderCard />
            </div>
          </div>

        </div>

      </section>

      <section className="w-full bg-gray-200 py-16 flex flex-col items-center gap-16 sm:px-8">
        <HCustom level={2} className="text-2xl md:text-3xl font-semibold text-center text-black max-w-3xl">Contextualizando arte e artesanato brasileiro na decoração da sua casa</HCustom>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 p-4 lg:p-30  items-center">
          <p className="text-black lg:px-24 text-lg leading-relaxed">
            O artesanato brasileiro transforma ambientes.
            Cada peça traz história, identidade, textura
            e a beleza das mãos que a criaram.
          </p>
          <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
            <Image src="/composition/comp4.webp" alt="Artesanato" fill className="object-cover" />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 p-4 lg:p-30  items-center md:flex-row-reverse">
          <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
            <Image src="/composition/comp2.webp" alt="Cultura" fill className="object-cover" />
          </div>
          <p className="text-black lg:px-24 text-lg leading-relaxed">
            Quando você inclui arte artesanal na sua casa, não está apenas decorando —
            está enchendo o espaço de significado, afeto e cultura.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 p-4 lg:p-30  items-center">
          <p className="text-black lg:px-24 text-lg leading-relaxed">
            Do crochê às fibras naturais, da cerâmica às madeiras talhadas,
            o artesanato cria ambientes acolhedores, ricos e cheios de vida.
            São peças únicas, feitas com cuidado, que conectam a sua casa
            à essência criativa do Brasil.
          </p>

          <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
            <Image src="/composition/comp1.webp" alt="Peças artesanais" fill className="object-cover" />
          </div>
        </div>

        <p className="text-black text-lg text-center leading-relaxed max-w-2xl">
          Traga beleza, autenticidade e alma para dentro do seu lar.
          Decorar com artesanato é decorar com história.
        </p>

        <SellerSlider sellers={[]} />

      </section>



      < section className="w-full flex flex-col items-center justify-center lg:p-10 bg-gray-100 overflow-hidden" >
        <div className="flex flex-col items-center gap-y-5">
          <HCustom level={2} className="font-semibold text-center text-gray-800 wrap-break-word py-10">Eventos e Mostras de Artesanato</HCustom>

          <p className="text-gray-600 max-w-2xl text-center leading-relaxed wrap-break-word text-lg lg:mb-4">
            Confira alguns dos eventos que celebram o artesanato brasileiro, conectando tradição,
            cultura e criatividade em experiências únicas.
          </p>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-2 py-4">
          <EventCard event={events[0]} />
          <EventCard event={events[1]} />
          <EventCard event={events[2]} />
          <EventCard event={events[3]} />
          <EventCard event={events[4]} />
        </div>


      </section >

      < section className="w-full h-auto bg-gray-200 overflow-hidden" >
        <PartnershipBox />
      </section>

    </div >
  );
}
