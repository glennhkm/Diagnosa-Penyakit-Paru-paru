import { ScrollToSection } from "@/utils/helpers/scrollToSection";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div
      className={`bg-[#151515] shadow-balance shadow-slate-400 fixed top-8 left-1/2 -translate-x-1/2 pr-4 rounded-3xl flex gap-10 text-sm z-40 text-white justify-center transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center cursor-pointer hover:scale-105 duration-150" onClick={() => ScrollToSection("hero")}>
        <div className="w-10 h-10 relative">
          <Image src="/assets/images/logo.png" alt="logo" fill sizes="4vw"/>
        </div>
        <p className="font-bold">PulmoHealth</p>
      </div>
      <button className="hover:scale-110 duration-150" onClick={() => ScrollToSection("tentang")}>Tentang</button>
      <button className="hover:scale-110 duration-150" onClick={() => ScrollToSection("diagnosa")}>Cek Diagnosa</button>
    </div>
  );
};
