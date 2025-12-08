"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type NavBarProps = { isMobile?: boolean; onLinkClick?: () => void; };

export const NavBar: React.FC<NavBarProps> = ({ isMobile, onLinkClick }) => {
  const pathname = usePathname();

  const items = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Cadastro", href: "/cadastro" },
    { id: 3, label: "Services", href: "/services" },
    { id: 4, label: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`flex justify-center ${isMobile ? "w-full" : ""}`} >
      <ul className={`relative flex items-center ${isMobile ? "flex-col space-y-3" : "space-x-6 bg-[#d9d9d9] px-5 py-2 rounded-full shadow-inner"}`}>
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.id} className="relative px-3 py-0.5">
              {/* Bolha branca animada */}
              {!isMobile && isActive && (
                <motion.div layoutId="active-pill" className="absolute inset-0 bg-white rounded-full shadow" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}

              <Link href={item.href} onClick={() => onLinkClick?.()} className={`relative z-10 px-4 py-1 font-medium text-base transition ${isMobile ? "text-gray-800" : isActive ? "text-black font-semibold" : "text-black/60"}`}>
                {item.label}
              </Link>
            </li>
          );
          
        })}
      </ul>
    </nav>
  );
};
