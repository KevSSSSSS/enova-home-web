"use client";
import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";
import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export default function CardCategorias() {
    return (
        <main>
            {/* Grid de categorías */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-10 px-6">
                {/* Mesa & Comedor */}
                <Link href="/catalogo?categoria=MESACOMEDOR" className="group block">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                        <div className="p-6 flex flex-col items-center text-center">
                            <Image src="/icons/plato.png" alt="Mesa & Comedor" width={40} height={40} />
                            <h2 className={`${playfair.className} text-lg font-normal text-[#3E4234] mt-2 transition-colors duration-300 group-hover:text-[#6B705C]`}>
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
                        <ImagePlaceholder src="/images/categoria1.png" alt="Mesa & Comedor" className="w-full h-[220px] mt-auto transition-transform duration-500 group-hover:scale-105"/>
                    </div>
                </Link>

                {/* Cocina */}
                <Link href="/catalogo?categoria=COCINA" className="group block">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                        <div className="p-6 flex flex-col items-center text-center">
                            <Image src="/icons/cocina.png" alt="Cocina" width={40} height={40} />
                            <h2 className={`${playfair.className} text-lg font-normal text-[#3E4234] mt-2 transition-colors duration-300 group-hover:text-[#6B705C]`}>
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
                        <ImagePlaceholder src="/images/categoria2.png" alt="Cocina" className="w-full h-[220px] mt-auto transition-transform duration-500 group-hover:scale-105"/>
                    </div>
                </Link>

                {/* Baño */}
                <Link href="/catalogo?categoria=BANO" className="group block">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                        <div className="p-6 flex flex-col items-center text-center">
                            <Image src="/icons/jabon.png" alt="Baño" width={40} height={40} />
                            <h2 className={`${playfair.className} text-lg font-normal text-[#3E4234] mt-2 transition-colors duration-300 group-hover:text-[#6B705C]`}>
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
                        <ImagePlaceholder src="/images/categoria3.png" alt="Baño" className="w-full h-[220px] mt-auto transition-transform duration-500 group-hover:scale-105"/>
                    </div>
                </Link>

                {/* Recámara */}
                <Link href="/catalogo?categoria=RECAMARA" className="group block">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                        <div className="p-6 flex flex-col items-center text-center">
                            <Image src="/icons/cama.png" alt="Recámara" width={40} height={40} />
                            <h2 className={`${playfair.className} text-lg font-normal text-[#3E4234] mt-2 transition-colors duration-300 group-hover:text-[#6B705C]`}>
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
                        <ImagePlaceholder src="/images/categoria4.png" alt="Recámara" className="w-full h-[220px] mt-auto transition-transform duration-500 group-hover:scale-105"/>
                    </div>
                </Link>


                {/* Lifestyle */}
                <Link href="/catalogo?categoria=LIFESTYLE" className="group block">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                        <div className="p-6 flex flex-col items-center text-center">
                            <Image src="/icons/asesoria.png" alt="Lifestyle" width={40} height={40} />
                            <h2 className={`${playfair.className} text-lg font-normal text-[#3E4234] mt-2 transition-colors duration-300 group-hover:text-[#6B705C]`}>
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
                        <ImagePlaceholder src="/images/categoria.png" alt="Lifestyle" className="w-full h-[220px] mt-auto transition-transform duration-500 group-hover:scale-105"/>
                    </div>
                </Link>
            </div>
        </main>
    );
}