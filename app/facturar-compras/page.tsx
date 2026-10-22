
"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import SidebarCliente from "../components/SidebarCliente";

type EstadoCompra = "COMPLETADA" | "EN_CURSO" | "CANCELADA";

type Compra = {
    id: number;
    numero: string;
    fecha: string;
    nombre: string;
    subtotal: number;
    descuento: number;
    envio: number;
    total: number;
    estado: EstadoCompra;
};

type DatosFiscales = {
    rfc: string;
    razonSocial: string;
    codigoPostal: string;
    regimenFiscal: string;
    usoCFDI: string;
    correo: string;
};

const comprasIniciales: Compra[] = [
    {
        id: 98,
        numero: "ENV-000098",
        fecha: "8 de octubre de 2026",
        nombre: "Compra de ejemplo",
        subtotal: 1637.93,
        descuento: 0,
        envio: 212.07,
        total: 1850,
        estado: "COMPLETADA",
    },
    {
        id: 125,
        numero: "ENV-000125",
        fecha: "15 de octubre de 2026",
        nombre: "Compra de ejemplo",
        subtotal: 2200,
        descuento: 0,
        envio: 299,
        total: 2499,
        estado: "EN_CURSO",
    },
    {
        id: 76,
        numero: "ENV-000076",
        fecha: "2 de octubre de 2026",
        nombre: "Compra de ejemplo",
        subtotal: 950,
        descuento: 0,
        envio: 0,
        total: 950,
        estado: "CANCELADA",
    },
];

const datosFiscalesIniciales: DatosFiscales = {
    rfc: "",
    razonSocial: "",
    codigoPostal: "",
    regimenFiscal: "",
    usoCFDI: "",
    correo: "",
};

const regimenesFiscales = [
    { value: "601", label: "601 - General de Ley Personas Morales" },
    { value: "603", label: "603 - Personas Morales con Fines no Lucrativos" },
    { value: "605", label: "605 - Sueldos y Salarios e Ingresos Asimilados" },
    { value: "606", label: "606 - Arrendamiento" },
    { value: "612", label: "612 - Personas Físicas con Actividades Empresariales y Profesionales" },
    { value: "616", label: "616 - Sin obligaciones fiscales" },
    { value: "621", label: "621 - Incorporación Fiscal" },
    { value: "626", label: "626 - Régimen Simplificado de Confianza" },
];

const usosCFDI = [
    { value: "G01", label: "G01 - Adquisición de mercancías" },
    { value: "G02", label: "G02 - Devoluciones, descuentos o bonificaciones" },
    { value: "G03", label: "G03 - Gastos en general" },
    { value: "I01", label: "I01 - Construcciones" },
    { value: "I02", label: "I02 - Mobiliario y equipo de oficina" },
    { value: "S01", label: "S01 - Sin efectos fiscales" },
    { value: "CP01", label: "CP01 - Pagos" },
];

const formatoMoneda = (cantidad: number) =>
    cantidad.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
    });

function IconoDocumento({ className = "w-6 h-6" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6M8 13h8M8 17h8" />
        </svg>
    );
}

function IconoCerrar() {
    return (
        <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <path d="m18 6-12 12M6 6l12 12" />
        </svg>
    );
}

function IconoInformacion() {
    return (
        <svg
            className="w-6 h-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
        </svg>
    );
}

