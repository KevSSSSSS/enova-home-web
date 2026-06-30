"use client";
import { Playfair_Display } from "next/font/google";
import { useEffect } from "react";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
});


export default function Contactopage() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">

            {/* Banner */}
            <section className="relative px-0 pt-16 md:pt-14 lg:pt-0 bg-[#FFFFFF]">
                {/* Imagen */}
                <div className="relative w-full min-h-[1300px] lg:min-h-screen">
                    <img src="/Images/ComedorVerde.png" className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-105 saturate-115 sepia-[0.08]" />
                    <div className="absolute inset-0 flex items-start lg:items-center justify-center px-4 md:px-6 pt-8 md:pt-10 pb-10"></div>

                    {/* Tarjetas flotantes */}
                    <div className="absolute inset-0 flex items-start lg:items-center justify-center px-4 md:px-6 py-10">
                        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* FORMULARIO */}
                            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-10">

                                <div className="flex items-center gap-4 mb-6">
                                    <img src="/Images/ramita.png" alt="Decoración ramita" className="w-12 h-12 -scale-x-100" />
                                    <div>
                                        <h3 className={`${playfair.className} text-2xl md:text-3xl text-[#3E4234]`}>
                                            Contáctanos
                                        </h3>

                                        <div className="flex items-center gap-2 mt-3">
                                            <hr className="w-16 border-t-2 border-[#6B705C]" />
                                            <span className="w-2 h-2 rounded-full bg-[#6B705C]" />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[#6B705C] mb-8">
                                    ¿Tienes alguna duda o necesitas asesoría? Completa el
                                    formulario y con gusto nos pondremos en contacto contigo.
                                </p>

                                <form className="space-y-5">
                                    <input type="text" placeholder="Nombre"
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 outline-none focus:border-[#6B705C]" />

                                    <input type="email" placeholder="Correo electrónico"
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 outline-none focus:border-[#6B705C]" />

                                    <input type="text" placeholder="Teléfono"
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 outline-none focus:border-[#6B705C]" />

                                    <textarea rows={4} placeholder="Mensaje..."
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 resize-none outline-none 
                                        focus:border-[#6B705C]"/>

                                    <button className="w-full sm:w-auto bg-[#6B705C] hover:bg-[#5C614E] 
                                    transition text-white uppercase tracking-wider px-8 h-[50px] rounded-md cursor-pointer">
                                        Enviar mensaje
                                    </button>
                                </form>
                            </div>

                            {/* REDES */}
                            <div className="bg-[#F7F5F2] rounded-2xl shadow-xl p-5 sm:p-6 md:p-10 flex flex-col justify-center">
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="text-center">
                                        <h3 className={`${playfair.className} text-2xl md:text-3xl text-[#3E4234]`}>
                                            Síguenos
                                        </h3>

                                        <div className="flex items-center justify-center gap-2 mt-3">
                                            <hr className="w-16 border-t-2 border-[#6B705C]" />
                                            <span className="w-2 h-2 rounded-full bg-[#6B705C]" />
                                        </div>
                                    </div>
                                    <img src="/Images/ramita.png" alt="Decoración ramita" className="w-12 h-12" />
                                </div>

                                <p className="text-center text-[#6B705C] mb-10">
                                    Mantente conectado con nosotros y descubre novedades,
                                    inspiración y promociones.
                                </p>

                                <div className="grid grid-cols-2 gap-8">
                                    <a href="https://www.instagram.com/?hl=es" className="flex flex-col items-center group">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#F7F5F2] 
                                        flex items-center justify-center transition-all duration-300 group-hover:bg-white 
                                        group-hover:shadow-lg group-hover:-translate-y-1">
                                            <img src="/icons/instagram.png" className="w-7 sm:w-8 md:w-10" />
                                        </div>
                                        <span className="mt-3 md:mt-4 uppercase tracking-widest text-[11px] sm:text-xs md:text-sm transition-colors duration-300 group-hover:text-[#6B705C]">
                                            Instagram
                                        </span>
                                    </a>

                                    <a href="https://www.facebook.com/?locale=es_LA" className="flex flex-col items-center group">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#F7F5F2] 
                                        flex items-center justify-center transition-all duration-300 group-hover:bg-white 
                                        group-hover:shadow-lg group-hover:-translate-y-1">
                                            <img src="/icons/facebook.png" className="w-7 sm:w-8 md:w-10" />
                                        </div>
                                        <span className="mt-3 md:mt-4 uppercase tracking-widest text-[11px] sm:text-xs md:text-sm transition-colors duration-300 group-hover:text-[#6B705C]">
                                            Facebook
                                        </span>
                                    </a>

                                    <a href="https://x.com/?lang=es" className="flex flex-col items-center group">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#F7F5F2] 
                                        flex items-center justify-center transition-all duration-300 group-hover:bg-white 
                                        group-hover:shadow-lg group-hover:-translate-y-1">
                                            <img src="/icons/x.png" className="w-7 sm:w-8 md:w-10" />
                                        </div>
                                        <span className="mt-3 md:mt-4 uppercase tracking-widest text-[11px] sm:text-xs md:text-sm transition-colors duration-300 group-hover:text-[#6B705C]">
                                            X
                                        </span>
                                    </a>

                                    <a href="https://mx.linkedin.com/" className="flex flex-col items-center group">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#F7F5F2] 
                                        flex items-center justify-center transition-all duration-300 group-hover:bg-white 
                                        group-hover:shadow-lg group-hover:-translate-y-1">
                                            <img src="/icons/linkedin.png" className="w-7 sm:w-8 md:w-10" />
                                        </div>
                                        <span className="mt-3 md:mt-4 uppercase tracking-widest text-[11px] sm:text-xs md:text-sm transition-colors duration-300 group-hover:text-[#6B705C]">
                                            LinkedIn
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}