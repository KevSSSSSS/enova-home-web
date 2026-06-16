"use client";
import { Playfair_Display, Montserrat } from "next/font/google";
import Link from "next/link";
import CardCategorias from "../components/CardCategorias";
import NavBar from "../components/NavBar";

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
            <NavBar />
            {/* Encabezado de Categorías */}
            <div className="space-y-6 px-6 md:px-12 text-center mt-16">
                {/* Ramita decorativa arriba del título */}
                <img src="/Images/ramita.png" alt="Decoración ramita" className="w-16 h-16 mb-0 mx-auto" />

                <div className="flex items-center justify-center gap-3">
                    <hr className="w-16 border-t-2 border-[#3E4234]" />
                    <span className="w-2 h-2 rounded-full bg-[#3E4234]"></span>
                </div>

                <h2 className={`${playfair.className} text-4xl md:text-5xl font-normal text-[#3E4234] leading-tight`}>
                    Categorías para<br />{" "} <span className="text-[#6B705C]">cada espacio</span>
                </h2>

                <p className="text-base md:text-lg text-[#6B705C] max-w-2xl mx-auto">
                    Explora nuestra selección de productos diseñados para inspirar armonía,
                    funcionalidad y estilo en cada rincón de tu hogar.
                </p>
            </div>

            {/* Grid de categorías */}
            <CardCategorias />

            {/* Sección final de categorías */}
            <div className="max-w-7xl mx-auto px-6">
                <section className="mt-12 bg-[#F7F5F2] rounded-2xl px-6 md:px-8 py-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                        {/* Izquierda */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">

                            <img src="/Images/ramita.png" alt="Decoración" className="w-10 h-10 md:w-12 md:h-12 object-contain flex-shrink-0" />

                            <p className={`${montserrat.className} text-[14px] md:text-[15px] text-[#3E4234] leading-6 max-w-[500px]`}>
                                Cada categoría ha sido cuidadosamente seleccionada para ayudarte
                                a crear espacios que inspiran y conectan contigo.
                            </p>
                        </div>

                        {/* Derecha */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href="/catalogo">
                                <button className="bg-[#6B705C] text-white h-[46px] w-full sm:w-[320px] rounded-md flex items-center 
                                justify-center gap-5 text-[13px] tracking-[0.12em] uppercase font-medium  hover:bg-[#5C614E] transition clic cursor-pointer">
                                    <span>VER CATÁLOGO COMPLETO</span>
                                    <span className="text-xl">→</span>
                                </button>
                            </Link>
                            <img src="/Images/ramita(2).png" alt="Decoración" className="w-[90px] h-auto"/>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}