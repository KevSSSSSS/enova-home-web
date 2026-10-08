"use client";

import { useState } from "react";

interface Pedido {
    id_pedido: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string | null;
    numero_pedido: string;
    estado: string;
    total: number | string;
}

interface ModalEliminarPedidoProps {
    abierto: boolean;
    pedido: Pedido;
    onCerrar: () => void;
    onEliminado: () => void;
}

export default function ModalEliminarPedido({
    abierto,
    pedido,
    onCerrar,
    onEliminado,
}: ModalEliminarPedidoProps) {

    const [eliminando, setEliminando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!abierto) {
        return null;
    }

    /*
     * ------------------------------------------------------------
     * Eliminar pedido
     * ------------------------------------------------------------
     */

    const eliminarPedido = async () => {

        try {

            setEliminando(true);
            setMensaje("");
            setError("");

            const respuesta = await fetch(
                `${API_URL}/pedidos/${pedido.id_pedido}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                throw new Error(
                    datos.response ||
                    "No se pudo eliminar el pedido"
                );

            }

            /*
             * ----------------------------------------------------
             * PEDIDO ELIMINADO CORRECTAMENTE
             * ----------------------------------------------------
             */

            setMensaje(
                datos.response ||
                "Pedido eliminado correctamente"
            );

            /*
             * Avisar al CRUD que el pedido
             * fue eliminado correctamente.
             */

            setTimeout(() => {

                onEliminado();

            }, 1800);

        } catch (error) {

            console.error(
                "Error al eliminar pedido:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al eliminar el pedido"
            );

        } finally {

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

                {/* =================================================
                    ENCABEZADO
                ================================================== */}

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
                            Eliminar pedido
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-[#6B705C]
                            "
                        >
                            Confirma la eliminación del pedido.
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

                {/* =================================================
                    CONTENIDO
                ================================================== */}

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

                    {/* =================================================
                        INFORMACIÓN DEL PEDIDO
                    ================================================== */}

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
                                    ID del pedido
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {pedido.id_pedido}
                                </p>

                            </div>

                            {/* NÚMERO DE PEDIDO */}

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
                                    Número de pedido
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {pedido.numero_pedido}
                                </p>

                            </div>

                            {/* CLIENTE */}

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
                                    Cliente
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {pedido.nombre}{" "}
                                    {pedido.apellido_paterno}{" "}
                                    {pedido.apellido_materno || ""}
                                </p>

                            </div>

                            {/* ESTADO */}

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
                                    Estado
                                </span>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                    "
                                >
                                    {pedido.estado}
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
                        ¿Estás seguro de que deseas eliminar este pedido?
                    </p>

                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-500
                        "
                    >
                        El pedido será eliminado de la lista de pedidos,
                        pero permanecerá registrado en el sistema.
                    </p>

                </div>

                {/* =================================================
                    BOTONES
                ================================================== */}

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
                        onClick={eliminarPedido}
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
                            : "Eliminar pedido"}
                    </button>

                </div>

            </div>

        </div>
    );
}