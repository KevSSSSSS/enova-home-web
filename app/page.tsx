import NavBar from "./components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234] font-[var(--font-montserrat)]">
      {/* Header */}
      <NavBar />

      {/* Banner */}
      <section className="grid md:grid-cols-2 gap-8 px-8 py-12 bg-[#FFFFFF] flex-grow">
        <div className="space-y-4">
          {/* Aquí usamos Playfair para el título */}
          <h2 className="text-3xl font-bold text-[#3E4234] font-[var(--font-playfair)]">
            Detalles que hacen la diferencia
          </h2>
          <p className="text-[#6B705C] font-[var(--font-montserrat)]">
            Todo lo que necesitas para crear el hogar que amas.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#3E4234] text-white px-4 py-2 rounded font-[var(--font-montserrat)]">
              Ver categorías
            </button>
            <button className="border border-[#3E4234] text-[#3E4234] px-4 py-2 rounded font-[var(--font-montserrat)]">
              Contáctanos
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src="/banner.jpg" alt="Espacio acogedor" className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Beneficios */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-12 bg-[#E7E7E5]">
        <div>
          <h3 className="font-semibold text-lg text-[#3E4234] font-[var(--font-playfair)]">
            Productos de calidad
          </h3>
          <p className="text-[#6B705C] font-[var(--font-montserrat)]">
            Seleccionamos lo mejor para tu hogar.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-[#3E4234] font-[var(--font-playfair)]">
            Diseño que inspira
          </h3>
          <p className="text-[#6B705C] font-[var(--font-montserrat)]">
            Piezas que transforman espacios y crean armonía.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-[#3E4234] font-[var(--font-playfair)]">
            Compra segura
          </h3>
          <p className="text-[#6B705C] font-[var(--font-montserrat)]">
            Tu información está protegida en cada paso.
          </p>
        </div>
      </section>
    </div>
  );
}

