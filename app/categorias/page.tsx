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
                <img src="/Images/ramita.png" alt="Decoración ramita" className="w-16 h-16 mb-0 mx-auto" />

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
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 flex flex-col items-center text-center">
                        <Image src="/icons/plato.png" alt="Mesa & Comedor" width={40} height={40} />
                        <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                            Mesa & Comedor
                        </h2>
                        <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                            Vajillas, vasos, cubiertos y detalles que elevan cada momento compartido.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <hr className="w-10 border-t-2 border-[#3E4234]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3E4234]"></span>
                        </div>
                    </div>
                    <Image src="/images/categoria1.png" alt="Mesa & Comedor" width={400} height={300} className="w-full h-[220px] object-cover mt-auto" />
                </div>

                {/* Cocina */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 flex flex-col items-center text-center">
                        <Image src="/icons/cocina.png" alt="Cocina" width={40} height={40} />
                        <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                            Cocina
                        </h2>
                        <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                            Utensilios, sartenes, cuchillos y accesorios para una cocina funcional y con estilo.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <hr className="w-10 border-t-2 border-[#3E4234]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3E4234]"></span>
                        </div>
                    </div>
                    <Image src="/images/categoria2.png" alt="Cocina" width={400} height={300} className="w-full h-[220px] object-cover mt-auto" />
                </div>

                {/* Baño */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 flex flex-col items-center text-center">
                        <Image src="/icons/jabon.png" alt="Baño" width={40} height={40} />
                        <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                            Baño
                        </h2>
                        <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                            Toallas, dispensadores y accesorios que transforman tu rutina diaria.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <hr className="w-10 border-t-2 border-[#3E4234]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3E4234]"></span>
                        </div>
                    </div>
                    <Image src="/images/categoria3.png" alt="Baño" width={400} height={300} className="w-full h-[220px] object-cover mt-auto" />
                </div>

                {/* Recámara */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 flex flex-col items-center text-center">
                        <Image src="/icons/cama.png" alt="Recámara" width={40} height={40} />
                        <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                            Recámara
                        </h2>
                        <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                            Sábanas, colchas, cojines y almohadas para tu descanso y bienestar.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <hr className="w-10 border-t-2 border-[#3E4234]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3E4234]"></span>
                        </div>
                    </div>
                    <Image src="/images/categoria4.png" alt="Recámara" width={400} height={300} className="w-full h-[220px] object-cover mt-auto" />
                </div>

                {/* Lifestyle */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 flex flex-col items-center text-center">
                        <Image src="/icons/asesoria.png" alt="Lifestyle" width={40} height={40} />
                        <h2 className={`${montserrat.className} text-lg font-semibold text-[#3E4234] mt-2`}>
                            Lifestyle
                        </h2>
                        <p className={`${montserrat.className} text-sm text-[#3E4234]/70 mt-1`}>
                            Organización, decoración y regalos que reflejan tu estilo de vida.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <hr className="w-10 border-t-2 border-[#3E4234]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3E4234]"></span>
                        </div>
                    </div>
                    <Image src="/images/categoria.png" alt="Lifestyle" width={400} height={300} className="w-full h-[220px] object-cover mt-auto" />
                </div>
            </div>

            {/* Sección final de categorías */}
            <div className="max-w-7xl mx-auto px-6">
                <section className="mt-12 bg-[#F7F5F2] rounded-2xl px-6 md:px-10 py-5">

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                        {/* Izquierda */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">

                            <img
                                src="/Images/ramita.png"
                                alt="Decoración"
                                className="w-10 h-10 md:w-12 md:h-12 object-contain flex-shrink-0"
                            />

                            <p className={`${montserrat.className} text-[14px] md:text-[15px] text-[#3E4234] leading-6 max-w-[500px]`}>
                                Cada categoría ha sido cuidadosamente seleccionada para ayudarte
                                a crear espacios que inspiran y conectan contigo.
                            </p>
                        </div>

                        {/* Derecha */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">

                            <Link href="/catalogo">
                                <button className="bg-[#6B705C] text-white h-[42px] w-full sm:w-[320px] rounded-md flex items-center 
                                justify-center gap-4 text-[13px] tracking-[0.12em] uppercase font-medium transition-all hover:bg-[#5C614E]">
                                    <span>VER CATÁLOGO COMPLETO</span>
                                    <span className="text-lg">→</span>
                                </button>
                            </Link>

                            <img
                                src="/Images/ramita.png"
                                alt="Decoración"
                                className="w-12 h-12 md:w-12 md:h-12 object-contain opacity-80"
                            />

                        </div>

                    </div>

                </section>
            </div>
        </main>
    );
}
