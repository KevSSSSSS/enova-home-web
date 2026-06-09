"use client";
import NavBar from "../components/NavBar";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function CatalogoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">
      {/* Header */}
      <NavBar />

      {/* Layout principal: sidebar y productos */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-[#E7E7E5] px-14 py-6 flex flex-col justify-center">
          <div className="space-y-4 text-left">
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
              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#6B705C] hover:text-white transition">
                <span className="flex items-center gap-1.5">
                  {/* Aquí puedes poner una imagen o SVG */}
                  <img src="/icons/all.png" alt="Todos" className="w-4 h-4" />
                  TODOS LOS PRODUCTOS
                </span>
                <span className="text-sm font-semibold">(18)</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#6B705C] hover:text-white transition">
                <span className="flex items-center gap-1.5">
                  <img src="/icons/comedor.png" alt="Comedor" className="w-4 h-4" />
                  MESA & COMEDOR
                </span>
                <span className="text-sm font-semibold">(4)</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#6B705C] hover:text-white transition">
                <span className="flex items-center gap-1.5">
                  <img src="#" alt="Cocina" className="w-4 h-4" />
                  COCINA
                </span>
                <span className="text-sm font-semibold">(4)</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#6B705C] hover:text-white transition">
                <span className="flex items-center gap-1.5">
                  <img src="#" alt="Baño" className="w-4 h-4" />
                  BAÑO
                </span>
                <span className="text-sm font-semibold">(3)</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#6B705C] hover:text-white transition">
                <span className="flex items-center gap-1.5">
                  <img src="#" alt="Recámara" className="w-4 h-4" />
                  RECÁMARA
                </span>
                <span className="text-sm font-semibold">(5)</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#6B705C] hover:text-white transition">
                <span className="flex items-center gap-1.5">
                  <img src="#" alt="Textiles" className="w-4 h-4" />
                  TEXTILES
                </span>
                <span className="text-sm font-semibold">(5)</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#6B705C] hover:text-white transition">
                <span className="flex items-center gap-1.5">
                  <img src="#" alt="Lifestyle" className="w-4 h-4" />
                  LIFESTYLE
                </span>
                <span className="text-sm font-semibold">(2)</span>
              </button>
            </div>


            <div className="px-8 py-6 rounded-xl bg-[#E7E7E5] text-left space-y-3 shadow-sm border border-[#3E4234]/15">
              <h3 className={`${playfair.className} text-2xl font-normal text-[#3E4234]`}>
                ¿Necesitas ayuda?
              </h3>
              <p className="text-sm text-[#3E4234]">
                Estamos aquí para asesorarte<br /> y ayudarte a elegir lo mejor<br /> para tu hogar.
              </p>
              <button className="border border-[#3E4234]/30 text-[#3E4234] px-6 py-2 rounded-md uppercase tracking-wide hover:bg-[#6B705C] hover:text-white transition">
                Contáctanos
              </button>
            </div>

          </div>
        </aside>

        {/* Contenedor derecho de productos//
        <main className="flex-grow grid sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {[
            { nombre: "Vaso Olivo Texturizado", categoria: "Vasos", img: "/Images/producto1.png" },
            { nombre: "Yeti Clásico 500 ml", categoria: "Termos", img: "/Images/producto2.png" },
            { nombre: "Dispensador Vidrio Verde", categoria: "Dispensadores", img: "/Images/producto3.png" },
          ].map((p, i) => (
            <div
              key={i}
              className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <img
                src={p.img}
                alt={p.nombre}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-lg font-bold mt-4">{p.nombre}</h2>
              <p className="text-sm text-[#6B705C]">{p.categoria}</p>
              <button className="mt-2 px-4 py-2 bg-[#6B705C] text-white rounded hover:bg-[#3E4234]">
                Ver detalle
              </button>
            </div>
          ))}
        </main>*/}
      </div>
    </div>
  );
}




