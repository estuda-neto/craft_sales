"use client";

import { AlignJustifyIcon, HouseIcon, LockIcon, MessageCircleIcon, PaletteIcon, SettingsIcon, ShoppingBasketIcon, SwatchBookIcon, TruckIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { useMenu } from "@/src/contexts/manager_context";

type NavItem = { icon: ReactElement; title: string; url: string; isAdmin?: boolean; isArtisan?: boolean; };

export const MenuAside: React.FC = () => {
  const { menuActive, setMenuActive } = useMenu();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems: NavItem[] = [
    { icon: <HouseIcon size={24} />, title: "Manager", url: "/manager" },
    { icon: <ShoppingBasketIcon size={24} />, title: "Carrinho", url: "/car" },
    { icon: <UserIcon size={24} />, title: "Perfil", url: "/profile" },
    { icon: <TruckIcon size={24} />, title: "Pedidos", url: "/orders" },
    { icon: <MessageCircleIcon size={24} />, title: "Mensagens", url: "/messages", isArtisan: true },
    { icon: <PaletteIcon size={24} />, title: "Ateliê Digital", url: "/atelie", isArtisan: true },
    { icon: <SettingsIcon size={24} />, title: "Settings", url: "/settings", isAdmin: true },
  ];

  return (
    <aside className={`${menuActive ? "w-12" : "w-72"} h-full bg-(--brand-400) text-white flex flex-col transition-all duration-200 overflow-x-hidden relative z-10`}>
      <button type="button" onClick={() => setMenuActive(!menuActive)} className="w-14 h-14 flex justify-center items-center text-white hover:bg-(--brand-500) transition-colors duration-300 mt-3 ml-3 rounded-lg">
        <AlignJustifyIcon size={28} />
      </button>

      {/* Lista */}
      <ul className="flex flex-col mt-4 gap-2 flex-1">
        {navItems.map((item, index) => (
          <li key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`relative rounded-r-3xl transition-all duration-300  ${hoveredIndex === index ? "bg-white/70" : ""}`}>
            <Link href={item.url} className={`flex items-center py-3 transition-colors duration-200 ${hoveredIndex === index ? "text-amber-950" : "text-white"}`}>
              <span className="flex justify-center items-center min-w-[60px] h-[60px]">
                {item.icon}
              </span>
              <span className={`whitespace-nowrap text-base font-medium transition-opacity duration-300 ${menuActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {item.title}
              </span>

              {/* Ícone do admin */}
              {item.isAdmin && !menuActive && (<LockIcon size={18} className="ml-2" color="#D1003B" />)}
              {/* Ícone do artesao */}
              {item.isArtisan && !menuActive && (<SwatchBookIcon size={18} className="ml-2" color="#804936" />)}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
