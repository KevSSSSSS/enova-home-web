
"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SidebarCliente from "../components/SidebarCliente";

type Envio = {
    id: number;
    numeroPedido: string;
    fechaPedido: string;
    paqueteria: string | null;
    numeroGuia: string | null;
    urlSeguimiento: string | null;
    estadoEnvio: "PENDIENTE" | "ENVIADO" | "ENTREGADO";
};

const enviosIniciales: Envio[] = [
    {
        id: 125,
        numeroPedido: "ENV-000125",
        fechaPedido: "15 de octubre de 2026",
        paqueteria: null,
        numeroGuia: null,
        urlSeguimiento: null,
        estadoEnvio: "PENDIENTE",
    },
    {
        id: 98,
        numeroPedido: "ENV-000098",
        fechaPedido: "8 de octubre de 2026",
        paqueteria: "DHL",
        numeroGuia: "DEMO123456789",
        urlSeguimiento: "https://www.dhl.com/mx-es/home/rastreo.html",
        estadoEnvio: "ENVIADO",
    },
    {
        id: 76,
        numeroPedido: "ENV-000076",
        fechaPedido: "2 de octubre de 2026",
        paqueteria: null,
        numeroGuia: null,
        urlSeguimiento: null,
        estadoEnvio: "PENDIENTE",
    },
];

function IconoPaquete() {
    return (
        <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 8 9 5 9-5" />
            <path d="M12 13v9M3 8v10l9 4 9-4V8" />
        </svg>
    );
}

function IconoGuia() {
    return (
        <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 8v8M10 8v8M14 8v8M17 8v8" />
        </svg>
    );
}

function IconoCamion() {
    return (
        <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M3 6h11v12H3z" />
            <path d="M14 10h4l3 4v4h-7" />
            <circle cx="7.5" cy="18" r="2" />
            <circle cx="17.5" cy="18" r="2" />
        </svg>
    );
}

function IconoEnlace() {
    return (
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M14 3h7v7" />
            <path d="m21 3-9 9" />
            <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
        </svg>
    );
}

