"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";

const NavBar = () => {
  const { cantidadTotal } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isActive = (categoria: string) =>
    pathname === "/catalogo" &&
    searchParams.get("categoria") === categoria;
  const isRouteActive = (ruta: string) => pathname === ruta;

  return (
    <header id="navbar" className="fixed top-0 left-0 w-full px-6 py-4 flex items-center bg-[#E7E7E5] shadow-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-50">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
        <Image src="/Images/Logo-eNovaHome-.png" alt="Logo eNova Home" width={150} height={50} priority className="cursor-pointer" />
      </Link>

      {/* Botón hamburguesa (solo móvil) */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-auto flex flex-col gap-1 mt-2">
        <div className="relative w-6 h-6">
          <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-[#3E4234] transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-2"}`} />
          <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-[#3E4234] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-[#3E4234] transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-2"}`} />
        </div>
      </button>

      {/* Menú */}
      <nav className="hidden md:flex ml-auto flex-row gap-6 text-sm font-[var(--font-montserrat)] items-center mt-20">
        <Link href="/catalogo?categoria=MESACOMEDOR" className={isActive("MESACOMEDOR") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
          Mesa & Comedor
        </Link>
        <Link href="/catalogo?categoria=COCINA" className={isActive("COCINA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
          Cocina
        </Link>
        <Link href="/catalogo?categoria=BANO" className={isActive("BANO") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
          Baño
        </Link>
        <Link href="/catalogo?categoria=RECAMARA" className={isActive("RECAMARA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
          Recámara
        </Link>
        <Link href="/catalogo" className={isRouteActive("/catalogo") && !searchParams.get("categoria") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
          onClick={() => setMenuOpen(false)}>
          Catálogo
        </Link>
        <Link href="/nosotros" className={isRouteActive("/nosotros") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
          onClick={() => setMenuOpen(false)}>
          Nosotros
        </Link>
        <Link href="/contacto" className={isRouteActive("/contacto") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
          onClick={() => setMenuOpen(false)}>
          Contacto
        </Link>

        {/* Icono de búsqueda */}
        <div className="flex items-center flex-1">
          {searchOpen && (
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 px-4 py-2.5 mr-2 border border-[#D6D6CF] rounded-md text-base"
            />
          )}

          <button onClick={() => setSearchOpen(!searchOpen)} className="cursor-pointer">
            <img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto" />
          </button>
        </div>

        {/* Icono de carrito */}
        <a href="" className="relative">
          <img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto" />

          {cantidadTotal > 0 && (
            <span className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-red-500 text-white 
            text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cantidadTotal}
            </span>
          )}
        </a>
      </nav>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-[#E7E7E5] shadow-lg px-6 py-5 flex flex-col gap-4 z-50">
          <Link href="/catalogo?categoria=MESACOMEDOR" className={isActive("MESACOMEDOR") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
            onClick={() => setMenuOpen(false)}>Mesa & Comedor</Link>
          <Link href="/catalogo?categoria=COCINA" className={isActive("COCINA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
            onClick={() => setMenuOpen(false)}>
            Cocina
          </Link>
          <Link href="/catalogo?categoria=BANO" className={isActive("BANO") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
            onClick={() => setMenuOpen(false)}>
            Baño
          </Link>
          <Link href="/catalogo?categoria=RECAMARA" className={isActive("RECAMARA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
            onClick={() => setMenuOpen(false)}>
            Recámara
          </Link>
          <Link href="/catalogo" className={isRouteActive("/catalogo") && !searchParams.get("categoria")
            ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"} onClick={() => setMenuOpen(false)}>
            Catálogo
          </Link>
          <Link href="/nosotros" className={isRouteActive("/nosotros")
            ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"} onClick={() => setMenuOpen(false)}>
            Nosotros
          </Link>
          <Link href="/contacto" className={isRouteActive("/contacto")
            ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"} onClick={() => setMenuOpen(false)}>
            Contacto
          </Link>

          <div className="flex items-center pt-2">
            <div className="flex items-center flex-1">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="flex-1 min-w-0 px-4 py-2 border border-[#D6D6CF] rounded-md text-base mr-3"
                />
              )}

              <button onClick={() => setSearchOpen(!searchOpen)} className="cursor-pointer">
                <img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto" />
              </button>
            </div>

            <a href="" className="relative ml-3">
              <img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto" />
              {cantidadTotal > 0 && (
                <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cantidadTotal}
                </span>
              )}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;