function EtiquetaEstado({ estado }: { estado: EstadoCompra }) {
    const estilos: Record<EstadoCompra, string> = {
        COMPLETADA: "bg-green-50 text-green-800",
        EN_CURSO: "bg-amber-50 text-amber-800",
        CANCELADA: "bg-red-50 text-red-700",
    };

    const textos: Record<EstadoCompra, string> = {
        COMPLETADA: "Compra completada",
        EN_CURSO: "En curso",
        CANCELADA: "Compra cancelada",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${estilos[estado]}`}
        >
            {textos[estado]}
        </span>
    );
}

function Campo({
    id,
    label,
    value,
    onChange,
    placeholder,
    hint,
    maxLength,
    pattern,
    inputMode,
    autoComplete,
    required = true,
    type = "text",
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    hint?: string;
    maxLength?: number;
    pattern?: string;
    inputMode?: "text" | "numeric" | "email";
    autoComplete?: string;
    required?: boolean;
    type?: string;
}) {
    return (
        <div className="min-w-0">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-[#292D24] mb-2"
            >
                {label} {required && <span className="text-red-600">*</span>}
            </label>

            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                pattern={pattern}
                inputMode={inputMode}
                autoComplete={autoComplete}
                required={required}
                className="w-full min-w-0 rounded-lg border border-[#D6D6CF] bg-white px-3.5 py-3 text-sm text-[#3E4234] placeholder:text-gray-400 outline-none transition focus:border-[#6B705C] focus:ring-2 focus:ring-[#6B705C]/20"
            />

            {hint && (
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                    {hint}
                </p>
            )}
        </div>
    );
}

function Selector({
    id,
    label,
    value,
    onChange,
    options,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}) {
    return (
        <div className="min-w-0">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-[#292D24] mb-2"
            >
                {label} <span className="text-red-600">*</span>
            </label>

            <select
                id={id}
                name={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                required
                className="w-full min-w-0 rounded-lg border border-[#D6D6CF] bg-white px-3 py-3 text-sm text-[#3E4234] outline-none transition focus:border-[#6B705C] focus:ring-2 focus:ring-[#6B705C]/20"
            >
                <option value="">Selecciona una opción</option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function ModalSolicitarFactura({
    compra,
    onCerrar,
    onSolicitar,
}: {
    compra: Compra;
    onCerrar: () => void;
    onSolicitar: (datos: DatosFiscales) => void;
}) {
    const [datos, setDatos] = useState<DatosFiscales>(
        datosFiscalesIniciales
    );
    const [error, setError] = useState("");

    function actualizar<K extends keyof DatosFiscales>(
        campo: K,
        valor: DatosFiscales[K]
    ) {
        setDatos((actuales) => ({
            ...actuales,
            [campo]: valor,
        }));
    }

    function enviarFormulario(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const rfc = datos.rfc.trim().toUpperCase();
        const razonSocial = datos.razonSocial.trim();
        const codigoPostal = datos.codigoPostal.trim();
        const correo = datos.correo.trim();

        const rfcValido =
            /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i.test(rfc);

        if (!rfcValido) {
            setError(
                "Verifica el RFC. Debe contener 12 caracteres para personas morales o 13 para personas físicas."
            );
            return;
        }

        if (razonSocial.length < 2) {
            setError("Introduce la razón social o el nombre fiscal.");
            return;
        }

        if (!/^\d{5}$/.test(codigoPostal)) {
            setError("El código postal debe contener exactamente 5 dígitos.");
            return;
        }

        if (!datos.regimenFiscal || !datos.usoCFDI) {
            setError("Selecciona el régimen fiscal y el uso del CFDI.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setError("Introduce un correo electrónico válido.");
            return;
        }

        onSolicitar({
            ...datos,
            rfc,
            razonSocial,
            codigoPostal,
            correo,
        });
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-3 sm:p-6"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCerrar();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-factura"
                className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            >
                <header className="flex items-start justify-between gap-4 border-b border-[#E5E5E0] px-5 py-5 sm:px-7">
                    <div>
                        <h2
                            id="titulo-factura"
                            className="text-2xl font-semibold text-[#292D24]"
                        >
                            Solicitar factura
                        </h2>

                        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:text-base">
                            Completa los datos fiscales para solicitar la factura de tu compra.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar formulario"
                        className="rounded-md p-2 text-gray-500 transition hover:bg-[#F1F1EF] hover:text-[#3E4234]"
                    >
                        <IconoCerrar />
                    </button>
                </header>

                <form
                    onSubmit={enviarFormulario}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto p-5 sm:p-7 lg:grid-cols-[1.45fr_0.9fr]">
                        {/* Datos fiscales */}
                        <div className="space-y-5">
                            <h3 className="text-base font-semibold text-[#292D24]">
                                Datos fiscales
                            </h3>

                            <Campo
                                id="rfc"
                                label="RFC"
                                value={datos.rfc}
                                onChange={(valor) =>
                                    actualizar("rfc", valor.toUpperCase())
                                }
                                placeholder="Ej. XAXX010101000"
                                hint="Introduce tu RFC de 12 o 13 caracteres."
                                maxLength={13}
                                autoComplete="off"
                            />

                            <Campo
                                id="razonSocial"
                                label="Razón social"
                                value={datos.razonSocial}
                                onChange={(valor) =>
                                    actualizar("razonSocial", valor)
                                }
                                placeholder="Ej. Nombre o razón social"
                                hint="Escribe el nombre fiscal tal como aparece registrado ante el SAT."
                                maxLength={150}
                                autoComplete="organization"
                            />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Campo
                                    id="codigoPostal"
                                    label="Código postal"
                                    value={datos.codigoPostal}
                                    onChange={(valor) =>
                                        actualizar(
                                            "codigoPostal",
                                            valor.replace(/\D/g, "").slice(0, 5)
                                        )
                                    }
                                    placeholder="Ej. 78000"
                                    maxLength={5}
                                    inputMode="numeric"
                                    pattern="[0-9]{5}"
                                    autoComplete="postal-code"
                                />

                                <Selector
                                    id="regimenFiscal"
                                    label="Régimen fiscal"
                                    value={datos.regimenFiscal}
                                    onChange={(valor) =>
                                        actualizar("regimenFiscal", valor)
                                    }
                                    options={regimenesFiscales}
                                />
                            </div>

                            <Selector
                                id="usoCFDI"
                                label="Uso del CFDI"
                                value={datos.usoCFDI}
                                onChange={(valor) =>
                                    actualizar("usoCFDI", valor)
                                }
                                options={usosCFDI}
                            />

                            <div className="border-t border-[#E5E5E0] pt-5">
                                <h3 className="text-base font-semibold text-[#292D24]">
                                    Correo de facturación
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Indica dónde deseas recibir la factura.
                                </p>
                            </div>

                            <Campo
                                id="correo"
                                label="Correo electrónico"
                                value={datos.correo}
                                onChange={(valor) =>
                                    actualizar("correo", valor)
                                }
                                placeholder="Ej. correo@ejemplo.com"
                                hint="En una integración real, este correo se utilizaría para enviar la factura."
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                maxLength={254}
                            />

                            {error && (
                                <div
                                    role="alert"
                                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700"
                                >
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Resumen de compra */}
                        <aside className="space-y-4">
                            <div className="rounded-xl bg-[#F7F7F4] p-4 sm:p-5">
                                <h3 className="text-base font-semibold text-[#292D24]">
                                    Resumen del pedido
                                </h3>

                                <div className="mt-4 flex items-start gap-3">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#E9E9E3] text-[#6B705C]">
                                        <IconoDocumento className="h-8 w-8" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="break-words font-semibold text-[#292D24]">
                                            {compra.numero}
                                        </p>

                                        <div className="mt-2">
                                            <EtiquetaEstado estado={compra.estado} />
                                        </div>

                                        <p className="mt-2 text-sm text-gray-600">
                                            Fecha de compra
                                        </p>

                                        <p className="text-sm font-medium text-[#292D24]">
                                            {compra.fecha}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-2 text-sm">
                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-600">
                                            Subtotal
                                        </span>
                                        <span className="text-right text-[#292D24]">
                                            {formatoMoneda(compra.subtotal)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-600">
                                            Descuento
                                        </span>
                                        <span className="text-right text-[#292D24]">
                                            {formatoMoneda(compra.descuento)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-600">
                                            Costo de envío
                                        </span>
                                        <span className="text-right text-[#292D24]">
                                            {formatoMoneda(compra.envio)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-3 border-t border-[#D6D6CF] pt-3 text-base font-semibold">
                                        <span className="text-[#292D24]">
                                            Total
                                        </span>
                                        <span className="text-right text-[#292D24]">
                                            {formatoMoneda(compra.total)} MXN
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="flex items-start gap-3 text-green-800">
                                    <IconoInformacion />

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Esta compra puede ser facturada
                                        </p>
                                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                                            Verifica tus datos antes de continuar. Esta demostración no genera una factura fiscal real.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-[#F5F5F2] p-4">
                                <div className="flex items-start gap-3">
                                    <IconoDocumento />

                                    <div>
                                        <h4 className="text-sm font-semibold text-[#292D24]">
                                            Información importante
                                        </h4>

                                        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-gray-600">
                                            <li>Solo se pueden facturar compras completadas.</li>
                                            <li>Verifica que tus datos fiscales sean correctos.</li>
                                            <li>Una factura real requiere integración con el sistema de facturación correspondiente.</li>
                                            <li>En esta demostración, los datos no se guardan en la base de datos.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <footer className="flex flex-col-reverse gap-3 border-t border-[#E5E5E0] bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                        <button
                            type="button"
                            onClick={onCerrar}
                            className="rounded-lg border border-[#D6D6CF] px-5 py-3 text-sm font-medium text-[#3E4234] transition hover:bg-[#F5F5F2]"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-[#3E4234] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#525744]"
                        >
                            Solicitar factura
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
}

export default function FacturarComprasPage() {
    const { usuario, autenticado } = useAuth();

    const [compras] = useState<Compra[]>(comprasIniciales);
    const [compraSeleccionada, setCompraSeleccionada] =
        useState<Compra | null>(null);
    const [facturasSolicitadas, setFacturasSolicitadas] =
        useState<number[]>([]);
    const [mensaje, setMensaje] = useState("");

    function solicitarFactura(datos: DatosFiscales) {
        if (!compraSeleccionada) return;

        if (compraSeleccionada.estado !== "COMPLETADA") {
            setCompraSeleccionada(null);
            setMensaje(
                "Solo puedes solicitar facturas de compras completadas."
            );
            return;
        }

        setFacturasSolicitadas((actuales) =>
            actuales.includes(compraSeleccionada.id)
                ? actuales
                : [...actuales, compraSeleccionada.id]
        );

        setCompraSeleccionada(null);

        setMensaje(
            `Solicitud de demostración registrada para ${compraSeleccionada.numero}. Los datos fiscales se validaron, pero no se guardaron y no se generó una factura real.`
        );

        // En una futura integración, "datos" se enviará al backend.
        void datos;
    }

    if (!autenticado || !usuario) {
        return (
            <main className="flex min-h-screen items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Inicia sesión para consultar la facturación de tus compras.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-4 pb-8 pt-32 sm:px-6 sm:pb-12">
            <div className="flex flex-col gap-8 md:flex-row md:gap-0">
                <SidebarCliente />

                <div className="min-w-0 w-full flex-1 md:pl-8">
                    <div className="mx-auto w-full max-w-5xl">
                        <header className="mb-8">
                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Facturación
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Consulta tus compras y gestiona las solicitudes de factura.
                            </p>
                        </header>

                        {mensaje && (
                            <div
                                role="status"
                                className="mb-6 flex items-start justify-between gap-3 rounded-lg border border-[#D6D6CF] bg-[#F5F5F2] p-4 text-sm leading-relaxed text-[#3E4234]"
                            >
                                <p>{mensaje}</p>

                                <button
                                    type="button"
                                    onClick={() => setMensaje("")}
                                    aria-label="Cerrar mensaje"
                                    className="shrink-0 rounded p-1 hover:bg-white"
                                >
                                    <IconoCerrar />
                                </button>
                            </div>
                        )}

                        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-[#D6D6CF] bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Compras completadas
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {
                                        compras.filter(
                                            (compra) =>
                                                compra.estado === "COMPLETADA"
                                        ).length
                                    }
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#D6D6CF] bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Solicitudes de demostración
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {facturasSolicitadas.length}
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#D6D6CF] bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Compras no facturables
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {
                                        compras.filter(
                                            (compra) =>
                                                compra.estado !== "COMPLETADA"
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>

                        <section>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    Mis compras
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Selecciona una compra completada para solicitar su factura.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {compras.map((compra) => {
                                    const solicitada =
                                        facturasSolicitadas.includes(compra.id);

                                    return (
                                        <article
                                            key={compra.id}
                                            className="overflow-hidden rounded-xl border border-[#D6D6CF] bg-white shadow-sm"
                                        >
                                            <div className="flex flex-col gap-3 border-b border-[#D6D6CF] bg-[#F5F5F2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-xs text-gray-500">
                                                        Número de pedido
                                                    </p>

                                                    <p className="font-semibold text-[#3E4234]">
                                                        {compra.numero}
                                                    </p>
                                                </div>

                                                <p className="text-sm text-gray-600">
                                                    {compra.fecha}
                                                </p>

                                                <EtiquetaEstado estado={compra.estado} />
                                            </div>

                                            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                                                <div className="flex min-w-0 flex-1 items-center gap-4">
                                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#F1F1EF] text-[#6B705C]">
                                                        <IconoDocumento className="h-7 w-7" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="font-semibold text-[#292D24]">
                                                            {compra.nombre}
                                                        </h3>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Pedido {compra.numero}
                                                        </p>

                                                        <p className="mt-2 text-lg font-semibold text-[#3E4234]">
                                                            {formatoMoneda(compra.total)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="sm:max-w-64 sm:text-right">
                                                    {compra.estado === "COMPLETADA" ? (
                                                        solicitada ? (
                                                            <div className="space-y-2">
                                                                <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800">
                                                                    Solicitud registrada
                                                                </span>

                                                                <p className="text-xs leading-relaxed text-gray-500">
                                                                    Demostración local. No se ha generado una factura fiscal.
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
                                                                    Facturable
                                                                </span>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setMensaje("");
                                                                        setCompraSeleccionada(compra);
                                                                    }}
                                                                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3E4234] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#525744]"
                                                                >
                                                                    <IconoDocumento className="h-4 w-4" />
                                                                    Solicitar factura
                                                                </button>
                                                            </>
                                                        )
                                                    ) : compra.estado === "EN_CURSO" ? (
                                                        <div className="space-y-2">
                                                            <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800">
                                                                En espera
                                                            </span>

                                                            <p className="text-sm leading-relaxed text-gray-500">
                                                                Podrás solicitar la factura cuando se complete la compra.
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
                                                                No facturable
                                                            </span>

                                                            <p className="text-sm leading-relaxed text-gray-500">
                                                                Las compras canceladas no permiten solicitar facturas desde esta vista.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        <p className="mt-5 text-xs leading-relaxed text-gray-400">
                            Vista de demostración con compras de ejemplo. Las solicitudes se mantienen únicamente en el estado de la página y se pierden al recargar. No se genera CFDI ni se envían correos.
                        </p>
                    </div>
                </div>
            </div>

            {compraSeleccionada && (
                <ModalSolicitarFactura
                    compra={compraSeleccionada}
                    onCerrar={() => setCompraSeleccionada(null)}
                    onSolicitar={solicitarFactura}
                />
            )}
        </main>
    );
}
