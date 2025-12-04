import { ButtonNormal } from "@/src/components/Buttons/ButtonNormal";
import { SellerCard } from "@/src/components/SellerCard";
import { VideoSliderCard } from "@/src/components/VideoSlider";

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


      {/* Seção top score */}
      <section className="max-w-full flex flex-col items-center justify-evenly bg-gray-200 px-4 sm:px-8 md:px-12 py-12 gap-6 md:gap-12 overflow-hidden">
        <ButtonNormal textLabel={"Crie Agora"} link="cadastro" />

      </section>

      {/* Como funciona */}
      <section className="flex flex-col md:flex-row items-center justify-evenly w-full bg-gray-100 px-4 sm:px-8 md:px-12 py-12 gap-6 md:gap-12 overflow-hidden">

      </section>

      {/* Companies */}
      <section className="w-full flex flex-col items-center justify-center  bg-gray-100 overflow-hidden">

      </section>

    </div>
  );
}
