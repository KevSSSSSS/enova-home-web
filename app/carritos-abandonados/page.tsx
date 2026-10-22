
"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SidebarCliente from "../components/SidebarCliente";

type FiltroCarrito = "TODOS" | "PENDIENTES" | "RECUPERADOS";

type Carrito = {
    id: string;
    fecha: string;
    productos: string[];
    cantidad: number;
    subtotal: string;
    estado: "PENDIENTE" | "RECUPERADO";
};

const carritosEjemplo: Carrito[] = [
    {
        id: "CAR-000125",
        fecha: "20 de octubre de 2026",
        productos: ["Juego de comedor", "Centro de mesa"],
        cantidad: 2,
        subtotal: "$3,450.00",
        estado: "PENDIENTE",
    },
    {
        id: "CAR-000098",
        fecha: "18 de octubre de 2026",
        productos: ["Organizador de cocina"],
        cantidad: 1,
        subtotal: "$850.00",
        estado: "PENDIENTE",
    },
    {
        id: "CAR-000076",
        fecha: "12 de octubre de 2026",
        productos: ["Lámpara decorativa", "Repisa de pared"],
        cantidad: 2,
        subtotal: "$1,299.00",
        estado: "RECUPERADO",
    },
];

const filtros: { etiqueta: string; valor: FiltroCarrito }[] = [
    { etiqueta: "Todos", valor: "TODOS" },
    { etiqueta: "Pendientes", valor: "PENDIENTES" },
    { etiqueta: "Recuperados", valor: "RECUPERADOS" },
];

function IconoCarrito() {
    return (
        <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
        >
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2 3h2l2.5 12h12.8l2-9H5" />
        </svg>
    );
}

function IconoProducto() {
    return (
        <svg
            className="w-7 h-7"
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

export default function CarritosAbandonadosPage() {
    const { usuario, autenticado } = useAuth();

    const [filtro, setFiltro] = useState<FiltroCarrito>("TODOS");

    const carritosFiltrados = carritosEjemplo.filter((carrito) => {
        if (filtro === "TODOS") return true;
        if (filtro === "PENDIENTES") return carrito.estado === "PENDIENTE";
        return carrito.estado === "RECUPERADO";
    });

    const totalPendientes = carritosEjemplo.filter(
        (carrito) => carrito.estado === "PENDIENTE"
    ).length;

    const totalRecuperados = carritosEjemplo.filter(
        (carrito) => carrito.estado === "RECUPERADO"
    ).length;

    if (!autenticado || !usuario) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Inicia sesión para consultar tus carritos.
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

                        {/* Encabezado */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Carritos abandonados
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Consulta los productos que quedaron pendientes en tus carritos.
                            </p>
                        </div>

                        {/* Resumen */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#F1F1EF] text-[#6B705C] flex items-center justify-center shrink-0">
                                    <IconoCarrito />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Carritos pendientes
                                    </p>
                                    <p className="text-2xl font-semibold text-[#3E4234] mt-1">
                                        {totalPendientes}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#F1F1EF] text-[#6B705C] flex items-center justify-center shrink-0">
                                    <IconoProducto />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Carritos recuperados
                                    </p>
                                    <p className="text-2xl font-semibold text-[#3E4234] mt-1">
                                        {totalRecuperados}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Filtros */}
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

                        {/* Lista de carritos */}
                        <div className="space-y-5">
                            {carritosFiltrados.map((carrito) => (
                                <article
                                    key={carrito.id}
                                    className="bg-white rounded-lg shadow-sm border border-[#D6D6CF] overflow-hidden"
                                >
                                    {/* Encabezado de tarjeta */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#F5F5F2] px-5 py-4 border-b border-[#D6D6CF]">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Identificador del carrito
                                            </p>
                                            <p className="font-semibold text-[#3E4234]">
                                                {carrito.id}
                                            </p>
                                        </div>

                                        <span className="text-sm text-gray-600">
                                            {carrito.fecha}
                                        </span>

                                        <span
                                            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-medium ${
                                                carrito.estado === "PENDIENTE"
                                                    ? "bg-amber-50 text-amber-800"
                                                    : "bg-green-50 text-green-800"
                                            }`}
                                        >
                                            {carrito.estado === "PENDIENTE"
                                                ? "Pendiente"
                                                : "Recuperado"}
                                        </span>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <div className="w-16 h-16 shrink-0 rounded-lg bg-[#F1F1EF] flex items-center justify-center text-[#6B705C]">
                                                <IconoCarrito />
                                            </div>

                                            <div className="flex-1">
                                                <h2 className="font-semibold text-[#3E4234]">
                                                    Productos del carrito
                                                </h2>

                                                <ul className="mt-2 space-y-1">
                                                    {carrito.productos.map((producto) => (
                                                        <li
                                                            key={producto}
                                                            className="text-sm text-gray-600"
                                                        >
                                                            {producto}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <p className="text-xs text-gray-500 mt-2">
                                                    {carrito.cantidad}{" "}
                                                    {carrito.cantidad === 1
                                                        ? "producto"
                                                        : "productos"}
                                                </p>
                                            </div>

                                            <div className="sm:text-right">
                                                <p className="text-xs text-gray-500">
                                                    Subtotal
                                                </p>
                                                <p className="text-xl font-semibold text-[#3E4234] mt-1">
                                                    {carrito.subtotal}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 border-t border-[#E5E5E0] pt-4">
                                            {carrito.estado === "PENDIENTE" ? (
                                                <p className="text-sm text-amber-800 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                                                    Tienes productos pendientes en este carrito.
                                                </p>
                                            ) : (
                                                <p className="text-sm text-green-800 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-green-600" />
                                                    Este carrito ya fue recuperado.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}

                            {carritosFiltrados.length === 0 && (
                                <div className="bg-white rounded-lg border border-[#D6D6CF] px-6 py-12 text-center">
                                    <div className="flex justify-center text-[#6B705C] mb-4">
                                        <IconoCarrito />
                                    </div>

                                    <h2 className="text-lg font-semibold text-[#3E4234]">
                                        No hay carritos en esta categoría
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-2">
                                        Aquí aparecerán los carritos correspondientes a este filtro.
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