function EstadoEnvio({ estado }: { estado: Envio["estadoEnvio"] }) {
    const configuracion = {
        PENDIENTE: {
            texto: "Guía por asignar",
            clases: "bg-amber-50 text-amber-800",
        },
        ENVIADO: {
            texto: "Enviado",
            clases: "bg-blue-50 text-blue-800",
        },
        ENTREGADO: {
            texto: "Entregado",
            clases: "bg-green-50 text-green-800",
        },
    };

    const actual = configuracion[estado];

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${actual.clases}`}
        >
            {actual.texto}
        </span>
    );
}

export default function MisEnviosPage() {
    const { usuario, autenticado } = useAuth();

    const [envios] = useState<Envio[]>(enviosIniciales);
    const [filtro, setFiltro] = useState<
        "TODOS" | "PENDIENTES" | "ENVIADOS" | "ENTREGADOS"
    >("TODOS");

    if (!autenticado || !usuario) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Inicia sesión para consultar tus envíos.
                    </p>
                </div>
            </main>
        );
    }

    const enviosFiltrados = envios.filter((envio) => {
        if (filtro === "PENDIENTES") {
            return envio.estadoEnvio === "PENDIENTE";
        }

        if (filtro === "ENVIADOS") {
            return envio.estadoEnvio === "ENVIADO";
        }

        if (filtro === "ENTREGADOS") {
            return envio.estadoEnvio === "ENTREGADO";
        }

        return true;
    });

    return (
        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-8 sm:pb-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                <SidebarCliente />

                <div className="flex-1 min-w-0 w-full md:pl-8">
                    <div className="w-full max-w-5xl mx-auto">
                        {/* Encabezado */}
                        <header className="mb-8">
                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Mis envíos
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Consulta los números de guía, la paquetería y el seguimiento de tus pedidos.
                            </p>
                        </header>

                        {/* Resumen */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-4">
                                <p className="text-sm text-gray-500">
                                    Total de pedidos
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {envios.length}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-4">
                                <p className="text-sm text-gray-500">
                                    Guías pendientes
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {
                                        envios.filter(
                                            (envio) =>
                                                envio.estadoEnvio === "PENDIENTE"
                                        ).length
                                    }
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-4">
                                <p className="text-sm text-gray-500">
                                    Envíos con guía
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {
                                        envios.filter(
                                            (envio) =>
                                                envio.numeroGuia !== null
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            {[
                                { valor: "TODOS", texto: "Todos" },
                                {
                                    valor: "PENDIENTES",
                                    texto: "Guías pendientes",
                                },
                                { valor: "ENVIADOS", texto: "Enviados" },
                                {
                                    valor: "ENTREGADOS",
                                    texto: "Entregados",
                                },
                            ].map((opcion) => (
                                <button
                                    key={opcion.valor}
                                    type="button"
                                    onClick={() =>
                                        setFiltro(
                                            opcion.valor as typeof filtro
                                        )
                                    }
                                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                                        filtro === opcion.valor
                                            ? "border-[#3E4234] bg-[#3E4234] text-white"
                                            : "border-[#D6D6CF] bg-white text-[#3E4234] hover:bg-[#F5F5F2]"
                                    }`}
                                >
                                    {opcion.texto}
                                </button>
                            ))}
                        </div>

                        {/* Lista de envíos */}
                        <section className="space-y-4">
                            {enviosFiltrados.length === 0 ? (
                                <div className="rounded-xl border border-[#D6D6CF] bg-white p-8 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#F1F1EF] text-[#6B705C]">
                                        <IconoPaquete />
                                    </div>
                                    <h2 className="mt-4 text-lg font-semibold text-[#3E4234]">
                                        No hay envíos en esta categoría
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Cuando tengas pedidos que coincidan con este filtro, aparecerán aquí.
                                    </p>
                                </div>
                            ) : (
                                enviosFiltrados.map((envio) => (
                                    <article
                                        key={envio.id}
                                        className="overflow-hidden rounded-xl border border-[#D6D6CF] bg-white shadow-sm"
                                    >
                                        {/* Encabezado de pedido */}
                                        <div className="flex flex-col gap-3 border-b border-[#D6D6CF] bg-[#F5F5F2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Número de pedido
                                                </p>
                                                <h2 className="font-semibold text-[#3E4234]">
                                                    {envio.numeroPedido}
                                                </h2>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Fecha de compra: {envio.fechaPedido}
                                                </p>
                                            </div>

                                            <EstadoEnvio
                                                estado={envio.estadoEnvio}
                                            />
                                        </div>

                                        {/* Información logística */}
                                        <div className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F1F1EF] text-[#6B705C]">
                                                    <IconoPaquete />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-base font-semibold text-[#3E4234]">
                                                        Información del envío
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Consulta los datos logísticos de tu pedido.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                {/* Número de guía */}
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 text-gray-500">
                                                        <IconoGuia />
                                                        <p className="text-sm">
                                                            Número de guía
                                                        </p>
                                                    </div>

                                                    <p className="mt-2 break-all font-semibold text-[#3E4234]">
                                                        {envio.numeroGuia ??
                                                            "Por asignar"}
                                                    </p>
                                                </div>

                                                {/* Paquetería */}
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 text-gray-500">
                                                        <IconoCamion />
                                                        <p className="text-sm">
                                                            Paquetería
                                                        </p>
                                                    </div>

                                                    <p className="mt-2 font-semibold text-[#3E4234]">
                                                        {envio.paqueteria ??
                                                            "Pendiente de asignación"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-5 border-t border-[#E5E5E0] pt-5">
                                                {envio.numeroGuia &&
                                                envio.urlSeguimiento ? (
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-[#3E4234]">
                                                                Consulta el seguimiento
                                                            </p>
                                                            <p className="mt-1 text-xs text-gray-500">
                                                                Abre la página oficial de la paquetería para consultar tu guía.
                                                            </p>
                                                        </div>

                                                        <a
                                                            href={envio.urlSeguimiento}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3E4234] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#525744]"
                                                        >
                                                            Consultar envío
                                                            <IconoEnlace />
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div className="rounded-lg border border-[#E5E5E0] bg-[#FAFAF8] p-4">
                                                        <p className="text-sm font-medium text-[#3E4234]">
                                                            Información de envío pendiente
                                                        </p>
                                                        <p className="mt-1 text-sm leading-relaxed text-gray-500">
                                                            El número de guía, la paquetería y el enlace de seguimiento estarán disponibles cuando se asignen los datos del envío.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                ))
                            )}
                        </section>

                        <p className="mt-5 text-xs leading-relaxed text-gray-400">
                            Vista de demostración con datos de ejemplo. Los números de guía y las paqueterías todavía no están conectados al backend.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
