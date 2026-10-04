"use client";

import { useState } from "react";

interface Producto {
    id_producto: number;
    nombre: string;

    subcategoria: {
        idSubcategoria: number;
        nombre: string;

        categoria: {
            idCategoria: number;
            nombre: string;
        };
    };
}

interface ModalEliminarProductoProps {
    abierto: boolean;
    producto: Producto;
    onCerrar: () => void;
    onEliminado: () => void;
}

export default function ModalEliminarProducto({
    abierto,
    producto,
    onCerrar,
    onEliminado,
}: ModalEliminarProductoProps) {

    const [eliminando, setEliminando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!abierto) {
        return null;
    }

    const eliminarProducto = async () => {
        try {
            setEliminando(true);
            setMensaje("");
            setError("");

            const respuesta = await fetch(
                `${API_URL}/productos/${producto.id_producto}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {
                throw new Error(
                    datos.response || "No se pudo eliminar el producto"
                );
            }

            setMensaje(
                datos.response || "Producto eliminado correctamente"
            );

            setTimeout(() => {
                onEliminado();
            }, 1800);

        } catch (error) {

            console.error(
                "Error al eliminar producto:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al eliminar el producto"
            );

            setEliminando(false);
        }
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                px-4
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-lg
                    bg-white
                    shadow-xl
                    overflow-hidden
                "
            >

                {/* ENCABEZADO */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-[#D6D6CF]
                        bg-[#E7E7E5]
                        px-6
                        py-5
                    "
                >

                    <div>

                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-[#3E4234]
                            "
                        >
                            Eliminar producto
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-[#6B705C]
                            "
                        >
                            Confirma la eliminación del producto.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onCerrar}
                        disabled={eliminando}
                        className="
                            text-[#6B705C]
                            hover:text-[#3E4234]
                            transition-colors
                        "
                    >
                        ×
                    </button>

                </div>

                {/* CONTENIDO */}

                <div className="px-6 py-6">

                    {mensaje && (
                        <div
                            className="
                                mb-5
                                rounded
                                border
                                border-green-200
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

                    {error && (
                        <div
                            className="
                                mb-5
                                rounded
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                text-red-600
                            "
                        >
                            {error}
                        </div>
                    )}

                    {/* INFORMACIÓN DEL PRODUCTO */}

                    <div
                        className="
                            rounded
                            border
                            border-[#D6D6CF]
                            bg-[#F8F8F6]
                            p-4
                        "
                    >

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            "
                        >

                            {/* ID */}

                            <div>

                                <span
                                    className="
                                        block
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-[#6B705C]
                                    "
                                >
                                    ID del producto
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {producto.id_producto}
                                </p>

                            </div>

                            {/* NOMBRE */}

                            <div>

                                <span
                                    className="
                                        block
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-[#6B705C]
                                    "
                                >
                                    Nombre
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {producto.nombre}
                                </p>

                            </div>

                            {/* CATEGORÍA */}

                            <div>

                                <span
                                    className="
                                        block
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-[#6B705C]
                                    "
                                >
                                    Categoría
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {producto.subcategoria?.categoria?.nombre ||
                                        "Sin categoría"}
                                </p>

                            </div>

                            {/* SUBCATEGORÍA */}

                            <div>

                                <span
                                    className="
                                        block
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-[#6B705C]
                                    "
                                >
                                    Subcategoría
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {producto.subcategoria?.nombre ||
                                        "Sin subcategoría"}
                                </p>

                            </div>

                        </div>

                    </div>

                    <p
                        className="
                            mt-5
                            text-sm
                            leading-6
                            text-[#3E4234]
                        "
                    >
                        ¿Estás seguro de que deseas eliminar este producto?
                    </p>

                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-500
                        "
                    >
                        Esta acción eliminará el producto y sus registros
                        relacionados, incluyendo especificaciones, imágenes,
                        variantes y valores asociados.
                    </p>

                </div>

                {/* BOTONES */}

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-[#D6D6CF]
                        px-6
                        py-4
                    "
                >

                    <button
                        type="button"
                        onClick={onCerrar}
                        disabled={eliminando}
                        className="
                            rounded
                            border
                            border-[#D6D6CF]
                            px-5
                            py-2.5
                            text-sm
                            text-[#3E4234]
                            hover:bg-[#F5F5F2]
                            transition-colors
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={eliminarProducto}
                        disabled={eliminando}
                        className="
                            rounded
                            bg-red-600
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            hover:bg-red-700
                            disabled:opacity-50
                            transition-colors
                        "
                    >
                        {eliminando
                            ? "Eliminando..."
                            : "Eliminar producto"}
                    </button>

                </div>

            </div>

        </div>
    );
}
