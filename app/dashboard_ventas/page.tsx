"use client";

import { useAuth } from "../context/AuthContext";
import SidebarAdministrador from "../components/SidebarAdministrador";

const ventasMensuales = [
    { mes: "May", ventas: 72000 },
    { mes: "Jun", ventas: 86500 },
    { mes: "Jul", ventas: 79000 },
    { mes: "Ago", ventas: 103000 },
    { mes: "Sep", ventas: 112000 },
    { mes: "Oct", ventas: 128450 },
];

const estadosPedidos = [
    { nombre: "Entregados", cantidad: 112, porcentaje: 60, color: "bg-[#6B8065]" },
    { nombre: "Pendientes", cantidad: 38, porcentaje: 20, color: "bg-[#C6A66B]" },
    { nombre: "En preparación", cantidad: 24, porcentaje: 13, color: "bg-[#8299A4]" },
    { nombre: "Cancelados", cantidad: 12, porcentaje: 7, color: "bg-[#B77972]" },
];

const productosMasVendidos = [
    { nombre: "Juego de comedor", categoria: "Mesa y comedor", unidades: 48, ventas: 38400 },
    { nombre: "Organizador de cocina", categoria: "Cocina", unidades: 36, ventas: 10800 },
    { nombre: "Espejo decorativo", categoria: "Baño", unidades: 29, ventas: 14500 },
    { nombre: "Lámpara de mesa", categoria: "Decoración", unidades: 24, ventas: 9600 },
    { nombre: "Organizador de clóset", categoria: "Recámara", unidades: 21, ventas: 7350 },
];

const pedidosRecientes = [
    { numero: "ENV-2026-0186", cliente: "María González", fecha: "19 oct. 2026", estado: "Entregado", total: 2499 },
    { numero: "ENV-2026-0185", cliente: "Carlos Ramírez", fecha: "19 oct. 2026", estado: "Pendiente", total: 1850 },
    { numero: "ENV-2026-0184", cliente: "Ana Martínez", fecha: "18 oct. 2026", estado: "En preparación", total: 3290 },
    { numero: "ENV-2026-0183", cliente: "Luis Hernández", fecha: "18 oct. 2026", estado: "Entregado", total: 1250 },
];

const formatoMoneda = (cantidad: number) =>
    cantidad.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 2,
    });

