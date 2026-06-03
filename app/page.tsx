export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center shadow-md bg-[#E7E7E5]">
        <h1 className="text-2xl font-bold text-[#3E4234]">eNova HOME</h1>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-[#6B705C]">Mesa & Comedor</a>
          <a href="#" className="hover:text-[#6B705C]">Cocina</a>
          <a href="#" className="hover:text-[#6B705C]">Baño</a>
          <a href="#" className="hover:text-[#6B705C]">Recámara</a>
          <a href="#" className="hover:text-[#6B705C]">Catálogo</a>
          <a href="#" className="hover:text-[#6B705C]">Nosotros</a>
          <a href="#" className="hover:text-[#6B705C]">Contacto</a>
        </nav>
      </header>

      {/* Banner */}
      <section className="grid md:grid-cols-2 gap-8 px-8 py-12 bg-[#FFFFFF] flex-grow">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#3E4234]">Detalles que hacen la diferencia</h2>
          <p className="text-[#6B705C]">Todo lo que necesitas para crear el hogar que amas.</p>
          <div className="flex gap-4">
            <button className="bg-[#3E4234] text-white px-4 py-2 rounded">Ver categorías</button>
            <button className="border border-[#3E4234] text-[#3E4234] px-4 py-2 rounded">Contáctanos</button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src="/banner.jpg" alt="Espacio acogedor" className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Beneficios */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-12 bg-[#E7E7E5]">
        <div>
          <h3 className="font-semibold text-lg text-[#3E4234]">Productos de calidad</h3>
          <p className="text-[#6B705C]">Seleccionamos lo mejor para tu hogar.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-[#3E4234]">Diseño que inspira</h3>
          <p className="text-[#6B705C]">Piezas que transforman espacios y crean armonía.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-[#3E4234]">Compra segura</h3>
          <p className="text-[#6B705C]">Tu información está protegida en cada paso.</p>
        </div>
      </section>
    </div>
  );
}
