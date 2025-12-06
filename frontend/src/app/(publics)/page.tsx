import { EventCard } from "@/src/components/EnetCard";
import { SellerCard } from "@/src/components/SellerCard";
import { SellerSlider } from "@/src/components/SellerSlideCards";
import { VideoSliderCard } from "@/src/components/VideoSlider";
import Image from "next/image";

const events = [{ id: 1, title: "Cordas Dedilhadas com Alexandre Ribeiro e Alunos", date: new Date("2024-12-06 17:00"), dateFormatted: "6 de Dezembro às 17:00", image: "https://picsum.photos/id/433/800/600" }, { id: 2, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }, { id: 3, title: "Encontro de Corais & Coral Infantil da UNIBES", date: new Date("2024-12-07 19:00"), dateFormatted: "7 de Dezembro às 19:00", image: "https://picsum.photos/id/1027/800/600" }, { id: 4, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }, { id: 5, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }, { id: 6, title: "Show Mark Lambert – Jewish American Composers", date: new Date("2024-12-06 20:00"), dateFormatted: "6 de Dezembro às 20:00", image: "https://picsum.photos/id/237/800/600" }];
export default function Home() {
  return (
    <div className="w-full bg-gray-100 overflow-x-hidden">

      {/* Seção principal */}
      <section className="max-w-full flex flex-col md:flex-row items-start justify-between bg-gray-100 px-4 sm:px-8 md:px-12 pt-20 gap-10">

        {/* 60% - vem primeiro no mobile */}
        <div className="order-1 md:order-2 w-full md:w-[70%]">
          {/* título 60% */}
          <h2 className="text-xl text-center text-black font-semibold mb-4 py-5">Conheça sobre nossos Artesões</h2>

          {/* conteúdo 60% (ex: vídeo) */}
          <div className="w-full aspect-video">
            <VideoSliderCard />
          </div>
        </div>

        {/* 40% - vem depois no mobile */}
        <div className="order-2 md:order-1 w-full md:w-[30%]">
          {/* título 40% */}
          <h2 className="text-xl text-center text-black font-semibold mb-4 py-5">Produtos / Artesanatos</h2>

          {/* grid de cards 40% */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SellerCard />
            <SellerCard />
            <SellerCard />
            <SellerCard />
          </div>
        </div>

      </section>


      {/* Seção info */}
      <section className="w-full bg-gray-200 px-4 sm:px-8 md:px-12 py-16 flex flex-col items-center gap-16">

        <h2 className="text-2xl md:text-3xl font-semibold text-center text-black max-w-3xl">
          Contextualizando arte e artesanato brasileiro na decoração da sua casa
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <p className="text-black text-lg leading-relaxed">
            O artesanato brasileiro transforma ambientes.
            Cada peça traz história, identidade, textura
            e a beleza das mãos que a criaram.
          </p>

          <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
            <Image src="https://picsum.photos/id/237/800/600" alt="Artesanato" fill className="object-cover" />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
            <Image src="https://picsum.photos/id/1025/800/600" alt="Cultura" fill className="object-cover" />
          </div>
          <p className="text-black text-lg leading-relaxed">
            Quando você inclui arte artesanal na sua casa, não está apenas decorando —
            está enchendo o espaço de significado, afeto e cultura.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <p className="text-black text-lg leading-relaxed">
            Do crochê às fibras naturais, da cerâmica às madeiras talhadas,
            o artesanato cria ambientes acolhedores, ricos e cheios de vida.
            São peças únicas, feitas com cuidado, que conectam a sua casa
            à essência criativa do Brasil.
          </p>

          <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
            <Image src="https://picsum.photos/id/1067/800/600" alt="Peças artesanais" fill className="object-cover" />
          </div>
        </div>

        <p className="text-black text-lg text-center leading-relaxed max-w-2xl">
          Traga beleza, autenticidade e alma para dentro do seu lar.
          Decorar com artesanato é decorar com história.
        </p>

        <SellerSlider sellers={[]} />

      </section>


      {/* eventos */}
      < section className="w-full flex flex-col items-center justify-center p-10 bg-gray-100 overflow-hidden" >
        <div className="flex flex-col items-center gap-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
            Eventos e Mostras de Artesanato pelo Brasil
          </h2>

          <p className="text-gray-600 max-w-2xl text-center leading-relaxed text-lg mb-4">
            Confira alguns dos eventos que celebram o artesanato brasileiro, conectando tradição,
            cultura e criatividade em experiências únicas.
          </p>
        </div>
        <div className="flex items-center gap-3 py-4">
          <EventCard event={events[0]} />
          <EventCard event={events[1]} />
          <EventCard event={events[2]} />
        </div>


      </section >

    </div >
  );
}
