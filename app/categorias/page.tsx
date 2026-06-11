"use client";
import Image from "next/image";
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

export default function CategoriasPage() {
    return (
        <main className="bg-[#E7E7E5] min-h-screen px-8 py-10">
            {/* Encabezado de Categorías */}
            <div className="space-y-6 px-6 md:px-12 text-center">
                {/* Ramita decorativa arriba del título */}
                <img
                    src="/Images/ramita.png"
                    alt="Decoración ramita"
                    className="w-16 h-16 mb-0 mx-auto"
                />

                <div className="flex items-center justify-center gap-3">
                    <hr className="w-16 border-t-2 border-[#3E4234]" />
                    <span className="w-2 h-2 rounded-full bg-[#3E4234]"></span>
                </div>

                <h2
                    className={`${playfair.className} text-4xl md:text-5xl font-normal text-[#3E4234] leading-tight`}
                >
                    Categorías para<br /> cada espacio
                </h2>

                <p className="text-base md:text-lg text-[#6B705C] max-w-2xl mx-auto">
                    Explora nuestra selección de productos diseñados para inspirar armonía,
                    funcionalidad y estilo en cada rincón de tu hogar.
                </p>
            </div>


            {/* Grid de categorías */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-10 px-6">
                {/* Mesa & Comedor */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                    <Image src="/icons/plato.png" alt="Mesa & Comedor" width={40} height={40} />
                    <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                        Mesa & Comedor
                    </h2>
                    <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                        Vajillas, vasos, cubiertos y detalles que elevan cada momento compartido.
                    </p>
                    <Image
                        src="/images/mesa.jpg"
                        alt="Mesa & Comedor"
                        width={300}
                        height={200}
                        className="rounded-md mt-4 object-cover"
                    />
                </div>

                {/* Cocina */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                    <Image src="/icons/cocina.png" alt="Cocina" width={40} height={40} />
                    <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                        Cocina
                    </h2>
                    <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                        Utensilios, sartenes, cuchillos y accesorios para una cocina funcional y con estilo.
                    </p>
                    <Image src="/images/cocina.jpg" alt="Cocina" width={300} height={200} className="rounded-md mt-4 object-cover"/>
                </div>

                {/* Baño */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                    <Image src="/icons/jabon.png" alt="Baño" width={40} height={40} />
                    <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                        Baño
                    </h2>
                    <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                        Toallas, dispensadores y accesorios que transforman tu rutina diaria.
                    </p>
                    <Image src="/images/bano.jpg" alt="Baño" width={300} height={200} className="rounded-md mt-4 object-cover"/>
                </div>

                {/* Recámara */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                    <Image src="/icons/cama.png" alt="Recámara" width={40} height={40} />
                    <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                        Recámara
                    </h2>
                    <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                        Sábanas, colchas, cojines y almohadas para tu descanso y bienestar.
                    </p>
                    <Image src="/images/recamara.jpg" alt="Recámara" width={300} height={200} className="rounded-md mt-4 object-cover"/>
                </div>

                {/* Lifestyle */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
                    <Image src="/icons/asesoria.png" alt="Lifestyle" width={40} height={40} />
                    <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                        Lifestyle
                    </h2>
                    <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                        Organización, decoración y regalos que reflejan tu estilo de vida.
                    </p>
                    <Image
                        src="/images/lifestyle.jpg" alt="Lifestyle" width={300} height={200} className="rounded-md mt-4 object-cover"
                    />
                </div>
            </div>


            {/* Sección final de categorías */}
            <div className="max-w-7xl mx-auto px-6">
                <section className="mt-12 bg-[#F7F5F2] rounded-2xl px-8 md:px-10 py-4">
                    <div className="flex items-center justify-between">

                        {/* Izquierda */}
                        <div className="flex items-center gap-5">
                            <img src="/Images/ramita.png" alt="Decoración" className="w-12 h-12 object-contain"/>
                            <p className={`${montserrat.className} text-[14px] text-[#3E4234] leading-6 max-w-[500px]`}>
                                Cada categoría ha sido cuidadosa mente seleccionada para ayudarte
                                a crear espacios que inspiran y conectan contigo.
                            </p>
                        </div>

                        {/* Derecha */}
                        <div className="flex items-center gap-3">
                        <Link href="/catalogo">
                            <button className="bg-[#6B705C] text-white h-[42px] w-[320px] rounded-md flex items-center justify-center gap-4 
                            text-[13px] tracking-[0.12em] uppercase font-medium transition-all hover:bg-[#5C614E]">
                                <span>VER CATÁLOGO COMPLETO</span>
                                <span className="text-lg">→</span>
                            </button>
                        </Link>
                            <img src="/Images/ramita.png" alt="Decoración" className="w-12 h-12 object-contain opacity-80"/>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
