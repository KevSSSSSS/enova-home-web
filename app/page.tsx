"use client";
import NavBar from "./components/NavBar";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">
      {/* Header */}
      <NavBar />

      {/* Banner */}
      <section className="grid md:grid-cols-2 gap-0 px-0 py-0 bg-[#FFFFFF] flex-grow items-center">
        {/* Texto a la izquierda */}
        <div className="space-y-6 px-6 md:px-12 text-center md:text-left">
          {/* Ramita decorativa arriba del título */}
          <img src="/Images/ramita.png" alt="Decoración ramita" className="w-16 h-16 mb-0 mx-auto md:mx-0" />

          <h2 className={`${playfair.className} text-4xl md:text-5xl font-normal text-[#3E4234] leading-tight`}>
            Detalles que<br /> hacen la{" "}
            <span className="text-[#6B705C]">diferencia</span>
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <hr className="w-16 border-t-2 border-[#3E4234]" />
            <span className="w-2 h-2 rounded-full bg-[#3E4234]"></span>
          </div>

          <p className="text-base md:text-lg text-[#6B705C]">
            Todo lo que necesitas para<br /> crear el hogar que amas.
          </p>

          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link href="/categorias">
              <button className="bg-[#3E4234] text-white px-6 py-3 rounded uppercase tracking-wide hover:bg-[#6B705C] transition cursor-pointer">
                VER CATEGORÍAS
              </button>
            </Link>
            <button className="border border-[#3E4234] text-[#3E4234] px-6 py-3 rounded uppercase tracking-wide hover:bg-[#6B705C] hover:text-white transition cursor-pointer">
              CONTÁCTANOS
            </button>
          </div>
        </div>

        {/* Imagen a la derecha */}
        <div className="relative w-full h-64 sm:h-80 md:h-full">
          <img
            src="/Images/ComedorVerde.png"
            alt="Comedor acogedor eNova Home"
            className="w-full h-full object-cover brightness-110 contrast-105 saturate-115 sepia-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-8 py-12 bg-[#E7E7E5] text-center">
        <div className="flex flex-col items-center space-y-3 md:border-r border-[#3E4234] last:md:border-r-0">
          <img src="/Images/calidad.png" alt="Calidad" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Productos de calidad
          </h3>
          <p className="text-[#6B705C]">
            Seleccionamos lo mejor para<br />tu hogar.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 md:border-r border-[#3E4234] last:md:border-r-0">
          <img src="/Images/diseno.png" alt="Diseño" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Diseño que inspira
          </h3>
          <p className="text-[#6B705C]">
            Piezas que transforman<br />espacios y crean armonía.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 md:border-r border-[#3E4234] last:md:border-r-0">
          <img src="/Images/seguridad.png" alt="Seguridad" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Compra segura
          </h3>
          <p className="text-[#6B705C]">
            Tu información está protegida<br />en cada paso.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <img src="/Images/inspiracion.png" alt="Inspiración" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Inspiración para tu hogar
          </h3>
          <p className="text-[#6B705C]">
            Ideas y productos para cada<br />rincón de tu vida.
          </p>
        </div>
      </section>
    </div>
  );
}