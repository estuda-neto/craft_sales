import { ButtonNormal } from "@/components/Buttons/ButtonNormal"

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* Seção principal */}
      <section className="max-w-full flex flex-col md:flex-row items-center justify-evenly bg-gray-100 px-4 sm:px-8 md:px-12 py-12 gap-6 md:gap-12 overflow-hidden">

        <ButtonNormal textLabel={"Crie Agora"} link="cadastro" />


      </section>

      {/* Seção top score */}
      <section className="max-w-full flex flex-col items-center justify-evenly bg-gray-200 px-4 sm:px-8 md:px-12 py-12 gap-6 md:gap-12 overflow-hidden">

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
