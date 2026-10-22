
"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import SidebarCliente from "../components/SidebarCliente";

type Direccion = {
    id: number;
    alias: string;
    nombreDestinatario: string;
    telefono: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
    referencias: string;
    esEnvio: boolean;
    esFacturacion: boolean;
    principalEnvio: boolean;
    principalFacturacion: boolean;
};

type FormularioDireccion = Omit<Direccion, "id">;

const formularioInicial: FormularioDireccion = {
    alias: "",
    nombreDestinatario: "",
    telefono: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    colonia: "",
    codigoPostal: "",
    ciudad: "",
    estado: "",
    referencias: "",
    esEnvio: true,
    esFacturacion: false,
    principalEnvio: false,
    principalFacturacion: false,
};

const direccionesIniciales: Direccion[] = [
    {
        id: 1,
        alias: "Casa",
        nombreDestinatario: "Juan Pérez",
        telefono: "4441234567",
        calle: "Avenida Ejemplo",
        numeroExterior: "123",
        numeroInterior: "",
        colonia: "Centro",
        codigoPostal: "78000",
        ciudad: "San Luis Potosí",
        estado: "San Luis Potosí",
        referencias: "Casa con fachada clara, cerca del parque.",
        esEnvio: true,
        esFacturacion: true,
        principalEnvio: true,
        principalFacturacion: true,
    },
    {
        id: 2,
        alias: "Trabajo",
        nombreDestinatario: "Juan Pérez",
        telefono: "4441234567",
        calle: "Avenida de la Industria",
        numeroExterior: "250",
        numeroInterior: "Oficina 4",
        colonia: "Zona Industrial",
        codigoPostal: "78395",
        ciudad: "San Luis Potosí",
        estado: "San Luis Potosí",
        referencias: "Edificio de oficinas, recepción principal.",
        esEnvio: true,
        esFacturacion: false,
        principalEnvio: false,
        principalFacturacion: false,
    },
];

function Icono({
    tipo,
    className = "h-5 w-5",
}: {
    tipo: "casa" | "ubicacion" | "editar" | "eliminar" | "mas" | "cerrar";
    className?: string;
}) {
    const propiedades = {
        className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true as const,
    };

    return (
        <svg {...propiedades}>
            {tipo === "casa" && (
                <>
                    <path d="m3 10 9-7 9 7" />
                    <path d="M5 9v12h14V9M9 21v-7h6v7" />
                </>
            )}

            {tipo === "ubicacion" && (
                <>
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                </>
            )}

            {tipo === "editar" && (
                <>
                    <path d="M12 20h9" />
                    <path d="m16.5 3.5 4 4L9 19l-5 1 1-5Z" />
                </>
            )}

            {tipo === "eliminar" && (
                <>
                    <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
                    <path d="M10 10v6M14 10v6" />
                </>
            )}

            {tipo === "mas" && (
                <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8M8 12h8" />
                </>
            )}

            {tipo === "cerrar" && (
                <path d="m18 6-12 12M6 6l12 12" />
            )}
        </svg>
    );
}

