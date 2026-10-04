"use client";

import { useState } from "react";

interface Categoria {
    id_categoria: number;
    nombre: string;
}

interface ModalEliminarCategoriaProps {
    categoria: Categoria;
    onCerrar: () => void;
    onEliminado: () => void;
}

export default function ModalEliminarCategoria({
    categoria,
    onCerrar,
    onEliminado,
}: ModalEliminarCategoriaProps) {

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const eliminarCategoria = async () => {

        try {

            setError("");
            setMensaje("");
            setCargando(true);

            const respuesta = await fetch(
                `${API_URL}/categorias/${categoria.id_categoria}/con-subcategorias`,
                {
                    method: "DELETE",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    datos.mensaje ||
                    "No fue posible eliminar la categoría"
                );

                return;
            }

            setMensaje(
                "Categoría eliminada correctamente"
            );

            onEliminado();

            setTimeout(() => {
                onCerrar();
            }, 1500);

        } catch (error) {

            console.error(
                "Error al eliminar categoría:",
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
                        Eliminar categoría
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
                        ¿Estás seguro de que deseas eliminar esta categoría?
                    </p>

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
                            Categoría
                        </p>

                        <p className="mt-1 font-medium text-[#3E4234]">
                            {categoria.nombre}
                        </p>
                    </div>

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
                        Esta acción también eliminará todas las
                        subcategorías asociadas a esta categoría.
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
                            onClick={eliminarCategoria}
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
                                : "Eliminar categoría"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}