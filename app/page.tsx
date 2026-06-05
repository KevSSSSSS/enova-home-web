import NavBar from "./components/NavBar";
import { Playfair_Display } from "next/font/google";

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
        <div className="space-y-6 px-12">
          {/* añadimos fuente playfair.className */}
          <h2 className={`${playfair.className} text-5xl font-bold leading-tight text-[#3E4234]`}>
            Detalles que<br /> hacen la diferencia
          </h2>
          <hr className="w-16 border-t-2 border-[#3E4234]" />
          <p className="text-lg text-[#6B705C]">
            Todo lo que necesitas para<br /> crear el hogar que amas.
          </p>
          <div className="flex gap-6">
            <button className="bg-[#3E4234] text-white px-6 py-3 rounded uppercase tracking-wide hover:bg-[#6B705C] transition">
              VER CATEGORÍAS
            </button>
            <button className="border border-[#3E4234] text-[#3E4234] px-6 py-3 rounded uppercase tracking-wide hover:bg-[#6B705C] hover:text-white transition">
              CONTÁCTANOS
            </button>
          </div>
        </div>

        <div className="relative w-full h-full">
          <img
            src="/Images/ComedorVerde.png"
            alt="Comedor acogedor eNova Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="grid md:grid-cols-4 gap-8 px-8 py-12 bg-[#E7E7E5] text-center">
        <div className="flex flex-col items-center space-y-3 border-r border-[#3E4234] last:border-r-0">
          <img src="/Icons/calidad.png" alt="Calidad" className="w-12 h-12" />
          {/* Montserrat fuente global */}
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Productos de calidad
          </h3>
          <p className="text-[#6B705C]">Seleccionamos lo mejor para<br />tu hogar.</p>
        </div>

        <div className="flex flex-col items-center space-y-3 border-r border-[#3E4234] last:border-r-0">
          <img src="/Icons/diseno.png" alt="Diseño" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Diseño que inspira
          </h3>
          <p className="text-[#6B705C]">Piezas que transforman<br />espacios y crean armonía.</p>
        </div>

        <div className="flex flex-col items-center space-y-3 border-r border-[#3E4234] last:border-r-0">
          <img src="/Icons/seguridad.png" alt="Seguridad" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Compra segura
          </h3>
          <p className="text-[#6B705C]">Tu información está protegida<br />en cada paso.</p>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <img src="/Icons/inspiracion.png" alt="Inspiración" className="w-12 h-12" />
          <h3 className="font-semibold text-lg text-[#3E4234]">
            Inspiración para tu hogar
          </h3>
          <p className="text-[#6B705C]">Ideas y productos para cada<br />rincón de tu vida.</p>
        </div>
      </section>

    </div>
  );
}