function Icono({
    tipo,
}: {
    tipo: "ventas" | "pedidos" | "ticket" | "clientes" | "grafica" | "flecha";
}) {
    const atributos = {
        className: "w-6 h-6",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    return (
        <svg {...atributos}>
            {tipo === "ventas" && (
                <>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M7 15h4" />
                </>
            )}

            {tipo === "pedidos" && (
                <>
                    <path d="M5 4h14v16H5z" />
                    <path d="M8 8h8M8 12h8M8 16h5" />
                </>
            )}

            {tipo === "ticket" && (
                <>
                    <path d="M12 3v18M16 7.5c-.7-1-2-1.5-4-1.5-2.2 0-4 1.1-4 3s1.8 3 4 3 4 1.1 4 3-1.8 3-4 3c-2 0-3.3-.5-4-1.5" />
                </>
            )}

            {tipo === "clientes" && (
                <>
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3 20c.5-3.5 2.5-5.5 6-5.5s5.5 2 6 5.5" />
                    <path d="M16 5.5a3 3 0 010 5.5M17 14c2.2.5 3.5 2.5 4 5" />
                </>
            )}

            {tipo === "grafica" && (
                <>
                    <path d="M4 19V5M4 19h16" />
                    <path d="m7 15 4-4 3 2 5-6" />
                </>
            )}

            {tipo === "flecha" && (
                <>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </>
            )}
        </svg>
    );
}

function TarjetaIndicador({
    titulo,
    valor,
    detalle,
    icono,
    variacion,
}: {
    titulo: string;
    valor: string;
    detalle: string;
    icono: "ventas" | "pedidos" | "ticket" | "clientes";
    variacion?: string;
}) {
    return (
        <div className="bg-white rounded-xl border border-[#D6D6CF] p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm text-gray-500">{titulo}</p>
                    <p className="mt-3 text-2xl xl:text-3xl font-semibold text-[#3E4234] tracking-tight">
                        {valor}
                    </p>
                </div>

                <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F1F1EF] text-[#6B705C]">
                    <Icono tipo={icono} />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                {variacion && (
                    <span className="text-xs font-semibold text-[#547354] bg-[#EDF3EB] px-2 py-1 rounded-md">
                        {variacion}
                    </span>
                )}

                <span className="text-xs text-gray-500">{detalle}</span>
            </div>
        </div>
    );
}

export default function DashboardVentasPage() {
    const { usuario, rol, autenticado } = useAuth();

    const nombreRol = rol?.nombre_rol?.trim().toUpperCase();
    const esAdministrador = nombreRol === "ADMINISTRADOR";

    if (!autenticado || !usuario) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-12">
                <div className="max-w-md w-full text-center bg-white border border-[#D6D6CF] rounded-xl p-8 shadow-sm">
                    <div className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#F1F1EF] text-[#6B705C]">
                        <Icono tipo="ventas" />
                    </div>

                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        Acceso restringido
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                        Inicia sesión con una cuenta autorizada para consultar
                        el Dashboard de Ventas.
                    </p>
                </div>
            </main>
        );
    }

    if (!esAdministrador) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-12">
                <div className="max-w-md w-full text-center bg-white border border-[#D6D6CF] rounded-xl p-8 shadow-sm">
                    <div className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#F7EEEE] text-[#A65E58]">
                        <Icono tipo="ventas" />
                    </div>

                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        Acceso denegado
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                        No tienes permisos para consultar el Dashboard de
                        Ventas. Esta sección está reservada para administradores.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-10 bg-[#F8F8F6]">
            <div className="flex flex-col md:flex-row gap-6 md:gap-0">
                <SidebarAdministrador />

                <div className="flex-1 min-w-0 w-full md:pl-7">
                    <div className="max-w-[1600px] mx-auto space-y-7">

                        {/* Encabezado */}
                        <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                {/*<div className="flex items-center gap-2 text-sm text-[#6B705C] mb-2">
                                    <span>Administración</span>
                                    <span>/</span>
                                    <span>Dashboard de Ventas</span>
                                </div>*/}

                                <h1 className="text-3xl sm:text-4xl font-semibold text-[#3E4234]">
                                    Dashboard de Ventas
                                </h1>

                                <p className="mt-2 text-sm sm:text-base text-gray-500">
                                    Consulta el resumen del rendimiento comercial de eNova Home.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 self-start lg:self-auto bg-white border border-[#D6D6CF] rounded-lg px-4 py-3">
                                <div className="flex items-center justify-center w-9 h-9 rounded-md bg-[#F1F1EF] text-[#6B705C]">
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                    >
                                        <rect x="3" y="5" width="18" height="16" rx="2" />
                                        <path d="M16 3v4M8 3v4M3 10h18" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Periodo de demostración</p>
                                    <p className="text-sm font-semibold text-[#3E4234]">
                                        Octubre 2026
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Aviso de maqueta */}
                        <div className="flex items-start gap-3 rounded-lg border border-[#E4D6B7] bg-[#FBF7ED] px-4 py-3">
                            <div className="text-[#987B45] mt-0.5">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 11v5M12 7h.01" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#665333]">
                                    Panel de demostración
                                </p>
                                <p className="text-xs sm:text-sm text-[#806C4B] mt-1">
                                    Las cifras, los pedidos y las estadísticas que se muestran son datos ilustrativos para exposición.
                                </p>
                            </div>
                        </div>

                        {/* Indicadores principales */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-[#3E4234]">
                                    Resumen general
                                </h2>
                                <span className="text-xs text-gray-500">
                                    Datos de ejemplo
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                <TarjetaIndicador
                                    titulo="Ventas totales"
                                    valor="$128,450"
                                    detalle="vs. periodo anterior"
                                    icono="ventas"
                                    variacion="+12.8%"
                                />

                                <TarjetaIndicador
                                    titulo="Pedidos recibidos"
                                    valor="186"
                                    detalle="pedidos registrados"
                                    icono="pedidos"
                                    variacion="+8.4%"
                                />

                                <TarjetaIndicador
                                    titulo="Ticket promedio"
                                    valor="$690.59"
                                    detalle="importe por pedido"
                                    icono="ticket"
                                />

                                <TarjetaIndicador
                                    titulo="Clientes compradores"
                                    valor="142"
                                    detalle="clientes en el periodo"
                                    icono="clientes"
                                    variacion="+6.2%"
                                />
                            </div>
                        </section>

                        {/* Gráfica y estado de pedidos */}
                        <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                            <div className="xl:col-span-2 bg-white rounded-xl border border-[#D6D6CF] p-5 sm:p-6 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-[#3E4234]">
                                            Evolución de ventas
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Rendimiento mensual ilustrativo
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-[#6B705C]">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#6B705C]" />
                                        Ventas en MXN
                                    </div>
                                </div>

                                <div className="flex items-end justify-between gap-2 sm:gap-4 h-56 border-b border-l border-[#E5E5E0] pl-3 pb-0">
                                    {ventasMensuales.map((item) => (
                                        <div
                                            key={item.mes}
                                            className="flex-1 h-full flex flex-col justify-end items-center gap-2 min-w-0"
                                        >
                                            <span className="text-[9px] sm:text-xs text-gray-500 whitespace-nowrap">
                                                ${(item.ventas / 1000).toFixed(0)} mil
                                            </span>

                                            <div
                                                title={`${item.mes}: ${formatoMoneda(item.ventas)}`}
                                                className="w-full max-w-12 rounded-t-md bg-[#89947A] hover:bg-[#6B705C] transition-colors"
                                                style={{
                                                    height: `${(item.ventas / 140000) * 72}%`,
                                                }}
                                            />

                                            <span className="text-xs text-gray-500 pb-2">
                                                {item.mes}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Ventas del mes destacado
                                        </p>
                                        <p className="text-xl font-semibold text-[#3E4234] mt-1">
                                            {formatoMoneda(128450)}
                                        </p>
                                    </div>

                                    <span className="text-xs text-[#547354] bg-[#EDF3EB] px-3 py-2 rounded-lg">
                                        Tendencia ilustrativa al alza
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-[#D6D6CF] p-5 sm:p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-[#3E4234]">
                                    Estado de pedidos
                                </h2>

                                <p className="text-sm text-gray-500 mt-1 mb-7">
                                    Distribución de pedidos de ejemplo
                                </p>

                                <div className="space-y-6">
                                    {estadosPedidos.map((estado) => (
                                        <div key={estado.nombre}>
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="text-sm text-gray-600">
                                                    {estado.nombre}
                                                </span>

                                                <span className="text-sm font-semibold text-[#3E4234]">
                                                    {estado.cantidad}
                                                </span>
                                            </div>

                                            <div className="h-2.5 bg-[#F0F0ED] rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${estado.color}`}
                                                    style={{ width: `${estado.porcentaje}%` }}
                                                />
                                            </div>

                                            <p className="text-xs text-gray-400 mt-1.5">
                                                {estado.porcentaje}% de los pedidos
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7 pt-4 border-t border-[#E5E5E0] flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Total de pedidos
                                    </span>
                                    <span className="text-lg font-semibold text-[#3E4234]">
                                        186
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Productos más vendidos */}
                        <section className="bg-white rounded-xl border border-[#D6D6CF] shadow-sm overflow-hidden">
                            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#3E4234]">
                                        Productos más vendidos
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Resumen ilustrativo por producto
                                    </p>
                                </div>

                                <span className="self-start text-xs bg-[#F1F1EF] text-[#6B705C] px-3 py-2 rounded-md">
                                    Top 5 productos
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[620px] text-left">
                                    <thead className="bg-[#F5F5F2] border-y border-[#E5E5E0]">
                                        <tr>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500">Producto</th>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500">Categoría</th>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500 text-center">Unidades vendidas</th>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500 text-right">Importe de ventas</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#EEEEEA]">
                                        {productosMasVendidos.map((producto, indice) => (
                                            <tr key={producto.nombre} className="hover:bg-[#FAFAF8] transition-colors">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#F1F1EF] text-[#6B705C] text-sm font-semibold shrink-0">
                                                            {indice + 1}
                                                        </div>
                                                        <span className="text-sm font-medium text-[#3E4234]">
                                                            {producto.nombre}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-500">
                                                    {producto.categoria}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-[#3E4234] text-center">
                                                    {producto.unidades}
                                                </td>

                                                <td className="px-5 py-4 text-sm font-semibold text-[#3E4234] text-right whitespace-nowrap">
                                                    {formatoMoneda(producto.ventas)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Pedidos recientes 
                        <section className="bg-white rounded-xl border border-[#D6D6CF] shadow-sm overflow-hidden">
                            <div className="p-5 sm:p-6">
                                <h2 className="text-lg font-semibold text-[#3E4234]">
                                    Pedidos recientes
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Ejemplo de actividad comercial
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[650px] text-left">
                                    <thead className="bg-[#F5F5F2] border-y border-[#E5E5E0]">
                                        <tr>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500">Número de pedido</th>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500">Cliente</th>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500">Fecha</th>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500">Estado</th>
                                            <th className="px-5 py-3 text-xs font-semibold text-gray-500 text-right">Total</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#EEEEEA]">
                                        {pedidosRecientes.map((pedido) => (
                                            <tr key={pedido.numero} className="hover:bg-[#FAFAF8] transition-colors">
                                                <td className="px-5 py-4 text-sm font-medium text-[#6B705C] whitespace-nowrap">
                                                    {pedido.numero}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-[#3E4234]">
                                                    {pedido.cliente}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {pedido.fecha}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
                                                            pedido.estado === "Entregado"
                                                                ? "bg-[#EDF3EB] text-[#547354]"
                                                                : pedido.estado === "Pendiente"
                                                                    ? "bg-[#FBF4E5] text-[#96743B]"
                                                                    : "bg-[#EAF0F3] text-[#587684]"
                                                        }`}
                                                    >
                                                        {pedido.estado}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-sm font-semibold text-[#3E4234] text-right whitespace-nowrap">
                                                    {formatoMoneda(pedido.total)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>*/}

                        {/* Pie */}
                        <footer className="text-center text-xs text-gray-400 pt-2 pb-4">
                            eNova Home · Panel administrativo · Dashboard de Ventas
                            <br />
                            Información demostrativa, no correspondiente a ventas reales.
                        </footer>
                    </div>
                </div>
            </div>
        </main>
    );
}