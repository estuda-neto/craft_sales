"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SellerCard } from "../SellerCard";

type SellerSliderProps = {
  sellers: any[]; // substitua pelo tipo real se tiver
};

export function SellerSlider({ sellers = [] }: SellerSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "next" | "prev") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full flex flex-col gap-4">
      <div className="flex justify-between items-center px-4">
        <button
          onClick={() => scroll("prev")}
          className="p-2 rounded-full shadow bg-white hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scroll("next")}
          className="p-2 rounded-full shadow bg-white hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      <motion.div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {sellers.map((seller, i) => (
          <div key={i} className="min-w-[260px] max-w-[260px] shrink-0">
            <SellerCard />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
