import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--brand-footer)] text-amber-50 px-4 py-8">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-sm md:text-base">
        {/* Coluna 1 */}
        <div>
          <h3 className="text-2xl font-bold mb-3">CIDADES</h3>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            Caíco, RN
          </Link>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            São João do Sabugi, RN
          </Link>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            Ipueira, RN
          </Link>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            São Mamede, PB
          </Link>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            Patos, PB
          </Link>
        </div>

        {/* Coluna 2 */}
        <div>
          <h3 className="text-2xl font-bold mb-3">REDES SOCIAIS</h3>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            Youtube
          </Link>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            Facebook
          </Link>
          <Link href="#" className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
            Instagram
          </Link>
        </div>

        {/* Coluna 3 */}
        <div>
          <h3 className="text-2xl font-bold mb-3">CONTACT</h3>
          <a
            href="mailto:clodoaldobritodev@gmail.com"
            className="block mb-2 hover:text-[var(--brand-h-text)] hover:font-bold transition-colors"
          >
            clodoaldobritodev@gmail.com
          </a>
        </div>
      </div>

      <hr className="my-8 border-t border-text-amber-50" />

      <div className="text-center text-sm font-semibold tracking-wide text-amber-50 bg-[var(--bg-footer-color)] py-4">
        Developed by{" "}
        <a href="https://github.com/estuda-neto" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-h-text)] hover:font-bold transition-colors">
          Neto
        </a>
      </div>
    </footer>
  );
};
