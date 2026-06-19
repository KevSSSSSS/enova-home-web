"use client";
import Link from "next/link";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

type Producto = {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    imagenPrincipal: string;
    imagenes: string[];
    descripcion: string;
};

interface Props {
    producto: Producto;
}

export default function ProductoDetalle({ producto }: Props) {
    return (
        <main className="bg-[#E7E7E5] min-h-screen pt-36 pb-16">

            {/* Contenedor principal */}
            <div className="max-w-7xl mx-auto px-6">

                {/* Breadcrumb */}
                <div
                    className={`${montserrat.className} text-sm text-[#6B705C] mb-8`}
                >
                    <Link href="/" className="hover:text-[#3E4234]">
                        Inicio
                    </Link>

                    <span className="mx-2">/</span>

                    <Link href="/catalogo" className="hover:text-[#3E4234]">
                        Catálogo
                    </Link>

                    <span className="mx-2">/</span>

                    <span className="text-[#3E4234]">
                        {producto.nombre}
                    </span>
                </div>

                {/* Producto */}
                <section className="grid lg:grid-cols-2 gap-16">

                    {/* Columna izquierda */}
                    <div>

                        {/* Imagen principal */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">

                            <img
                                src={producto.imagenPrincipal}
                                alt="Producto"
                                className="w-full h-[520px] object-cover"
                            />

                        </div>

                        {/* Miniaturas */}
                        <div className="flex gap-4 mt-5">

                            {producto.imagenes.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    className="w-24 h-24 rounded-lg object-cover border cursor-pointer"
                                />
                            ))}

                        </div>

                    </div>

                    {/* Columna derecha */}
                    <div>

                        <p
                            className={`${montserrat.className} uppercase tracking-[0.18em] text-sm text-[#6B705C]`}
                        >
                            {producto.categoria}
                        </p>

                        <h1
                            className={`${playfair.className} text-5xl text-[#3E4234] mt-3`}
                        >
                            {producto.nombre}
                        </h1>

                        <p
                            className={`${montserrat.className} text-4xl text-[#6B705C] mt-8`}
                        >
                            {producto.precio.toLocaleString("es-MX", {
                                style: "currency",
                                currency: "MXN",
                            })}
                        </p>

                        <p
                            className={`${montserrat.className} text-[#3E4234] leading-8 mt-8`}
                        >
                            {producto.descripcion}
                        </p>

                        {/* Cantidad */}
                        <div className="flex items-center gap-5 mt-10">

                            <button className="w-10 h-10 rounded border border-[#6B705C]">
                                -
                            </button>

                            <span className="text-xl">
                                1
                            </span>

                            <button className="w-10 h-10 rounded border border-[#6B705C]">
                                +
                            </button>

                        </div>

                        {/* Botón */}
                        <button
                            className={`${montserrat.className}
              mt-10
              bg-[#6B705C]
              hover:bg-[#5C614E]
              transition
              text-white
              uppercase
              tracking-[0.15em]
              h-[52px]
              px-12
              rounded-md
              cursor-pointer`}
                        >
                            Agregar al carrito
                        </button>

                    </div>

                </section>

                {/* Descripción */}
                <section className="mt-20">

                    <h2
                        className={`${playfair.className} text-4xl text-[#3E4234] mb-6`}
                    >
                        Descripción
                    </h2>

                    <p
                        className={`${montserrat.className} leading-8 text-[#3E4234]`}
                    >
                        {producto.descripcion}
                    </p>

                </section>

                {/* Especificaciones */}
                <section className="mt-20">

                    <h2
                        className={`${playfair.className} text-4xl text-[#3E4234] mb-6`}
                    >
                        Especificaciones
                    </h2>

                    <div className="bg-white rounded-xl overflow-hidden">

                        <div className="grid grid-cols-2 border-b p-5">

                            <span className="font-semibold">
                                Material
                            </span>

                            <span>
                                Cerámica
                            </span>

                        </div>

                        <div className="grid grid-cols-2 border-b p-5">

                            <span className="font-semibold">
                                Color
                            </span>

                            <span>
                                Arena
                            </span>

                        </div>

                        <div className="grid grid-cols-2 border-b p-5">

                            <span className="font-semibold">
                                Piezas
                            </span>

                            <span>
                                16
                            </span>

                        </div>

                        <div className="grid grid-cols-2 p-5">

                            <span className="font-semibold">
                                Apta para microondas
                            </span>

                            <span>
                                Sí
                            </span>

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}