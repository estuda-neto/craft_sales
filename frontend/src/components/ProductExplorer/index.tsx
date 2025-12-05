"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Product } from "@/src/utils/datatypes/products";
import { BASE_URL_BACKEND } from "@/src/app/api/base_url";
import { toast } from "react-toastify";
import Image from "next/image";
import { Loader } from "../shared/Loader";

export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [openSection, setOpenSection] = useState<string | null>("category");

  const toggleFilter = (value: string) => { setSelectedFilters((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]); };
  const toggleSection = (section: string) => { setOpenSection(openSection === section ? null : section); };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL_BACKEND}/products/filter/checked`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        toast.info(`Erro ao carregar produtos: ${error}`);
      } finally {
        setLoading(false); // <-- encerrou o carregamento
      }
    })();
  }, []);

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
              <ChevronDown size={18} className={`transition-transform ${openSection === "category" ? "rotate-180" : ""}`} />
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
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
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

          {loading ? (<Loader />) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.productId} className="group bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="rounded-lg overflow-hidden">
                    <Image src={`http://localhost:3000${p.image}`} width={200} height={200} alt={p.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-gray-800 text-sm font-medium mt-3 group-hover:text-amber-900 transition">{p.name}</h3>
                  <p className="mt-1 text-lg font-bold text-amber-900">R$ {p.price}</p>

                  <Link href={`/products/${p.productId}`} className="w-full mt-3 p-2 rounded-lg bg-amber-900 text-white text-sm font-medium hover:bg-amber-700 transition">
                    Ver detalhes
                  </Link>
                </div>
              ))}
            </div>
          )}


        </section>
      </div>
    </div>
  );
}
