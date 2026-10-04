"use client";

import { useState } from "react";

interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string | null;
    email: string;
}

interface ModalEliminarClienteProps {
    cliente: Cliente;
    onCerrar: () => void;
    onEliminado: () => void;
}

export default function ModalEliminarCliente({
    cliente,
    onCerrar,
    onEliminado,
}: ModalEliminarClienteProps) {

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const eliminarCliente = async () => {

        try {

            setError("");
            setCargando(true);

            const respuesta = await fetch(
                `${API_URL}/clientes/${cliente.id_cliente}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    "No fue posible eliminar el cliente"
                );

                return;
            }

            /*
             * Avisar a clientes/page.tsx
             * que el cliente fue eliminado.
             */
            onEliminado();

            /*
             * Cerrar modal
             */
            onCerrar();

        } catch (error) {

            console.error(
                "Error al eliminar cliente:",
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
                z-[110]
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
                    max-w-md
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
                        Eliminar cliente
                    </h2>

                    {/* Cerrar */}
                    <button
                        type="button"
                        onClick={onCerrar}
                        disabled={cargando}
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
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>

                </div>

                {/* Contenido */}
                <div className="p-6">

                    <p className="text-[#3E4234]">
                        ¿Estás seguro de que deseas eliminar al siguiente cliente?
                    </p>

                    {/* Información del cliente */}
                    <div
                        className="
                            mt-5
                            rounded-md
                            bg-[#F7F5F2]
                            border
                            border-[#D6D6CF]
                            px-4
                            py-4
                        "
                    >

                        <p className="font-semibold text-[#3E4234]">
                            {cliente.nombre}{" "}
                            {cliente.apellido_paterno}
                        </p>

                        {cliente.apellido_materno && (
                            <p className="text-sm text-[#6B705C]">
                                {cliente.apellido_materno}
                            </p>
                        )}

                        <p className="mt-2 text-sm text-[#6B705C]">
                            {cliente.email}
                        </p>

                    </div>

                    {/* Advertencia */}
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
                        Esta acción eliminará definitivamente al cliente y todas
                        sus direcciones, y no podrá deshacerse.
                    </div>

                    {/* Error */}
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

                    {/* Botones */}
                    <div
                        className="
                            flex
                            flex-col-reverse
                            sm:flex-row
                            sm:justify-end
                            gap-3
                            mt-6
                        "
                    >

                        {/* Cancelar */}
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
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            Cancelar
                        </button>

                        {/* Eliminar */}
                        <button
                            type="button"
                            onClick={eliminarCliente}
                            disabled={cargando}
                            className="
                                px-5
                                py-2.5
                                rounded-md
                                bg-red-600
                                text-white
                                hover:bg-red-700
                                transition-colors
                                cursor-pointer
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {cargando
                                ? "Eliminando..."
                                : "Eliminar"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}