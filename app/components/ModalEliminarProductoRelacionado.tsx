"use client";

import { useState } from "react";

interface Producto {
    idProducto: number;
    nombre: string;
    marca: string | null;
}

interface ProductoRelacionado {
    producto: Producto;
    productoRelacionado: Producto;
    tipoRelacion: string;
    orden: number;
    activo: boolean;
}

interface ModalEliminarProductoRelacionadoProps {
    relacion: ProductoRelacionado;
    onCerrar: () => void;
    onEliminado: () => void;
}

export default function ModalEliminarProductoRelacionado({
    relacion,
    onCerrar,
    onEliminado,
}: ModalEliminarProductoRelacionadoProps) {

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const eliminarProductoRelacionado = async () => {

        try {

            setError("");
            setMensaje("");
            setCargando(true);

            const respuesta = await fetch(
                `${API_URL}/productos/${relacion.producto.idProducto}/relacionados/${relacion.productoRelacionado.idProducto}`,
                {
                    method: "DELETE",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    datos.mensaje ||
                    "No fue posible eliminar la relación"
                );

                return;
            }

            setMensaje(
                "Relación de productos eliminada correctamente"
            );

            onEliminado();

            setTimeout(() => {
                onCerrar();
            }, 1500);

        } catch (error) {

            console.error(
                "Error al eliminar relación de productos:",
                error
            );

            setError(
                "No fue posible conectar con el servidor."
            );

        } finally {

            setCargando(false);

        }
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/50
                px-4
                py-8
            "
        >

            {/* Contenedor */}
            <div
                className="
                    w-full
                    max-w-lg
                    bg-white
                    rounded-xl
                    shadow-2xl
                    border
                    border-[#D6D6CF]
                "
            >

                {/* Encabezado */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-5
                        bg-[#E7E7E5]
                        border-b
                        border-[#D6D6CF]
                    "
                >

                    <h2 className="text-xl font-semibold text-[#3E4234]">
                        Eliminar relación de productos
                    </h2>

                    <button
                        type="button"
                        onClick={onCerrar}
                        className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            rounded-full
                            text-[#3E4234]
                            hover:bg-white
                            transition-colors
                            cursor-pointer
                        "
                    >
                        ✕
                    </button>

                </div>

                {/* Contenido */}
                <div className="p-6">

                    <p className="text-[#3E4234] text-base">
                        ¿Estás seguro de que deseas eliminar esta relación de productos?
                    </p>

                    {/* Producto */}
                    <div
                        className="
                            mt-4
                            rounded-md
                            border
                            border-[#D6D6CF]
                            bg-[#F8F8F7]
                            px-4
                            py-3
                        "
                    >

                        <p className="text-sm text-gray-600">
                            Producto
                        </p>

                        <p className="mt-1 font-medium text-[#3E4234]">
                            {relacion.producto.nombre}
                        </p>

                        {relacion.producto.marca && (
                            <p className="text-sm text-gray-500">
                                {relacion.producto.marca}
                            </p>
                        )}

                    </div>

                    {/* Producto relacionado */}
                    <div
                        className="
                            mt-4
                            rounded-md
                            border
                            border-[#D6D6CF]
                            bg-[#F8F8F7]
                            px-4
                            py-3
                        "
                    >

                        <p className="text-sm text-gray-600">
                            Producto relacionado
                        </p>

                        <p className="mt-1 font-medium text-[#3E4234]">
                            {relacion.productoRelacionado.nombre}
                        </p>

                        {relacion.productoRelacionado.marca && (
                            <p className="text-sm text-gray-500">
                                {relacion.productoRelacionado.marca}
                            </p>
                        )}

                    </div>

                    {/* Advertencia */}
                    <div
                        className="
                            mt-4
                            rounded-md
                            border
                            border-red-300
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            text-red-700
                        "
                    >
                        Esta acción eliminará únicamente esta relación entre los dos productos.
                    </div>

                    {/* Mensaje de error */}
                    {error && (
                        <div
                            className="
                                mt-5
                                rounded-md
                                border
                                border-red-300
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                text-red-700
                            "
                        >
                            {error}
                        </div>
                    )}

                    {/* Mensaje de éxito */}
                    {mensaje && (
                        <div
                            className="
                                mt-5
                                rounded-md
                                border
                                border-green-300
                                bg-green-50
                                px-4
                                py-3
                                text-sm
                                text-green-700
                            "
                        >
                            {mensaje}
                        </div>
                    )}

                    {/* Botones */}
                    <div
                        className="
                            flex
                            flex-col-reverse
                            sm:flex-row
                            sm:justify-end
                            gap-3
                            mt-7
                        "
                    >

                        <button
                            type="button"
                            onClick={onCerrar}
                            disabled={cargando}
                            className="
                                px-5
                                py-2.5
                                rounded-md
                                border
                                border-[#D6D6CF]
                                text-[#3E4234]
                                hover:bg-[#F1F1EF]
                                transition-colors
                                cursor-pointer
                                disabled:opacity-60
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            onClick={eliminarProductoRelacionado}
                            disabled={cargando}
                            className="
                                px-5
                                py-2.5
                                rounded-md
                                bg-[#6B705C]
                                text-white
                                hover:bg-[#5B604E]
                                transition-colors
                                cursor-pointer
                                disabled:opacity-60
                            "
                        >
                            {cargando
                                ? "Eliminando..."
                                : "Eliminar relación"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}