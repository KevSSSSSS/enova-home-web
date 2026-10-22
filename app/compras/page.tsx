
"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SidebarCliente from "../components/SidebarCliente";

type FiltroCompra = "TODAS" | "EN_CURSO" | "COMPLETADAS" | "CANCELADAS";

type Compra = {
    id: string;
    fecha: string;
    productos: string;
    total: string;
    estado: FiltroCompra | "PENDIENTE" | "EN_PREPARACION" | "EN_CAMINO";
};

const comprasEjemplo: Compra[] = [
    {
        id: "ENV-000125",
        fecha: "15 de octubre de 2026",
        productos: "Compra de ejemplo",
        total: "$2,499.00",
        estado: "EN_PREPARACION",
    },
    {
        id: "ENV-000098",
        fecha: "8 de octubre de 2026",
        productos: "Compra de ejemplo",
        total: "$1,850.00",
        estado: "COMPLETADAS",
    },
    {
        id: "ENV-000076",
        fecha: "2 de octubre de 2026",
        productos: "Compra de ejemplo",
        total: "$950.00",
        estado: "CANCELADAS",
    },
];

const filtros: { etiqueta: string; valor: FiltroCompra }[] = [
    { etiqueta: "Todas", valor: "TODAS" },
    { etiqueta: "En curso", valor: "EN_CURSO" },
    { etiqueta: "Completadas", valor: "COMPLETADAS" },
    { etiqueta: "Canceladas", valor: "CANCELADAS" },
];

function obtenerEstado(estado: Compra["estado"]) {
    switch (estado) {
        case "PENDIENTE":
            return { texto: "Pedido pendiente", color: "bg-amber-50 text-amber-800" };
        case "EN_PREPARACION":
            return { texto: "En preparación", color: "bg-blue-50 text-blue-800" };
        case "EN_CAMINO":
            return { texto: "En camino", color: "bg-indigo-50 text-indigo-800" };
        case "COMPLETADAS":
            return { texto: "Compra completada", color: "bg-green-50 text-green-800" };
        case "CANCELADAS":
            return { texto: "Pedido cancelado", color: "bg-red-50 text-red-800" };
        default:
            return { texto: "Estado pendiente", color: "bg-gray-100 text-gray-700" };
    }
}

function esCompraEnCurso(estado: Compra["estado"]) {
    return ["PENDIENTE", "EN_PREPARACION", "EN_CAMINO"].includes(estado);
}

function IconoPaquete() {
    return (
        <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
        >
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 8 9 5 9-5" />
            <path d="M3 8v9l9 5 9-5V8" />
            <path d="M12 13v9" />
        </svg>
    );
}

function IconoEstado({ completado = false }: { completado?: boolean }) {
    return completado ? (
        <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 3 3 5-6" />
        </svg>
    ) : (
        <span className="w-3 h-3 rounded-full border-2 border-current inline-block" />
    );
}

