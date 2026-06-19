"use client";

import { useState } from "react";
import CardCatalogos from "../components/CardCatalogos";
import { Playfair_Display, Montserrat } from "next/font/google";
import { productos } from "../data/productos";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function CatalogoPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("TODOS");

  const categoriasMap: Record<string, string[]> = {
    "TODOS": [],
    "MESA & COMEDOR": ["VASOS", "PLATOS", "CUBIERTOS", "VAJILLAS"],
    "COCINA": ["TERMOS", "YETIS", "CUCHILLOS", "SARTENES", "OLLAS"],
    "BAÑO": ["TOALLAS", "DISPENSADORES"],
    "RECAMARA": ["SÁBANAS", "COLCHAS", "COBIJAS", "ALMOHADAS"],
    "TEXTILES": [],
    "LIFESTYLE": []
  };

  const productosFiltrados = productos.filter((producto) => {
    if (categoriaSeleccionada === "TODOS") return true;

    const categorias = categoriasMap[categoriaSeleccionada] || [];

    return categorias.includes(producto.categoria);
  });


  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-[#E7E7E5] px-8 pt-12 pb-6 flex flex-col justify-start">
          <div className="space-y-4 text-left mt-15">
            <p className="text-sm font-semibold text-[#6B705C]">EXPLORA NUESTRO CATÁLOGO</p>
            <h1 className={`${playfair.className} text-4xl font-normal text-[#3E4234] leading-tight tracking-wide`}>
              Catálogo<br /> informativo
            </h1>

            <div className="flex items-center justify-start gap-2">
              <hr className="w-16 border-t-2 border-[#6B705C]" />
              <span className="w-2 h-2 rounded-full bg-[#6B705C]"></span>
            </div>

            <p className="text-[#6B705C] font-montserrat text-base">
              Descubre nuestra selección de<br /> productos pensados para crear<br />
              espacios que inspiran bienestar,<br /> armonía y estilo.
            </p>
            <div className="flex justify-start mt-4">
              <hr className="w-full max-w-md border-t border-[#3E4234]/20" />
            </div>

            <p className="text-sm font-semibold text-[#6B705C] mt-6">
              FILTRAR POR CATEGORÍA
            </p>
            <div className="flex flex-col space-y-2">
              <button onClick={() => setCategoriaSeleccionada("TODOS")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/cuadricula.png" alt="Todos" className="w-4 h-4" />
                  TODOS LOS PRODUCTOS
                </span>
                <span className="text-sm font-semibold">(18)</span>
              </button>

              <button onClick={() => setCategoriaSeleccionada("MESA & COMEDOR")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/plato.png" alt="Plato" className="w-4 h-4" />
                  MESA & COMEDOR
                </span>
                <span className="text-sm font-semibold">(4)</span>
              </button>

              <button onClick={() => setCategoriaSeleccionada("COCINA")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/cocina.png" alt="Cocina" className="w-4 h-4" />
                  COCINA
                </span>
                <span className="text-sm font-semibold">(4)</span>
              </button>

              <button onClick={() => setCategoriaSeleccionada("BAÑO")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/jabon.png" alt="Baño" className="w-4 h-4" />
                  BAÑO
                </span>
                <span className="text-sm font-semibold">(3)</span>
              </button>

              <button onClick={() => setCategoriaSeleccionada("RECAMARA")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/cama.png" alt="Recámara" className="w-4 h-4" />
                  RECÁMARA
                </span>
                <span className="text-sm font-semibold">(5)</span>
              </button>

              <button onClick={() => setCategoriaSeleccionada("TEXTILES")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/textil.png" alt="Textiles" className="w-4 h-4" />
                  TEXTILES
                </span>
                <span className="text-sm font-semibold">(5)</span>
              </button>

              <button onClick={() => setCategoriaSeleccionada("LIFESTYLE")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/regalo.png" alt="Lifestyle" className="w-4 h-4" />
                  LIFESTYLE
                </span>
                <span className="text-sm font-semibold">(2)</span>
              </button>
            </div>


            <div className="mt-10 px-4 sm:px-6 md:px-8 py-6 md:py-10 rounded-xl bg-[#E7E7E5] shadow-sm border border-[#3E4234]/15 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img src="/images/ramita.png" alt="Decorativo" className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0" />
              {/* Texto y botón */}
              <div className="flex flex-col space-y-3 text-center sm:text-left items-center sm:items-start">
                <h3 className={`${playfair.className} text-xl md:text-2xl font-normal text-[#3E4234]`}>
                  ¿Necesitas ayuda?
                </h3>
                <p className={`${montserrat.className} text-sm text-[#3E4234]`}>
                  Estamos aquí para asesorarte<br /> y ayudarte a elegir lo mejor<br /> para tu hogar.
                </p>
                <button className={`${montserrat.className} border border-[#3E4234]/30 text-[#3E4234] px-6 py-2 rounded-md uppercase tracking-wide 
                hover:bg-[#6B705C]  hover:text-white transition cursor-pointer w-full sm:w-auto`}>
                  Contáctanos
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenedor derecho de productos */}
        <CardCatalogos productos={productosFiltrados} />
      </div>
    </div>
  );
}