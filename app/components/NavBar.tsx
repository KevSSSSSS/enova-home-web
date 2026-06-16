"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center bg-[#E7E7E5] shadow-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-50">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image src="/Images/Logo-eNovaHome-.png" alt="Logo eNova Home" width={150} height={50} priority className="cursor-pointer"/>
      </Link>

      {/* Botón hamburguesa (solo móvil) */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-auto flex flex-col gap-1 mt-2">
        <span className="w-6 h-[2px] bg-[#3E4234]"></span>
        <span className="w-6 h-[2px] bg-[#3E4234]"></span>
        <span className="w-6 h-[2px] bg-[#3E4234]"></span>
      </button>

      {/* Menú escritorio (sin cambios visuales) */}
      <nav className="hidden md:flex ml-auto flex-row gap-6 text-sm font-[var(--font-montserrat)] items-center mt-20">
        <a href="#" className="hover:text-[#6B705C]">Mesa & Comedor</a>
        <a href="#" className="hover:text-[#6B705C]">Cocina</a>
        <a href="#" className="hover:text-[#6B705C]">Baño</a>
        <a href="#" className="hover:text-[#6B705C]">Recámara</a>
        <a href="/catalogo" className="hover:text-[#6B705C]">Catálogo</a>
        <a href="/nosotros" className="hover:text-[#6B705C]">Nosotros</a>
        <a href="#" className="hover:text-[#6B705C]">Contacto</a>

        {/* Icono de búsqueda */}
        <a href="">
          <img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto"/>
        </a>

        {/* Icono de carrito */}
        <a href="">
          <img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto"/>
        </a>
      </nav>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-[#E7E7E5] shadow-lg px-6 py-5 flex flex-col gap-4 z-50">
          <a href="#" className="hover:text-[#6B705C]">Mesa & Comedor</a>
          <a href="#" className="hover:text-[#6B705C]">Cocina</a>
          <a href="#" className="hover:text-[#6B705C]">Baño</a>
          <a href="#" className="hover:text-[#6B705C]">Recámara</a>
          <a href="/catalogo" className="hover:text-[#6B705C]">Catálogo</a>
          <a href="/nosotros" className="hover:text-[#6B705C]">Nosotros</a>
          <a href="#" className="hover:text-[#6B705C]">Contacto</a>

          <div className="flex items-center gap-5 pt-2">
            <a href="">
              <img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto"/>
            </a>

            <a href="">
              <img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto"/>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;