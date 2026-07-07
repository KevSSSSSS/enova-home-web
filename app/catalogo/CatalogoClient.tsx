"use client";
//import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CardCatalogos from "../components/CardCatalogos";
import { Playfair_Display, Montserrat } from "next/font/google";
import { productos } from "../data/productos";

interface CatalogoClientProps {
    categoriaSeleccionada: string;
    tieneCategoria: boolean;
}

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export default function CatalogoClient({
    categoriaSeleccionada,
    tieneCategoria,
}: CatalogoClientProps) {


    const router = useRouter();


    const categoriasMap: Record<string, string[]> = {
        "TODOS": [],
        "MESACOMEDOR": ["VASOS", "PLATOS", "CUBIERTOS", "VAJILLAS"],
        "COCINA": ["CUCHILLOS", "SARTENES", "OLLAS"],
        "BANO": ["TOALLAS", "DISPENSADORES"],
        "RECAMARA": ["COLCHAS", "ALMOHADAS"],
        "TEXTILES": ["SÁBANAS", "COBIJAS"],
        "LIFESTYLE": ["TERMOS", "YETIS"]
    };

    const productosFiltrados = productos.filter((producto) => {
        if (categoriaSeleccionada === "TODOS") return true;

        const categorias = categoriasMap[categoriaSeleccionada] || [];

        return categorias.includes(producto.categoria);
    });

    useEffect(() => {
        if (!tieneCategoria) return;

        const contenedor = document.getElementById("productos-catalogo");
        const navbar = document.getElementById("navbar");

        if (!contenedor) return;

        const timer = setTimeout(() => {
            const navbarHeight = navbar?.offsetHeight ?? 90;

            const y =
                contenedor.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                16;

            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [categoriaSeleccionada, tieneCategoria]);

    return (
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">
            <div className="flex flex-col lg:flex-row flex-grow">
                {/* Sidebar */}
                <aside className="w-full lg:w-[20%] lg:min-w-[300px] xl:min-w-[320px] bg-[#E7E7E5] px-5 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-6 flex flex-col">
                    <div className="space-y-4 text-left mt-15">
                        <p className="text-sm font-semibold text-[#6B705C]">EXPLORA NUESTRO CATÁLOGO</p>
                        <h1 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-normal text-[#3E4234] leading-tight tracking-wide`}>
                            Catálogo<br /> informativo
                        </h1>

                        <div className="flex items-center justify-start gap-2">
                            <hr className="w-16 border-t-2 border-[#6B705C]" />
                            <span className="w-2 h-2 rounded-full bg-[#6B705C]"></span>
                        </div>

                        <p className="text-[#6B705C] font-montserrat text-sm sm:text-base">
                            Descubre nuestra selección de<br /> productos pensados para crear<br />
                            espacios que inspiran bienestar,<br /> armonía y estilo.
                        </p>
                        <div className="flex justify-start mt-4">
                            <hr className="w-full max-w-md border-t border-[#3E4234]/20" />
                        </div>

                        <p className="text-sm font-semibold text-[#6B705C] mt-6">
                            FILTRAR POR CATEGORÍA
                        </p>
                        <div className="flex flex-col space-y-2 sm:space-y-2">
                            <button onClick={() => router.push("/catalogo?categoria=TODOS")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                                <span className="flex items-center gap-1.5">
                                    <img src="/icons/cuadricula.png" alt="Todos" className="w-4 h-4" />
                                    TODOS LOS PRODUCTOS
                                </span>
                                <span className="text-sm font-semibold">(15)</span>
                            </button>

                            <button onClick={() => router.push("/catalogo?categoria=MESACOMEDOR")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                                <span className="flex items-center gap-1.5">
                                    <img src="/icons/plato.png" alt="Plato" className="w-4 h-4" />
                                    MESA & COMEDOR
                                </span>
                                <span className="text-sm font-semibold">(4)</span>
                            </button>

                            <button onClick={() => router.push("/catalogo?categoria=COCINA")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                                <span className="flex items-center gap-1.5">
                                    <img src="/icons/cocina.png" alt="Cocina" className="w-4 h-4" />
                                    COCINA
                                </span>
                                <span className="text-sm font-semibold">(3)</span>
                            </button>

                            <button onClick={() => router.push("/catalogo?categoria=BANO")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                                <span className="flex items-center gap-1.5">
                                    <img src="/icons/jabon.png" alt="Baño" className="w-4 h-4" />
                                    BAÑO
                                </span>
                                <span className="text-sm font-semibold">(2)</span>
                            </button>

                            <button onClick={() => router.push("/catalogo?categoria=RECAMARA")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                                <span className="flex items-center gap-1.5">
                                    <img src="/icons/cama.png" alt="Recámara" className="w-4 h-4" />
                                    RECÁMARA
                                </span>
                                <span className="text-sm font-semibold">(2)</span>
                            </button>

                            <button onClick={() => router.push("/catalogo?categoria=TEXTILES")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                                <span className="flex items-center gap-1.5">
                                    <img src="/icons/textil.png" alt="Textiles" className="w-4 h-4" />
                                    TEXTILES
                                </span>
                                <span className="text-sm font-semibold">(2)</span>
                            </button>

                            <button onClick={() => router.push("/catalogo?categoria=LIFESTYLE")} className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#E7E7E5] text-[#3E4234] hover:bg-[#B2B5AB] cursor-pointer">
                                <span className="flex items-center gap-1.5">
                                    <img src="/icons/regalo.png" alt="Lifestyle" className="w-4 h-4" />
                                    LIFESTYLE
                                </span>
                                <span className="text-sm font-semibold">(2)</span>
                            </button>
                        </div>

                        <div className="mt-10 flex justify-center lg:justify-start">
                            <div className="w-full max-w-[300px] bg-[#E7E7E5] border border-[#3E4234]/15 rounded-xl shadow-sm py-5 sm:py-6 pl-4 sm:pl-5 pr-3">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    {/* Ramita */}
                                    <img src="/images/ramita.png" alt="Decorativo" className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 mt-0.5" />

                                    {/* Contenido */}
                                    <div className="flex flex-col items-start w-full">
                                        <h3 className={`${playfair.className} text-lg sm:text-xl md:text-2xl font-normal leading-tight text-[#3E4234]`}>
                                            ¿Necesitas ayuda?
                                        </h3>

                                        <p className={`${montserrat.className} mt-2 sm:mt-3 text-xs sm:text-sm leading-6 text-[#3E4234]`}>
                                            Estamos aquí para asesorarte<br /> y ayudarte a elegir lo mejor<br /> para tu hogar.
                                        </p>

                                        <button onClick={() => { router.push("/contacto"); window.scrollTo({ top: 0, behavior: "instant" }); }}
                                            className={`${montserrat.className} mt-4 sm:mt-5 w-full max-w-[170px] py-2 border border-[#3E4234]/30 
                                            text-[#3E4234] rounded-md uppercase tracking-wide hover:bg-[#6B705C] hover:text-white transition self-start cursor-pointer`}>
                                            Contáctanos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Contenedor derecho de productos */}
                <CardCatalogos productos={productosFiltrados} />
            </div>
        </div>
    );
}