function SeguimientoPedido({ estado }: { estado: Compra["estado"] }) {
    const etapas = [
        { texto: "Pedido recibido", estados: ["PENDIENTE", "EN_PREPARACION", "EN_CAMINO"] },
        { texto: "En preparación", estados: ["EN_PREPARACION", "EN_CAMINO"] },
        { texto: "En camino", estados: ["EN_CAMINO"] },
        { texto: "Entregado", estados: [] },
    ];

    const indiceActual =
        estado === "PENDIENTE" ? 0 :
        estado === "EN_PREPARACION" ? 1 :
        estado === "EN_CAMINO" ? 2 : -1;

    return (
        <div className="mt-5 border-t border-[#E5E5E0] pt-5">
            <h3 className="text-sm font-semibold text-[#3E4234] mb-4">
                Seguimiento del pedido
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {etapas.map((etapa, indice) => {
                    const activa = indiceActual >= indice;

                    return (
                        <div key={etapa.texto} className="flex items-start gap-2">
                            <div className={activa ? "text-[#6B705C]" : "text-gray-300"}>
                                <IconoEstado completado={indice < indiceActual} />
                            </div>
                            <p className={`text-xs leading-5 ${activa ? "text-[#3E4234] font-medium" : "text-gray-400"}`}>
                                {etapa.texto}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function ComprasPage() {
    const { usuario, autenticado } = useAuth();
    const [filtro, setFiltro] = useState<FiltroCompra>("TODAS");

    const comprasFiltradas = comprasEjemplo.filter((compra) => {
        if (filtro === "TODAS") return true;
        if (filtro === "EN_CURSO") return esCompraEnCurso(compra.estado);
        return compra.estado === filtro;
    });

    if (!autenticado || !usuario) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Inicia sesión para consultar tus compras.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-8 sm:pb-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                <SidebarCliente />

                <div className="flex-1 min-w-0 w-full md:pl-8">
                    <div className="w-full max-w-5xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Mis compras
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Consulta tus compras y revisa el estado de tus pedidos.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {filtros.map((opcion) => (
                                <button
                                    key={opcion.valor}
                                    type="button"
                                    onClick={() => setFiltro(opcion.valor)}
                                    className={`px-4 py-2.5 rounded-full text-sm border transition-colors cursor-pointer ${
                                        filtro === opcion.valor
                                            ? "bg-[#3E4234] text-white border-[#3E4234]"
                                            : "bg-white text-[#3E4234] border-[#D6D6CF] hover:bg-[#F1F1EF]"
                                    }`}
                                >
                                    {opcion.etiqueta}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-5">
                            {comprasFiltradas.map((compra) => {
                                const estado = obtenerEstado(compra.estado);
                                const enCurso = esCompraEnCurso(compra.estado);

                                return (
                                    <article
                                        key={compra.id}
                                        className="bg-white rounded-lg shadow-sm border border-[#D6D6CF] overflow-hidden"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#F5F5F2] px-5 py-4 border-b border-[#D6D6CF]">
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Número de pedido
                                                </p>
                                                <p className="font-semibold text-[#3E4234]">
                                                    {compra.id}
                                                </p>
                                            </div>

                                            <span className="text-sm text-gray-600">
                                                {compra.fecha}
                                            </span>

                                            <span className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-medium ${estado.color}`}>
                                                {estado.texto}
                                            </span>
                                        </div>

                                        <div className="p-5">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className="w-16 h-16 shrink-0 rounded-lg bg-[#F1F1EF] flex items-center justify-center text-[#6B705C]">
                                                    <IconoPaquete />
                                                </div>

                                                <div className="flex-1">
                                                    <h2 className="font-semibold text-[#3E4234]">
                                                        {compra.productos}
                                                    </h2>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Resumen de la compra
                                                    </p>
                                                </div>

                                                <div className="sm:text-right">
                                                    <p className="text-xs text-gray-500">
                                                        Total de la compra
                                                    </p>
                                                    <p className="text-xl font-semibold text-[#3E4234] mt-1">
                                                        {compra.total}
                                                    </p>
                                                </div>
                                            </div>

                                            {enCurso && (
                                                <SeguimientoPedido estado={compra.estado} />
                                            )}

                                            {compra.estado === "COMPLETADAS" && (
                                                <div className="mt-5 border-t border-[#E5E5E0] pt-4 flex items-center gap-2 text-sm text-green-800">
                                                    <IconoEstado completado />
                                                    Compra completada
                                                </div>
                                            )}

                                            {compra.estado === "CANCELADAS" && (
                                                <div className="mt-5 border-t border-[#E5E5E0] pt-4 flex items-center gap-2 text-sm text-red-700">
                                                    <IconoEstado />
                                                    Este pedido fue cancelado.
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}

                            {comprasFiltradas.length === 0 && (
                                <div className="bg-white rounded-lg border border-[#D6D6CF] px-6 py-12 text-center">
                                    <div className="flex justify-center text-[#6B705C] mb-4">
                                        <IconoPaquete />
                                    </div>
                                    <h2 className="text-lg font-semibold text-[#3E4234]">
                                        No hay compras en esta categoría
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Aquí aparecerán tus compras cuando estén disponibles.
                                    </p>
                                </div>
                            )}
                        </div>

                        <p className="mt-5 text-xs text-gray-400">
                            Vista de demostración con datos de ejemplo.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
