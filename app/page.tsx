"use client";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const imagenesCarrusel = [
    "/Images/ComedorVerde.png",
    "/Images/Categoria1.png",
    "/Images/Categoria2.png",
    "/Images/Categoria3.png",
    "/Images/Categoria4.png",
  ];

  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) =>
        prev === imagenesCarrusel.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">

      {/* Banner */}
      <section className="grid md:grid-cols-2 gap-0 px-0 pt-14 bg-[#FFFFFF] flex-grow items-center">
        {/* Texto a la izquierda */}
        <div className="space-y-6 px-6 md:px-12 text-center md:text-left pt-12 md:pt-0">
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
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start mb-8">
            <Link href="/categorias">
              <button className="w-[240px] h-[52px] bg-[#3E4234] text-white rounded uppercase tracking-wide hover:bg-[#6B705C] transition cursor-pointer">
                VER CATEGORÍAS
              </button>
            </Link>

            <Link href="/contacto">
              <button className="w-[240px] h-[52px] border border-[#3E4234] text-[#3E4234] rounded uppercase tracking-wide hover:bg-[#6B705C] hover:text-white transition cursor-pointer">
                CONTÁCTANOS
              </button>
            </Link>
          </div>
        </div>

        {/* Carrusel de imágenes a la derecha */}
        <div className="relative w-full h-64 sm:h-80 md:h-full overflow-hidden group">
          <img src={imagenesCarrusel[imagenActual]} alt="Comedor acogedor eNova Home"
            className="w-full h-full object-cover brightness-110 contrast-105 saturate-115 sepia-[0.08] transition-opacity duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>

          {/* Flecha izquierda */}
          <button onClick={() => setImagenActual((prev) => prev === 0 ? imagenesCarrusel.length - 1 : prev - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white text-6xl hover:scale-110 transition 
            cursor-pointer select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            ‹
          </button>

          {/* Flecha derecha */}
          <button onClick={() => setImagenActual((prev) => prev === imagenesCarrusel.length - 1 ? 0 : prev + 1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white text-6xl hover:scale-110 transition
            cursor-pointer select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            ›
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {imagenesCarrusel.map((_, index) => (
              <button key={index} onClick={() => setImagenActual(index)} className={`w-3 h-3 rounded-full transition ${imagenActual === index
                  ? "bg-[#3E4234] scale-110" : "bg-white/80 hover:bg-white"}`}/>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-8 py-12 bg-[#E7E7E5] text-center">
        <div className="flex flex-col items-center space-y-3 md:border-r border-[#C8C8C8] last:md:border-r-0">
          <img src="/Images/calidad.png" alt="Calidad" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Productos de calidad
          </h3>
          <p className="text-[#6B705C]">
            Seleccionamos lo mejor para<br />tu hogar.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 md:border-r border-[#C8C8C8] last:md:border-r-0">
          <img src="/Images/diseno.png" alt="Diseño" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Diseño que inspira
          </h3>
          <p className="text-[#6B705C]">
            Piezas que transforman<br />espacios y crean armonía.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 md:border-r border-[#C8C8C8] last:md:border-r-0">
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