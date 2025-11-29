"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function ProductExplorer() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [openSection, setOpenSection] = useState<string | null>("category");

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const products = Array.from({ length: 12 }).map((_, i) => ({ id: i, name: `Produto Premium ${i + 1}`, price: (49 + i * 3).toFixed(2), image: `https://source.unsplash.com/random/300x300?sig=${i}&product` }));

  return (
    <div className="w-full mt-3 min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[15%_85%] gap-6">

        {/* --- ASIDE DE FILTROS --- */}
        <aside className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200 h-fit sticky top-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Filtros</h2>

          {/* CATEGORIA */}
          <div className="mb-4">
            <button onClick={() => toggleSection("category")} className="flex justify-between w-full font-medium text-gray-800">
              Categoria
              <ChevronDown
                size={18}
                className={`transition-transform ${openSection === "category" ? "rotate-180" : ""
                  }`}
              />
            </button>

            {openSection === "category" && (
              <div className="mt-2 space-y-2 pl-1">
                {["Feminino", "Masculino", "Infantil", "Acessórios"].map(
                  (item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-amber-900 cursor-pointer" onChange={() => toggleFilter(item)} checked={selectedFilters.includes(item)} />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          {/* PREÇO */}
          <div className="mb-4">
            <button onClick={() => toggleSection("price")} className="flex justify-between w-full font-medium text-gray-800">
              Preço
              <ChevronDown size={18} className={`transition-transform ${openSection === "price" ? "rotate-180" : ""}`} />
            </button>

            {openSection === "price" && (
              <div className="mt-2 space-y-2 pl-1">
                {["Até R$50", "R$50 a R$150", "R$150 a R$300", "Acima de R$300"].map(
                  (item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-amber-900 cursor-pointer" onChange={() => toggleFilter(item)} checked={selectedFilters.includes(item)} />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          {/* MATERIAL */}
          <div>
            <button
              onClick={() => toggleSection("material")}
              className="flex justify-between w-full font-medium text-gray-800"
            >
              Material
              <ChevronDown size={18} className={`transition-transform ${openSection === "material" ? "rotate-180" : ""}`}
              />
            </button>

            {openSection === "material" && (
              <div className="mt-2 space-y-2 pl-1">
                {["Algodão", "Jeans", "Couro", "Poliéster"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input type="checkbox" className="w-4 h-4 accent-amber-900 cursor-pointer" onChange={() => toggleFilter(item)} checked={selectedFilters.includes(item)} />
                    <span className="text-sm text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Produtos recomendados
          </h2>

          {/* Grade de produtos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="group bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-gray-800 text-sm font-medium mt-3 group-hover:text-amber-900 transition">
                  {p.name}
                </h3>

                <p className="mt-1 text-lg font-bold text-amber-900">
                  R$ {p.price}
                </p>

                <button className="w-full mt-3 py-2 rounded-lg bg-amber-900 text-white text-sm font-medium hover:bg-amber-700 transition">
                  Ver detalhes
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