function Etiqueta({
    children,
    color = "gris",
}: {
    children: React.ReactNode;
    color?: "gris" | "verde" | "azul" | "amarillo";
}) {
    const estilos = {
        gris: "bg-[#F0F0ED] text-[#55594C]",
        verde: "bg-green-50 text-green-800",
        azul: "bg-blue-50 text-blue-800",
        amarillo: "bg-amber-50 text-amber-800",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${estilos[color]}`}
        >
            {children}
        </span>
    );
}

function Campo({
    id,
    etiqueta,
    valor,
    cambiar,
    requerido = false,
    tipo = "text",
    maxLength,
    placeholder,
}: {
    id: string;
    etiqueta: string;
    valor: string;
    cambiar: (valor: string) => void;
    requerido?: boolean;
    tipo?: string;
    maxLength?: number;
    placeholder?: string;
}) {
    return (
        <div className="min-w-0">
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-[#3E4234]"
            >
                {etiqueta}
                {requerido && <span className="ml-1 text-red-600">*</span>}
            </label>

            <input
                id={id}
                name={id}
                type={tipo}
                value={valor}
                onChange={(e) => cambiar(e.target.value)}
                required={requerido}
                maxLength={maxLength}
                placeholder={placeholder}
                className="w-full rounded-lg border border-[#D6D6CF] bg-white px-3.5 py-3 text-sm text-[#3E4234] outline-none transition focus:border-[#6B705C] focus:ring-2 focus:ring-[#6B705C]/20"
            />
        </div>
    );
}

function SeleccionUso({
    titulo,
    descripcion,
    marcado,
    cambiar,
    principal,
    cambiarPrincipal,
    principalDeshabilitado = false,
}: {
    titulo: string;
    descripcion: string;
    marcado: boolean;
    cambiar: (valor: boolean) => void;
    principal: boolean;
    cambiarPrincipal: (valor: boolean) => void;
    principalDeshabilitado?: boolean;
}) {
    return (
        <div className="rounded-lg border border-[#D6D6CF] p-4">
            <label className="flex cursor-pointer items-start gap-3">
                <input
                    type="checkbox"
                    checked={marcado}
                    onChange={(e) => {
                        cambiar(e.target.checked);
                        if (!e.target.checked) cambiarPrincipal(false);
                    }}
                    className="mt-1 h-4 w-4 accent-[#3E4234]"
                />

                <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#3E4234]">
                        {titulo}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-500">
                        {descripcion}
                    </span>
                </span>
            </label>

            {marcado && (
                <label className="ml-7 mt-3 flex cursor-pointer items-center gap-2 text-sm text-[#3E4234]">
                    <input
                        type="checkbox"
                        checked={principal}
                        disabled={principalDeshabilitado}
                        onChange={(e) => cambiarPrincipal(e.target.checked)}
                        className="h-4 w-4 accent-[#3E4234]"
                    />
                    Usar como dirección principal
                </label>
            )}
        </div>
    );
}

function ModalDireccion({
    direccion,
    direcciones,
    alCerrar,
    alGuardar,
}: {
    direccion: Direccion | null;
    direcciones: Direccion[];
    alCerrar: () => void;
    alGuardar: (datos: FormularioDireccion) => void;
}) {
    const [datos, setDatos] = useState<FormularioDireccion>(
        direccion
            ? {
                  alias: direccion.alias,
                  nombreDestinatario: direccion.nombreDestinatario,
                  telefono: direccion.telefono,
                  calle: direccion.calle,
                  numeroExterior: direccion.numeroExterior,
                  numeroInterior: direccion.numeroInterior,
                  colonia: direccion.colonia,
                  codigoPostal: direccion.codigoPostal,
                  ciudad: direccion.ciudad,
                  estado: direccion.estado,
                  referencias: direccion.referencias,
                  esEnvio: direccion.esEnvio,
                  esFacturacion: direccion.esFacturacion,
                  principalEnvio: direccion.principalEnvio,
                  principalFacturacion: direccion.principalFacturacion,
              }
            : formularioInicial
    );

    const [error, setError] = useState("");

    function actualizar<K extends keyof FormularioDireccion>(
        campo: K,
        valor: FormularioDireccion[K]
    ) {
        setDatos((actuales) => ({ ...actuales, [campo]: valor }));
    }

    function enviar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!datos.esEnvio && !datos.esFacturacion) {
            setError("Selecciona envío, facturación o ambos usos.");
            return;
        }

        if (!/^\d{5}$/.test(datos.codigoPostal)) {
            setError("El código postal debe contener exactamente 5 dígitos.");
            return;
        }

        if (!/^[0-9+()\-\s]{10,20}$/.test(datos.telefono.trim())) {
            setError("Introduce un número telefónico válido.");
            return;
        }

        if (
            datos.principalEnvio &&
            !datos.esEnvio
        ) {
            setError("Para establecerla como principal, selecciona uso de envío.");
            return;
        }

        if (
            datos.principalFacturacion &&
            !datos.esFacturacion
        ) {
            setError("Para establecerla como principal, selecciona uso de facturación.");
            return;
        }

        const tieneOtraPrincipalEnvio = direcciones.some(
            (d) =>
                d.principalEnvio &&
                d.id !== direccion?.id
        );

        const tieneOtraPrincipalFacturacion = direcciones.some(
            (d) =>
                d.principalFacturacion &&
                d.id !== direccion?.id
        );

        if (
            datos.principalEnvio &&
            tieneOtraPrincipalEnvio &&
            !window.confirm(
                "Ya existe otra dirección principal de envío. ¿Deseas sustituirla?"
            )
        ) {
            return;
        }

        if (
            datos.principalFacturacion &&
            tieneOtraPrincipalFacturacion &&
            !window.confirm(
                "Ya existe otra dirección principal de facturación. ¿Deseas sustituirla?"
            )
        ) {
            return;
        }

        alGuardar({
            ...datos,
            alias: datos.alias.trim(),
            nombreDestinatario: datos.nombreDestinatario.trim(),
            telefono: datos.telefono.trim(),
            calle: datos.calle.trim(),
            numeroExterior: datos.numeroExterior.trim(),
            numeroInterior: datos.numeroInterior.trim(),
            colonia: datos.colonia.trim(),
            codigoPostal: datos.codigoPostal.trim(),
            ciudad: datos.ciudad.trim(),
            estado: datos.estado.trim(),
            referencias: datos.referencias.trim(),
        });
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6">
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-modal-direccion"
                className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            >
                <header className="flex items-start justify-between gap-4 border-b border-[#D6D6CF] px-5 py-5 sm:px-7">
                    <div>
                        <h2
                            id="titulo-modal-direccion"
                            className="text-xl font-semibold text-[#3E4234] sm:text-2xl"
                        >
                            {direccion ? "Editar dirección" : "Agregar dirección"}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Introduce los datos del domicilio y selecciona su uso.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={alCerrar}
                        aria-label="Cerrar"
                        className="rounded-md p-2 text-gray-500 hover:bg-[#F1F1EF]"
                    >
                        <Icono tipo="cerrar" />
                    </button>
                </header>

                <form onSubmit={enviar} className="flex min-h-0 flex-1 flex-col">
                    <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
                        <div>
                            <h3 className="mb-4 text-base font-semibold text-[#3E4234]">
                                Datos del domicilio
                            </h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Campo
                                    id="alias"
                                    etiqueta="Nombre de la dirección"
                                    valor={datos.alias}
                                    cambiar={(v) => actualizar("alias", v)}
                                    requerido
                                    maxLength={40}
                                    placeholder="Ej. Casa, Trabajo"
                                />

                                <Campo
                                    id="nombreDestinatario"
                                    etiqueta="Nombre del destinatario"
                                    valor={datos.nombreDestinatario}
                                    cambiar={(v) =>
                                        actualizar("nombreDestinatario", v)
                                    }
                                    requerido
                                    maxLength={100}
                                    placeholder="Nombre completo"
                                />

                                <Campo
                                    id="telefono"
                                    etiqueta="Teléfono de contacto"
                                    valor={datos.telefono}
                                    cambiar={(v) =>
                                        actualizar("telefono", v)
                                    }
                                    requerido
                                    tipo="tel"
                                    maxLength={20}
                                    placeholder="10 dígitos"
                                />

                                <Campo
                                    id="calle"
                                    etiqueta="Calle"
                                    valor={datos.calle}
                                    cambiar={(v) => actualizar("calle", v)}
                                    requerido
                                    maxLength={120}
                                    placeholder="Nombre de la calle"
                                />

                                <Campo
                                    id="numeroExterior"
                                    etiqueta="Número exterior"
                                    valor={datos.numeroExterior}
                                    cambiar={(v) =>
                                        actualizar("numeroExterior", v)
                                    }
                                    requerido
                                    maxLength={15}
                                    placeholder="Ej. 123"
                                />

                                <Campo
                                    id="numeroInterior"
                                    etiqueta="Número interior"
                                    valor={datos.numeroInterior}
                                    cambiar={(v) =>
                                        actualizar("numeroInterior", v)
                                    }
                                    maxLength={15}
                                    placeholder="Departamento, oficina (opcional)"
                                />

                                <Campo
                                    id="colonia"
                                    etiqueta="Colonia"
                                    valor={datos.colonia}
                                    cambiar={(v) => actualizar("colonia", v)}
                                    requerido
                                    maxLength={100}
                                    placeholder="Nombre de la colonia"
                                />

                                <Campo
                                    id="codigoPostal"
                                    etiqueta="Código postal"
                                    valor={datos.codigoPostal}
                                    cambiar={(v) =>
                                        actualizar(
                                            "codigoPostal",
                                            v.replace(/\D/g, "").slice(0, 5)
                                        )
                                    }
                                    requerido
                                    tipo="text"
                                    maxLength={5}
                                    placeholder="5 dígitos"
                                />

                                <Campo
                                    id="ciudad"
                                    etiqueta="Ciudad o municipio"
                                    valor={datos.ciudad}
                                    cambiar={(v) => actualizar("ciudad", v)}
                                    requerido
                                    maxLength={100}
                                    placeholder="Ciudad o municipio"
                                />

                                <Campo
                                    id="estado"
                                    etiqueta="Estado"
                                    valor={datos.estado}
                                    cambiar={(v) => actualizar("estado", v)}
                                    requerido
                                    maxLength={100}
                                    placeholder="Estado de la República"
                                />
                            </div>

                            <div className="mt-4">
                                <label
                                    htmlFor="referencias"
                                    className="mb-2 block text-sm font-medium text-[#3E4234]"
                                >
                                    Referencias adicionales
                                </label>

                                <textarea
                                    id="referencias"
                                    value={datos.referencias}
                                    onChange={(e) =>
                                        actualizar("referencias", e.target.value)
                                    }
                                    maxLength={300}
                                    rows={3}
                                    placeholder="Indicaciones para localizar el domicilio (opcional)"
                                    className="w-full resize-y rounded-lg border border-[#D6D6CF] px-3.5 py-3 text-sm text-[#3E4234] outline-none focus:border-[#6B705C] focus:ring-2 focus:ring-[#6B705C]/20"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 text-base font-semibold text-[#3E4234]">
                                ¿Para qué quieres utilizar esta dirección?
                            </h3>

                            <p className="mb-4 text-sm leading-relaxed text-gray-500">
                                Puedes seleccionar una opción o utilizar el mismo domicilio para envío y facturación.
                            </p>

                            <div className="space-y-3">
                                <SeleccionUso
                                    titulo="Dirección de envío"
                                    descripcion="Se utilizará para entregar tus compras."
                                    marcado={datos.esEnvio}
                                    cambiar={(v) => actualizar("esEnvio", v)}
                                    principal={datos.principalEnvio}
                                    cambiarPrincipal={(v) =>
                                        actualizar("principalEnvio", v)
                                    }
                                />

                                <SeleccionUso
                                    titulo="Dirección de facturación"
                                    descripcion="Se utilizará como domicilio asociado a la facturación."
                                    marcado={datos.esFacturacion}
                                    cambiar={(v) =>
                                        actualizar("esFacturacion", v)
                                    }
                                    principal={datos.principalFacturacion}
                                    cambiarPrincipal={(v) =>
                                        actualizar("principalFacturacion", v)
                                    }
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        <p className="text-xs leading-relaxed text-gray-400">
                            Los datos se guardarán únicamente en el estado local de esta demostración. No se enviarán a un servidor.
                        </p>
                    </div>

                    <footer className="flex flex-col-reverse gap-3 border-t border-[#D6D6CF] px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                        <button
                            type="button"
                            onClick={alCerrar}
                            className="rounded-lg border border-[#D6D6CF] px-5 py-3 text-sm font-medium text-[#3E4234] hover:bg-[#F5F5F2]"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-[#3E4234] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#525744]"
                        >
                            {direccion ? "Guardar cambios" : "Guardar dirección"}
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
}

export default function MisDireccionesPage() {
    const { usuario, autenticado } = useAuth();

    const [direcciones, setDirecciones] =
        useState<Direccion[]>(direccionesIniciales);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [direccionEditar, setDireccionEditar] =
        useState<Direccion | null>(null);
    const [filtro, setFiltro] = useState<
        "TODAS" | "ENVIO" | "FACTURACION"
    >("TODAS");
    const [mensaje, setMensaje] = useState("");

    if (!autenticado || !usuario) {
        return (
            <main className="flex min-h-screen items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Inicia sesión para administrar tus direcciones.
                    </p>
                </div>
            </main>
        );
    }

    function abrirNuevaDireccion() {
        setDireccionEditar(null);
        setModalAbierto(true);
        setMensaje("");
    }

    function abrirEdicion(direccion: Direccion) {
        setDireccionEditar(direccion);
        setModalAbierto(true);
        setMensaje("");
    }

    function guardarDireccion(datos: FormularioDireccion) {
        if (direccionEditar) {
            setDirecciones((actuales) =>
                actuales.map((d) => {
                    if (d.id === direccionEditar.id) {
                        return {
                            ...d,
                            ...datos,
                            principalEnvio:
                                datos.esEnvio && datos.principalEnvio,
                            principalFacturacion:
                                datos.esFacturacion &&
                                datos.principalFacturacion,
                        };
                    }

                    return {
                        ...d,
                        principalEnvio: datos.principalEnvio
                            ? false
                            : d.principalEnvio,
                        principalFacturacion: datos.principalFacturacion
                            ? false
                            : d.principalFacturacion,
                    };
                })
            );

            setMensaje("La dirección se actualizó correctamente.");
        } else {
            const nuevaDireccion: Direccion = {
                ...datos,
                id: Date.now(),
                principalEnvio: datos.esEnvio && datos.principalEnvio,
                principalFacturacion:
                    datos.esFacturacion && datos.principalFacturacion,
            };

            setDirecciones((actuales) => [
                ...actuales.map((d) => ({
                    ...d,
                    principalEnvio: datos.principalEnvio
                        ? false
                        : d.principalEnvio,
                    principalFacturacion: datos.principalFacturacion
                        ? false
                        : d.principalFacturacion,
                })),
                nuevaDireccion,
            ]);

            setMensaje("La dirección se agregó correctamente.");
        }

        setModalAbierto(false);
        setDireccionEditar(null);
    }

    function eliminarDireccion(direccion: Direccion) {
        const confirmado = window.confirm(
            `¿Deseas eliminar la dirección "${direccion.alias}"?`
        );

        if (!confirmado) return;

        setDirecciones((actuales) =>
            actuales.filter((d) => d.id !== direccion.id)
        );

        setMensaje(
            `La dirección "${direccion.alias}" se eliminó de esta demostración.`
        );
    }

    const direccionesFiltradas = direcciones.filter((direccion) => {
        if (filtro === "ENVIO") return direccion.esEnvio;
        if (filtro === "FACTURACION") return direccion.esFacturacion;
        return true;
    });

    const totalEnvio = direcciones.filter((d) => d.esEnvio).length;
    const totalFacturacion = direcciones.filter(
        (d) => d.esFacturacion
    ).length;

    return (
        <main className="min-h-screen px-4 pb-8 pt-32 sm:px-6 sm:pb-12">
            <div className="flex flex-col gap-8 md:flex-row md:gap-0">
                <SidebarCliente />

                <div className="min-w-0 w-full flex-1 md:pl-8">
                    <div className="mx-auto w-full max-w-5xl">
                        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold text-[#3E4234]">
                                    Mis direcciones
                                </h1>
                                <p className="mt-2 text-gray-600">
                                    Administra tus direcciones de envío y facturación.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={abrirNuevaDireccion}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#3E4234] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#525744]"
                            >
                                <Icono tipo="mas" className="h-4 w-4" />
                                Agregar dirección
                            </button>
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
                                    <Icono tipo="cerrar" />
                                </button>
                            </div>
                        )}

                        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-lg border border-[#D6D6CF] bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Direcciones guardadas
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {direcciones.length}
                                </p>
                            </div>

                            <div className="rounded-lg border border-[#D6D6CF] bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Direcciones de envío
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {totalEnvio}
                                </p>
                            </div>

                            <div className="rounded-lg border border-[#D6D6CF] bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Direcciones de facturación
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-[#3E4234]">
                                    {totalFacturacion}
                                </p>
                            </div>
                        </div>

                        <div className="mb-5 flex flex-wrap gap-2">
                            {[
                                { valor: "TODAS", texto: "Todas" },
                                { valor: "ENVIO", texto: "Envío" },
                                {
                                    valor: "FACTURACION",
                                    texto: "Facturación",
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
                                    className={`rounded-full border px-4 py-2 text-sm transition ${
                                        filtro === opcion.valor
                                            ? "border-[#3E4234] bg-[#3E4234] text-white"
                                            : "border-[#D6D6CF] bg-white text-[#3E4234] hover:bg-[#F5F5F2]"
                                    }`}
                                >
                                    {opcion.texto}
                                </button>
                            ))}
                        </div>

                        <section className="space-y-4">
                            {direccionesFiltradas.length === 0 ? (
                                <div className="rounded-xl border border-[#D6D6CF] bg-white px-5 py-12 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#F1F1EF] text-[#6B705C]">
                                        <Icono tipo="ubicacion" className="h-7 w-7" />
                                    </div>

                                    <h2 className="mt-4 text-lg font-semibold text-[#3E4234]">
                                        No hay direcciones en esta categoría
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
                                        Agrega una dirección y selecciona si quieres utilizarla para tus envíos, tu facturación o ambas funciones.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={abrirNuevaDireccion}
                                        className="mt-5 rounded-lg bg-[#3E4234] px-5 py-3 text-sm font-medium text-white hover:bg-[#525744]"
                                    >
                                        Agregar dirección
                                    </button>
                                </div>
                            ) : (
                                direccionesFiltradas.map((direccion) => (
                                    <article
                                        key={direccion.id}
                                        className="overflow-hidden rounded-xl border border-[#D6D6CF] bg-white shadow-sm"
                                    >
                                        <header className="flex flex-col gap-3 border-b border-[#D6D6CF] bg-[#F5F5F2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#6B705C]">
                                                    <Icono
                                                        tipo="casa"
                                                        className="h-6 w-6"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <h2 className="break-words font-semibold text-[#3E4234]">
                                                        {direccion.alias}
                                                    </h2>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {direccion.nombreDestinatario}
                                                    </p>
                                                </div>
                                            </div>

                                            {direccion.principalEnvio ||
                                            direccion.principalFacturacion ? (
                                                <Etiqueta color="gris">
                                                    Dirección principal
                                                </Etiqueta>
                                            ) : null}
                                        </header>

                                        <div className="p-5">
                                            <div className="flex items-start gap-3">
                                                <Icono
                                                    tipo="ubicacion"
                                                    className="mt-0.5 h-5 w-5 shrink-0 text-[#6B705C]"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <p className="break-words text-sm leading-relaxed text-[#3E4234]">
                                                        {direccion.calle}{" "}
                                                        {direccion.numeroExterior}
                                                        {direccion.numeroInterior
                                                            ? `, Int. ${direccion.numeroInterior}`
                                                            : ""}
                                                    </p>

                                                    <p className="mt-1 break-words text-sm leading-relaxed text-gray-600">
                                                        Col. {direccion.colonia},{" "}
                                                        C.P. {direccion.codigoPostal}
                                                    </p>

                                                    <p className="break-words text-sm leading-relaxed text-gray-600">
                                                        {direccion.ciudad},{" "}
                                                        {direccion.estado}
                                                    </p>

                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Tel. {direccion.telefono}
                                                    </p>

                                                    {direccion.referencias && (
                                                        <p className="mt-2 break-words text-sm leading-relaxed text-gray-500">
                                                            Referencias:{" "}
                                                            {direccion.referencias}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-2 border-t border-[#E5E5E0] pt-4">
                                                {direccion.esEnvio && (
                                                    <Etiqueta color="azul">
                                                        <span className="mr-1.5">
                                                            Envío
                                                        </span>
                                                        {direccion.principalEnvio &&
                                                            "· Principal"}
                                                    </Etiqueta>
                                                )}

                                                {direccion.esFacturacion && (
                                                    <Etiqueta color="verde">
                                                        <span className="mr-1.5">
                                                            Facturación
                                                        </span>
                                                        {direccion.principalFacturacion &&
                                                            "· Principal"}
                                                    </Etiqueta>
                                                )}
                                            </div>

                                            <div className="mt-5 flex flex-col gap-2 border-t border-[#E5E5E0] pt-4 sm:flex-row sm:justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        abrirEdicion(direccion)
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D6D6CF] px-4 py-2.5 text-sm font-medium text-[#3E4234] transition hover:bg-[#F5F5F2]"
                                                >
                                                    <Icono
                                                        tipo="editar"
                                                        className="h-4 w-4"
                                                    />
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        eliminarDireccion(
                                                            direccion
                                                        )
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                                >
                                                    <Icono
                                                        tipo="eliminar"
                                                        className="h-4 w-4"
                                                    />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            )}
                        </section>

                        <div className="mt-5 rounded-lg bg-[#F5F5F2] p-4">
                            <p className="text-sm leading-relaxed text-gray-600">
                                <span className="font-semibold text-[#3E4234]">
                                    Importante:
                                </span>{" "}
                                puedes usar la misma dirección para envío y facturación, o mantener domicilios independientes. Los cambios de esta demostración se pierden al recargar la página.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {modalAbierto && (
                <ModalDireccion
                    key={direccionEditar?.id ?? "nueva"}
                    direccion={direccionEditar}
                    direcciones={direcciones}
                    alCerrar={() => {
                        setModalAbierto(false);
                        setDireccionEditar(null);
                    }}
                    alGuardar={guardarDireccion}
                />
            )}
        </main>
    );
}
