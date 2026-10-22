
"use client";

import { useAuth } from "../context/AuthContext";
import SidebarCliente from "../components/SidebarCliente";

type Movimiento = {
    id: number;
    fecha: string;
    concepto: string;
    tipo: "ABONO" | "CARGO";
    categoria: "MONEDERO" | "PUNTOS";
    importe: string;
    puntos?: string;
};

const movimientosEjemplo: Movimiento[] = [
    {
        id: 1,
        fecha: "15 oct. 2026",
        concepto: "Abono por promoción",
        tipo: "ABONO",
        categoria: "PUNTOS",
        importe: "+$0.00",
        puntos: "+500 pts",
    },
    {
        id: 2,
        fecha: "12 oct. 2026",
        concepto: "Compra de pedido ENV-000125",
        tipo: "CARGO",
        categoria: "MONEDERO",
        importe: "-$1,250.00",
    },
    {
        id: 3,
        fecha: "8 oct. 2026",
        concepto: "Abono por recompensa",
        tipo: "ABONO",
        categoria: "PUNTOS",
        importe: "+$0.00",
        puntos: "+300 pts",
    },
    {
        id: 4,
        fecha: "2 oct. 2026",
        concepto: "Compra de pedido ENV-000098",
        tipo: "CARGO",
        categoria: "MONEDERO",
        importe: "-$450.00",
    },
];

function IconoMonedero() {
    return (
        <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
        >
            <rect x="3" y="6" width="18" height="15" rx="2" />
            <path d="M3 9h18" />
            <path d="M7 6V4.5A1.5 1.5 0 018.5 3H19" />
            <path d="M15 14h3" />
        </svg>
    );
}

function IconoPuntos() {
    return (
        <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
        >
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v5c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
            <path d="M4 10v5c0 1.7 3.6 3 8 3" />
            <path d="M4 15v4c0 1.7 3.6 3 8 3" />
            <circle cx="18" cy="17" r="4" />
            <path d="M18 15v4m-1.5-2.5h3" />
        </svg>
    );
}

function IconoNivel() {
    return (
        <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
        >
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
    );
}

function IconoMovimiento({ tipo }: { tipo: Movimiento["tipo"] }) {
    const esAbono = tipo === "ABONO";

    return (
        <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                esAbono
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
            }`}
        >
            <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                {esAbono ? (
                    <path d="M12 19V5m-7 7 7-7 7 7" />
                ) : (
                    <path d="M12 5v14m7-7-7 7-7-7" />
                )}
            </svg>
        </div>
    );
}

export default function MonederoPage() {
    const { usuario, autenticado } = useAuth();

    if (!autenticado || !usuario) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Inicia sesión para consultar tu monedero.
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
                                Monedero y lealtad
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Consulta tu saldo, tus puntos y tu nivel de lealtad.
                            </p>
                        </div>

                        {/* Saldo y nivel */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">

                            {/* Saldo disponible */}
                            <section className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-5 sm:p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-[#F1F1EF] text-[#3E4234] flex items-center justify-center shrink-0">
                                        <IconoMonedero />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Saldo disponible
                                        </p>
                                        <p className="text-3xl font-semibold text-[#3E4234] mt-1">
                                            $1,750.00
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Úsalo en tus próximas compras.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Nivel de lealtad */}
                            <section className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-11 h-11 rounded-lg bg-[#F1F1EF] text-[#6B705C] flex items-center justify-center shrink-0">
                                        <IconoNivel />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-500">
                                            Tu nivel de lealtad
                                        </p>
                                        <h2 className="text-xl font-semibold text-[#3E4234] mt-1">
                                            Plata
                                        </h2>

                                        <div className="flex justify-between gap-2 text-xs text-gray-500 mt-4 mb-2">
                                            <span>1,200 puntos</span>
                                            <span>2,500 puntos</span>
                                        </div>

                                        <div
                                            className="h-2.5 w-full rounded-full bg-[#E7E7E5] overflow-hidden"
                                            role="progressbar"
                                            aria-label="Progreso al siguiente nivel"
                                            aria-valuenow={48}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <div className="h-full w-[48%] rounded-full bg-[#6B705C]" />
                                        </div>

                                        <p className="text-xs text-gray-500 mt-2">
                                            Te faltan 1,300 puntos para llegar a Oro.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Resumen de puntos */}
                        <section className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-5 mb-7">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-lg bg-[#F1F1EF] text-[#6B705C] flex items-center justify-center">
                                    <IconoPuntos />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[#3E4234]">
                                        Mis puntos
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Acumulados en tu programa de lealtad
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-lg bg-[#F7F7F4] border border-[#E5E5E0] p-4">
                                    <p className="text-sm text-gray-500">
                                        Puntos disponibles
                                    </p>
                                    <p className="text-2xl font-semibold text-[#3E4234] mt-1">
                                        1,200 pts
                                    </p>
                                </div>

                                <div className="rounded-lg bg-[#F7F7F4] border border-[#E5E5E0] p-4">
                                    <p className="text-sm text-gray-500">
                                        Puntos próximos a vencer
                                    </p>
                                    <p className="text-2xl font-semibold text-[#3E4234] mt-1">
                                        300 pts
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Vencimiento de ejemplo: 31 dic. 2026
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Movimientos recientes */}
                        <section>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-[#3E4234]">
                                        Movimientos recientes
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Consulta los cambios de tu monedero y tus puntos.
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    Últimos movimientos
                                </span>
                            </div>

                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm overflow-hidden">
                                {movimientosEjemplo.map((movimiento, indice) => (
                                    <div
                                        key={movimiento.id}
                                        className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:px-5 ${
                                            indice !== movimientosEjemplo.length - 1
                                                ? "border-b border-[#E5E5E0]"
                                                : ""
                                        }`}
                                    >
                                        <IconoMovimiento tipo={movimiento.tipo} />

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[#3E4234]">
                                                {movimiento.concepto}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500">
                                                    {movimiento.fecha}
                                                </span>
                                                <span
                                                    className={`text-xs rounded-full px-2 py-0.5 ${
                                                        movimiento.categoria === "PUNTOS"
                                                            ? "bg-green-50 text-green-800"
                                                            : "bg-[#F1F1EF] text-[#626653]"
                                                    }`}
                                                >
                                                    {movimiento.categoria === "PUNTOS"
                                                        ? "Puntos"
                                                        : "Monedero"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="sm:text-right">
                                            <p
                                                className={`text-sm font-semibold ${
                                                    movimiento.tipo === "ABONO"
                                                        ? "text-green-700"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {movimiento.importe}
                                            </p>
                                            {movimiento.puntos && (
                                                <p className="text-xs text-green-700 mt-1">
                                                    {movimiento.puntos}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <p className="mt-5 text-xs text-gray-400">
                            Vista de demostración con datos de ejemplo.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
