import Image from "next/image";


export type Evento = { id: number; title: string; date: Date; dateFormatted: string; image: string; };
type EventCardProps = {
  event: Evento;
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="relative w-[360px] h-[640px] rounded-3xl overflow-hidden shadow-xl bg-black text-white group cursor-pointer">

      {/* Imagem fixa no topo */}
      <div className="relative w-full h-[460px]">
        <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-all duration-500"/>

        {/* Gradiente escuro igual ao da referência */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Conteúdo alinhado exatamente igual */}
      <div className="absolute bottom-0 p-5 flex flex-col gap-2">
        <span className="bg-orange-800 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
          {event.dateFormatted}
        </span>

        <h3 className="text-lg font-semibold leading-tight drop-shadow-md">
          {event.title}
        </h3>
      </div>
    </div>
  );
};
