"use client";
import NavBar from "../components/NavBar";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function NosotrosPage() {
  return (
    <div className="pt-[140px] min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">
      {/* Header */}
      <NavBar />

      {/* Banner */}
      <section className="grid md:grid-cols-2 gap-0 px-0 py-0 bg-[#FFFFFF] flex-grow items-center">
        {/* Texto a la izquierda */}
        <div className="space-y-6 px-6 md:px-12 text-center md:text-left">
          {/* Ramita decorativa arriba del título */}
          <img
            src="/Images/ramita.png"
            alt="Decoración ramita"
            className="w-16 h-16 mb-0 mx-auto md:mx-0"
          />

          <h2 className={`${playfair.className} text-4xl md:text-5xl font-normal text-[#3E4234] leading-tight`}>
            ¿Por qué elegir
            <br />
            <span className="text-[#6B705C]">eNova</span> Home?
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <hr className="w-16 border-t-2 border-[#3E4234]" />
            <span className="w-2 h-2 rounded-full bg-[#3E4234]"></span>
          </div>

          <p className="text-base md:text-lg text-[#6B705C]">
            Más que una tienda, somos tu aliado para crear<br /> espacios únicos. Estos son los Beneficios de<br />
            elegirnos para tu hogar.
          </p>
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
          <img src="/Images/inspiracion.png" alt="Calidad" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Todo para tu hogar,<br /> en un solo lugar
          </h3>
          <p className="text-[#6B705C]">
            Encuentra todo lo que necesitas<br />para cada espacio de tu hogar,<br /> sin salir de tu casa.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 md:border-r border-[#3E4234] last:md:border-r-0">
          <img src="/Images/calidad.png" alt="Diseño" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Productos de calidad<br /> y diseño
          </h3>
          <p className="text-[#6B705C]">
            Seleccionamos cuidadosamente<br />cada producto por su calidad,<br /> durabilidad y estilo.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 md:border-r border-[#3E4234] last:md:border-r-0">
          <img src="/Images/bolso.png" alt="Seguridad" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Compra fácil, segura<br /> y confiable
          </h3>
          <p className="text-[#6B705C]">
            Tu información y compra están<br /> protegidas en cada paso del<br /> proceso.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <img src="/Images/corazon.png" alt="Inspiración" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Inspiración para cada<br /> rincón de tu hogar
          </h3>
          <p className="text-[#6B705C]">
            Te ayudamos a transformar tu hogar<br />con ideas, tendencias y productos<br />que enamoran.
          </p>
        </div>
      </section>

      {/* Imagen decorativa debajo */}
      <div className="flex justify-center -mt-10 mb-0  bg-[#E7E7E5]">
        <img src="/Images/footer.png" alt="Decoración final" className="w-full max-w-lg object-contain"/>
      </div>
    </div>
  );
}