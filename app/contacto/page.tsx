"use client";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
});


export default function Contactopage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#3E4234]">

            {/* Banner */}
            <section className="relative px-0 pt-14 bg-[#FFFFFF]">

                {/* Imagen */}
                <div className="relative w-full h-[850px]">
                    <img src="/Images/ComedorVerde.png" alt="Comedor acogedor eNova Home"
                        className="w-full h-full object-cover brightness-110 contrast-105 saturate-115 sepia-[0.08]"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent"></div>

                    {/* Tarjetas flotantes */}
                    <div className="absolute inset-0 flex items-center justify-center px-6">
                        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12">
                            {/* FORMULARIO */}
                            <div className="bg-white rounded-2xl shadow-xl p-10">

                                <div className="flex items-center gap-4 mb-6">
                                    <img src="/Images/ramita.png" alt="Decoración ramita" className="w-12 h-12"/>
                                    <div>
                                        <h3 className={`${playfair.className} text-3xl text-[#3E4234]`}>
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
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 outline-none focus:border-[#6B705C]"/>

                                    <input type="email"placeholder="Correo electrónico"
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 outline-none focus:border-[#6B705C]"/>

                                    <input type="text" placeholder="Teléfono"
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 outline-none focus:border-[#6B705C]"/>

                                    <textarea rows={4} placeholder="Mensaje..."
                                        className="w-full rounded-md border border-[#D6D6CF] px-4 py-3 resize-none outline-none 
                                        focus:border-[#6B705C]"/>

                                    <button
                                        className="bg-[#6B705C] hover:bg-[#5C614E] transition text-white uppercase tracking-wider px-8 h-[50px] rounded-md cursor-pointer">
                                        Enviar mensaje
                                    </button>
                                </form>
                            </div>

                            {/* REDES */}
                            <div className="bg-[#F7F5F2] rounded-2xl shadow-xl p-10 flex flex-col justify-center">

                                <h3 className={`${playfair.className} text-3xl text-center text-[#3E4234]`}>
                                    Síguenos
                                </h3>

                                <div className="flex items-center justify-center gap-2 mt-4 mb-10">
                                    <hr className="w-16 border-t-2 border-[#6B705C]" />
                                    <span className="w-2 h-2 rounded-full bg-[#6B705C]" />
                                </div>

                                <p className="text-center text-[#6B705C] mb-10">
                                    Mantente conectado con nosotros y descubre novedades,
                                    inspiración y promociones.
                                </p>

                                <div className="grid grid-cols-2 gap-8">

                                    <a href="#" className="flex flex-col items-center group">
                                        <div className="w-24 h-24 rounded-full bg-[#3E4234] flex items-center justify-center group-hover:bg-[#6B705C] transition">
                                            <img src="/icons/instagram.png" className="w-10" />
                                        </div>
                                        <span className="mt-4 uppercase tracking-widest text-sm">
                                            Instagram
                                        </span>
                                    </a>

                                    <a href="#" className="flex flex-col items-center group">
                                        <div className="w-24 h-24 rounded-full bg-[#3E4234] flex items-center justify-center group-hover:bg-[#6B705C] transition">
                                            <img src="/icons/facebook.png" className="w-10" />
                                        </div>
                                        <span className="mt-4 uppercase tracking-widest text-sm">
                                            Facebook
                                        </span>
                                    </a>

                                    <a href="#" className="flex flex-col items-center group">
                                        <div className="w-24 h-24 rounded-full bg-[#3E4234] flex items-center justify-center group-hover:bg-[#6B705C] transition">
                                            <img src="/icons/x.png" className="w-10" />
                                        </div>
                                        <span className="mt-4 uppercase tracking-widest text-sm">
                                            X
                                        </span>
                                    </a>

                                    <a href="#" className="flex flex-col items-center group">
                                        <div className="w-24 h-24 rounded-full bg-[#3E4234] flex items-center justify-center group-hover:bg-[#6B705C] transition">
                                            <img src="/icons/linkedin.png" className="w-10" />
                                        </div>
                                        <span className="mt-4 uppercase tracking-widest text-sm">
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
