"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isActive = (categoria: string) =>
    pathname === "/catalogo" &&
    searchParams.get("categoria") === categoria;

  return (
    <header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center bg-[#E7E7E5] shadow-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-50">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image src="/Images/Logo-eNovaHome-.png" alt="Logo eNova Home" width={150} height={50} priority className="cursor-pointer" />
      </Link>

      {/* Botón hamburguesa (solo móvil) */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-auto flex flex-col gap-1 mt-2">
        <span className="w-6 h-[2px] bg-[#3E4234]"></span>
        <span className="w-6 h-[2px] bg-[#3E4234]"></span>
        <span className="w-6 h-[2px] bg-[#3E4234]"></span>
      </button>

      {/* Menú */}
      <nav className="hidden md:flex ml-auto flex-row gap-6 text-sm font-[var(--font-montserrat)] items-center mt-20">
        <Link href="/catalogo?categoria=MESA%20%26%20COMEDOR" className={isActive("MESA%20%26%20COMEDOR") ? "text-[#6B705C]" : "hover:text-[#6B705C]"}>
          Mesa & Comedor
        </Link>
        <Link href="/catalogo?categoria=COCINA" className={isActive("COCINA") ? "text-[#6B705C]" : "hover:text-[#6B705C]"}>
          Cocina
        </Link>
        <Link href="/catalogo?categoria=BAÑO" className={isActive("BAÑO") ? "text-[#6B705C]" : "hover:text-[#6B705C]"}>
          Baño
        </Link>
        <Link href="/catalogo?categoria=RECAMARA" className={isActive("RECAMARA") ? "text-[#6B705C]" : "hover:text-[#6B705C]"}>
          Recámara
        </Link>
        <Link href="/catalogo" className="hover:text-[#6B705C]">
          Catálogo
        </Link>
        <Link href="/nosotros" className="hover:text-[#6B705C]">
          Nosotros
        </Link>
        <Link href="#" className="hover:text-[#6B705C]">Contacto</Link>

        {/* Icono de búsqueda */}
        <div className="flex items-center">
          {searchOpen && (
            <input
              type="text"
              placeholder="Buscar..."
              className="w-40 px-2 py-1 mr-2 border border-[#D6D6CF] rounded-md text-sm"
            />
          )}

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="cursor-pointer"
          >
            <img
              src="/Images/search-icon.png"
              alt="Buscar"
              className="h-5 w-auto"
            />
          </button>
        </div>

        {/* Icono de carrito */}
        <a href="">
          <img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto" />
        </a>
      </nav>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-[#E7E7E5] shadow-lg px-6 py-5 flex flex-col gap-4 z-50">
          <Link href="/catalogo?categoria=MESA%20%26%20COMEDOR">Mesa & Comedor</Link>
          <Link href="/catalogo?categoria=COCINA">Cocina</Link>
          <Link href="/catalogo?categoria=BAÑO">Baño</Link>
          <Link href="/catalogo?categoria=RECAMARA">Recámara</Link>
          <a href="/catalogo" className="hover:text-[#6B705C]">Catálogo</a>
          <a href="/nosotros" className="hover:text-[#6B705C]">Nosotros</a>
          <a href="#" className="hover:text-[#6B705C]">Contacto</a>

          <div className="flex items-center gap-5 pt-2">
            <div className="flex items-center">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-32 px-2 py-1 mr-2 border border-[#D6D6CF] rounded-md text-sm"
                />
              )}

              <button onClick={() => setSearchOpen(!searchOpen)} className="cursor-pointer">
                <img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto" />
              </button>
            </div>

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