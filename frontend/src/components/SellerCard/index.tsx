'use client';
import { ShoppingCart } from 'lucide-react';

export const SellerCard = () => {
  return (
    <div className="relative w-[190px] h-[234px] rounded-[25px] overflow-hidden">

      {/* Imagem com tags por cima */}
      <div className="relative h-[80%] w-full rounded-t-[25px] rounded-br-[25px]  border  shadow-xl overflow-hidden">
        <img src="https://picsum.photos/200/300" alt="Handmade crochet product priced at R$ 150.00, available April 2025. Product displayed on a white shopping card with add to cart button." className="w-full h-full object-cover" />
        {/* tags */}
        <div className="absolute w-full top-3 flex justify-between px-3 gap-2">
          <span className="px-3 py-0.5 text-[12px] border border-[#bfbfbf] rounded-full text-[#707070] bg-white"> crochê </span>
          <span className="px-3 py-0.5 text-[12px] border border-[#bfbfbf] rounded-full text-[#707070] bg-white"> 04/2025 </span>
        </div>
      </div>

      <div className="relative h-[20%] w-full flex overflow-hidden">
        {/* texto e preço */}
        <div className="w-[60%] p-2 bg-linear-to-br from-black/20 to-black/90 rounded-b-[25px] flex flex-col">
          <p className="text-[8px] font-semibold text-gray-700">Produto Exemplo</p>
          <p className="text-[12px] font-bold text-gray-900">R$ 150,00</p>
        </div>

        <div className="h-full w-[40%] rounded-tl-[25px] flex items-center justify-center">
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300  hover:-translate-y-[3px]  active:translate-y-0 active:shadow-md flex items-center justify-center z-20">
            <ShoppingCart size={20} strokeWidth={1.5} color='#000' />
          </button>
        </div>
      </div>
    </div>
  );
}