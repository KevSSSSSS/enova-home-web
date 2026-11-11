"use client";
import { useState } from "react";
import Link from "next/link";
import { Playfair_Display, Montserrat } from "next/font/google";
import BotonRegresar from "./BotonRegresar";
import GaleriaModal from "./GaleriaModal";
import { useCart } from "../context/CartContext";
import { usePageTitle } from "../hooks/usePageTitle";

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

    especificaciones: {
        nombre: string;
        valor: string;
    }[];

    variantes: {
        idVariante: number;
        sku: string;
        codigoBarras: string | null;
        precioNormal: number;
        precioOferta: number | null;
        activo: boolean;
        valores: {
            idValorVariante: number;
            valor: string;
            tipoVariante: {
                idTipoVariante: number;
                nombre: string;
            };
        }[];
    }[];
};

interface Props {
    producto: Producto;
}

export default function ProductoDetalle({ producto }: Props) {
    usePageTitle(producto.nombre);
    const { agregarAlCarrito } = useCart();
    const [imagenSeleccionada, setImagenSeleccionada] = useState(
        producto.imagenPrincipal
    );

    const [modalAbierto, setModalAbierto] = useState(false);
    const [indiceActual, setIndiceActual] = useState(0);
    const [cantidad, setCantidad] = useState(1);

    // Variantes activas del producto
    const variantesActivas = producto.variantes.filter(
        (variante) => variante.activo
    );

    // Primera variante activa
    const variantePrincipal = variantesActivas[0];

    // Variantes adicionales
    const variantesAdicionales = variantesActivas.slice(1);


    return (
        <main className="bg-[#E7E7E5] min-h-screen pt-28 md:pt-32 lg:pt-36 pb-12 md:pb-16">
            {/* Contenedor principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <BotonRegresar />

                {/* Breadcrumb */}
                <div className={`${montserrat.className} text-xs sm:text-sm text-[#6B705C] mb-6 md:mb-8 flex flex-wrap`}>
                    <Link href="/" className="hover:text-[#3E4234]">
                        Inicio
                    </Link>
                    <span className="mx-2">/</span>

                    <Link href="/catalogo" className="hover:text-[#3E4234]">
                        Catálogo
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#6B705C]">
                        {producto.categoria}
                    </span>
                    <span className="mx-2">/</span>
                    <span className="text-[#3E4234]">
                        {producto.nombre}
                    </span>
                </div>

                {/* Producto */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Columna izquierda */}
                    <div>
                        {/* Imagen principal */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <img src={imagenSeleccionada} alt={producto.nombre}
                                onClick={() => {
                                    const indice = producto.imagenes.findIndex((img) => img === imagenSeleccionada);
                                    setIndiceActual(indice); setModalAbierto(true);
                                }} className="w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover cursor-zoom-in" />
                        </div>
                        {/* Miniaturas */}
                        <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
                            {producto.imagenes.map((img, index) => (
                                <img key={index} src={img} alt={`${producto.nombre} ${index + 1}`} onClick={() => setImagenSeleccionada(img)}
                                    className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg object-cover cursor-pointer border-2 transition 
                                ${imagenSeleccionada === img ? "border-[#6B705C]" : "border-gray-300 hover:border-[#6B705C]"}`} />
                            ))}
                        </div>
                    </div>

                    {/* Columna derecha */}
                    <div>
                        <p className={`${montserrat.className} uppercase tracking-[0.18em] text-sm text-[#6B705C]`}>
                            {producto.categoria}
                        </p>
                        <h1 className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl text-[#3E4234] mt-3`}>
                            {producto.nombre}
                        </h1>
                        {/* SKU de la variante principal */}
                        {variantePrincipal && (
                            <p className={`${montserrat.className} text-xs sm:text-sm text-[#6B705C] mt-6`}>
                                SKU: {variantePrincipal.sku}
                            </p>
                        )}

                        {/* Precio de la variante principal */}
                        <div className="mt-4">
                            {variantePrincipal?.precioOferta != null ? (
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={`${montserrat.className} text-lg text-gray-500 line-through`}>
                                        {Number(variantePrincipal.precioNormal).toLocaleString("es-MX", {
                                            style: "currency",
                                            currency: "MXN",
                                        })}
                                    </span>

                                    <span className={`${montserrat.className} text-2xl sm:text-3xl lg:text-4xl text-[#6B705C]`}>
                                        {Number(variantePrincipal.precioOferta).toLocaleString("es-MX", {
                                            style: "currency",
                                            currency: "MXN",
                                        })}
                                    </span>
                                </div>
                            ) : (
                                <p className={`${montserrat.className} text-2xl sm:text-3xl lg:text-4xl text-[#6B705C]`}>
                                    {Number(variantePrincipal?.precioNormal ?? producto.precio).toLocaleString("es-MX", {
                                        style: "currency",
                                        currency: "MXN",
                                    })}
                                </p>
                            )}
                        </div>
                        <p className={`${montserrat.className} text-[#3E4234] text-sm sm:text-base leading-7 sm:leading-8 mt-8`}>
                            {producto.descripcion}
                        </p>
                        {/* Cantidad */}
                        <div className="flex items-center gap-5 mt-8 md:mt-10">
                            <button onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}
                                className="w-10 h-10 rounded border border-[#6B705C] cursor-pointer hover:bg-[#6B705C] hover:text-white transition">
                                -
                            </button>
                            <span className="text-xl w-8 text-center">
                                {cantidad}
                            </span>

                            <button onClick={() => setCantidad(cantidad + 1)}
                                className="w-10 h-10 rounded border border-[#6B705C] cursor-pointer hover:bg-[#6B705C] hover:text-white transition">
                                +
                            </button>
                        </div>

                        {/* Botón */}
                        <button
                            onClick={() =>
                                agregarAlCarrito({
                                    id: producto.id,
                                    nombre: producto.nombre,
                                    precio: producto.precio,
                                    imagen: producto.imagenPrincipal,
                                    cantidad,
                                })
                            }
                            className="mt-8 md:mt-10 w-full sm:w-auto bg-[#6B705C] text-white h-[52px] px-12 rounded-md hover:bg-[#3E4234] transition cursor-pointer"
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </section>

                {/* Variantes adicionales */}
                {variantesAdicionales.length > 0 && (
                    <section className="mt-16">
                        <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl text-[#3E4234] mb-6`}>
                            Otras variantes disponibles
                        </h2>

                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className={`${montserrat.className} w-full text-sm text-left text-[#3E4234]`}>
                                    <thead className="bg-[#6B705C] text-white">
                                        <tr>
                                            <th className="p-4 font-medium">SKU</th>
                                            <th className="p-4 font-medium">Variante</th>
                                            <th className="p-4 font-medium">Precio normal</th>
                                            <th className="p-4 font-medium">Precio de oferta</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {variantesAdicionales.map((variante) => (
                                            <tr key={variante.idVariante} className="border-b last:border-b-0 border-gray-200">
                                                <td className="p-4">{variante.sku}</td>

                                                <td className="p-4">
                                                    {variante.valores.map((valor) => (
                                                        <span key={valor.idValorVariante} className="block">
                                                            {valor.tipoVariante.nombre}: {valor.valor}
                                                        </span>
                                                    ))}
                                                </td>

                                                <td className="p-4">
                                                    {Number(variante.precioNormal).toLocaleString("es-MX", {
                                                        style: "currency",
                                                        currency: "MXN",
                                                    })}
                                                </td>

                                                <td className="p-4">
                                                    {variante.precioOferta != null
                                                        ? Number(variante.precioOferta).toLocaleString("es-MX", {
                                                            style: "currency",
                                                            currency: "MXN",
                                                        })
                                                        : "Sin oferta"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* Descripción */}
                <section className="mt-20">
                    <h2 className={`${playfair.className} text-4xl text-[#3E4234] mb-6`}>
                        Descripción
                    </h2>
                    <p className={`${montserrat.className} leading-8 text-[#3E4234]`}>
                        {producto.descripcion}
                    </p>

                </section>

                {/* Especificaciones */}
                <section className="mt-20">
                    <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl text-[#3E4234] mb-6`}>
                        Especificaciones
                    </h2>
                    <div className="bg-white rounded-xl overflow-hidden">
                        {/**{producto.especificaciones.map((esp, index) => (**/}
                        {producto.especificaciones?.map((esp, index) => (
                            <div key={index} className={`grid grid-cols-1 sm:grid-cols-2 p-4 sm:p-5 
                                ${index !== producto.especificaciones.length - 1 ? "border-b" : ""}`}>
                                <span className="font-semibold">
                                    {esp.nombre}
                                </span>
                                <span>
                                    {esp.valor}
                                </span>
                            </div>
                        ))}

                        {/* Variantes */}
                        {variantePrincipal && variantePrincipal.valores.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 p-4 sm:p-5 border-t border-black">
                                <span className="font-semibold">
                                    Variantes
                                </span>

                                <div className={`${montserrat.className} flex flex-wrap gap-2`}>
                                    {variantePrincipal.valores.map((valor) => (
                                        <span
                                            key={valor.idValorVariante}
                                            className="bg-[#E7E7E5] text-[#3E4234] px-3 py-1.5 rounded-md text-sm"
                                        >
                                            {valor.tipoVariante.nombre}: {valor.valor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {modalAbierto && (
                <GaleriaModal
                    imagenes={producto.imagenes}
                    indiceActual={indiceActual}
                    onCerrar={() => setModalAbierto(false)}
                    onAnterior={() =>
                        setIndiceActual((prev) =>
                            prev === 0 ? producto.imagenes.length - 1 : prev - 1
                        )
                    }
                    onSiguiente={() =>
                        setIndiceActual((prev) =>
                            prev === producto.imagenes.length - 1 ? 0 : prev + 1
                        )
                    }
                />
            )}

        </main>
    );
}