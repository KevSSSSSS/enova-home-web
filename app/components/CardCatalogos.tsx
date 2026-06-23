"use client";

import { Playfair_Display, Montserrat } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Producto = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagenPrincipal: string;
  imagenes: string[];
  descripcion: string;
  especificaciones: {
    nombre: string;
    valor: string;
  }[];
};

interface Props {
  productos: Producto[];
}

export default function CardCatalogos({ productos }: Props) {
  return (
    <main className="flex-grow grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-10 p-6 mt-20 items-start">

      {productos?.map((p) => (
        <div key={p.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition max-w-[230px] mx-auto min-h-[320px]">

          {/* Imagen */}
          <img src={p.imagenPrincipal} alt={p.nombre} className="w-full h-48 object-cover" />

          {/* Info */}
          <div className="px-4 pt-2 pb-2">

            <div className="min-h-[80px]">
              <h2 className={`${playfair.className} text-[1.1rem] font-medium leading-tight mb-1`}>
                {p.nombre}
              </h2>

              <p className={`${montserrat.className} text-sm text-[#6B705C] uppercase tracking-wide`}>
                {p.categoria}
              </p>
            </div>

            <Link href={`/productos/${p.id}`} className={`${montserrat.className} mt-1 text-sm font-medium
            text-[#6B705C] hover:text-[#3E4234] flex justify-between items-center transition`}>
              <span>Ver detalle</span>
              <span className="text-lg">→</span>
            </Link>

          </div>
        </div>
      ))}

      {/* BANNER INFERIOR */}
      <div className="col-span-full mt-4">
        <div className="bg-[#F5F5F0] border border-[#E2E2DD] rounded-xl px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Texto */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <img src="/images/ramita.png" alt="Decorativo" className="w-10 h-10" />

            <p className={`${playfair.className} text-xl lg:text-2xl text-[#3E4234]`}>
              Diseño, calidad y armonía
              <br />
              en cada detalle de tu hogar.
            </p>
          </div>

          {/* Beneficios */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3 md:pr-6 md:border-r border-[#D6D6CF]">
              <img src="/icons/calidad2.png" className="w-8 h-8" />
              <p className={`${montserrat.className} text-xs text-[#3E4234]`}>
                Productos seleccionados
                <br />
                con altos estándares
              </p>
            </div>

            <div className="flex items-center gap-3 md:pr-6 md:border-r border-[#D6D6CF]">
              <img src="/icons/diseno2.png" className="w-8 h-8" />
              <p className={`${montserrat.className} text-xs text-[#3E4234]`}>
                Diseño que transforma
                <br />
                tus espacios
              </p>
            </div>

            <div className="flex items-center gap-3">
              <img src="/icons/asesoria.png" className="w-8 h-8" />
              <p className={`${montserrat.className} text-xs text-[#3E4234]`}>
                Asesoría personalizada
                <br />
                para tu hogar
              </p>
            </div>
          </div>

          {/* Botón */}
          <div className="flex flex-col items-center lg:items-start">
            <button className={`${montserrat.className} bg-[#6B705C] text-white text-xs uppercase tracking-wider font-medium px-8 h-[42px] rounded-md hover:bg-[#5C614E] transition`}>
              SOLICITAR INFORMACIÓN
            </button>

            <p className={`${montserrat.className} text-xs text-[#3E4234] mt-2`}>
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