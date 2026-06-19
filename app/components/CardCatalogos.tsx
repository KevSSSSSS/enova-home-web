"use client";
import { Playfair_Display, Montserrat } from "next/font/google";
import Link from "next/link";
import { productos } from "../data/productos";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function CardCatalogos() {
  return (
    /*<main className="flex-grow grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-6 mt-20">
      {[
        { nombre: `Vaso Olivo\nTexturizado`, categoria: "VASOS", img: "/images/Producto1.png" },
        { nombre: `Plato Llano\nCerámica Arena`, categoria: "PLATOS", img: "/images/Producto2.png" },
        { nombre: `Cubiertos Brisa\nDorado Mate`, categoria: "CUBIERTOS", img: "/images/Producto3.png" },
        { nombre: "Vajilla Aura\n 16 Piezas", categoria: "VAJILLAS", img: "/images/Producto4.png" },
        { nombre: "Termo Térmico\n Acero Inoxidable", categoria: "TERMOS", img: "/images/Producto5.png" },
        { nombre: "Yeti Clásico\n 500 ml", categoria: "YETIS", img: "/images/Producto6.png" },
        { nombre: "Cuchillo Chef\n Acero Alemán", categoria: "CUCHILLOS", img: "/images/Producto7.png" },
        { nombre: "Sartén Antiadherente\n 24 cm", categoria: "SARTENES", img: "/images/Producto8.png" },
        { nombre: "Olla Antiadherente\n 24 cm / 4.5 L", categoria: "OLLAS", img: "/images/Producto9.png" },
        { nombre: "Toalla Premium\n Algodón Egipcio", categoria: "TOALLAS", img: "/images/Producto10.png" },
        { nombre: "Dispensador de\n Vidrio Verde", categoria: "DISPENSADORES", img: "/images/Producto11.png" },
        { nombre: "Sábanas 100%\n Algodón Percal", categoria: "SÁBANAS", img: "/images/Producto12.png" },
        { nombre: "Colcha Acolchada\n Reversible", categoria: "COLCHAS", img: "/images/Producto13.png" },
        { nombre: "Cobija Ligera\n Extra Suave", categoria: "COBIJAS", img: "/images/Producto14.png" },
        { nombre: "Almohada Comfort\n Soporte Medio", categoria: "ALMOHADAS", img: "/images/Producto15.png" },
      ].map((p, i) => (*/

    <main className="flex-grow grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-6 mt-20">
      {productos.map((p) => (

        <div key={p.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition max-w-[230px] mx-auto">
          <img src={p.imagenPrincipal} alt={p.nombre} className="w-full h-48 object-cover" />
          <div className="px-4 py-3">
            <h2 className={`${playfair.className} text-[1.1rem] font-medium`}>{p.nombre}</h2>
            <p className={`${montserrat.className} text-sm text-[#6B705C] uppercase tracking-wide`}>{p.categoria}</p>
            <Link
              href={`/productos/${p.id}`}
              className={`${montserrat.className} mt-2 text-sm font-medium text-[#6B705C] hover:text-[#3E4234] flex justify-between items-center w-full transition`}
            >
              <span>Ver detalle</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      ))}

      {/* Banner inferior */}
      <div className="col-span-full mt-12">
        <div
          className="bg-[#F5F5F0] border border-[#E2E2DD] rounded-xl px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
          {/* Texto principal */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <img src="/images/ramita.png" alt="Decorativo" className="w-10 h-10 flex-shrink-0" />

            <p className={`${playfair.className} text-xl lg:text-2xl leading-tight text-[#3E4234]`}>
              Diseño, calidad y armonía
              <br />
              en cada detalle de tu hogar.
            </p>
          </div>

          {/* Beneficios */}
          <div
            className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3 md:pr-6 md:border-r border-[#D6D6CF]">
              <img src="/icons/calidad2.png" alt="Productos" className="w-8 h-8" />
              <p className={`${montserrat.className} text-xs text-[#3E4234] leading-5`}>
                Productos seleccionados
                <br />
                con altos estándares
              </p>
            </div>

            <div className="flex items-center gap-3 md:pr-6 md:border-r border-[#D6D6CF]">
              <img src="/icons/diseno2.png" alt="Diseño" className="w-8 h-8" />
              <p className={`${montserrat.className} text-xs text-[#3E4234] leading-5`}>
                Diseño que transforma
                <br />
                tus espacios
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/asesoria.png" alt="Asesoría" className="w-8 h-8" />
              <p className={`${montserrat.className} text-xs text-[#3E4234] leading-5`}>
                Asesoría personalizada
                <br />
                para tu hogar
              </p>
            </div>
          </div>

          {/* Boton derecho */}
          <div className="flex flex-col items-center lg:items-start">
            <button
              className={`${montserrat.className} bg-[#6B705C] text-white text-xs uppercase tracking-wider 
                  font-medium px-8 h-[42px] rounded-md hover:bg-[#5C614E] transition cursor-pointer`}>
              SOLICITAR INFORMACIÓN
            </button>

            <p className={`${montserrat.className} text-xs text-[#3E4234] mt-2 lg:text-leftleading-4`}>
              Te ayudamos a elegir lo mejor
              <br />
              para tu hogar.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}