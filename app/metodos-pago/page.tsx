
"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import SidebarCliente from "../components/SidebarCliente";

type TipoMetodo = "CREDITO" | "DEBITO" | "PAYPAL";

type MetodoPago = {
    id: number;
    tipo: TipoMetodo;
    nombre: string;
    marca?: string;
    ultimosDigitos?: string;
    vencimiento?: string;
    predeterminado: boolean;
};

const metodosIniciales: MetodoPago[] = [
    {
        id: 1,
        tipo: "CREDITO",
        nombre: "Tarjeta de crédito",
        marca: "Visa",
        ultimosDigitos: "4821",
        vencimiento: "08/28",
        predeterminado: false,
    },
    {
        id: 2,
        tipo: "DEBITO",
        nombre: "Tarjeta de débito",
        marca: "Mastercard",
        ultimosDigitos: "7362",
        vencimiento: "11/27",
        predeterminado: false,
    },
    {
        id: 3,
        tipo: "PAYPAL",
        nombre: "PayPal",
        predeterminado: true,
    },
];

function IconoTarjeta() {
    return (
        <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 10h18" />
            <path d="M7 15h4" />
        </svg>
    );
}

function IconoPayPal() {
    return (
        <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
        >
            <path d="M7 20 10 4h7a4 4 0 014 5 6 6 0 01-6 5h-4l-1 6H7Z" />
            <path d="M5 17H3l3-14h7" />
        </svg>
    );
}

function IconoAgregar() {
    return (
        <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" />
        </svg>
    );
}

function IconoEstrella() {
    return (
        <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
    );
}

function IconoMetodo({ tipo }: { tipo: TipoMetodo }) {
    return (
        <div className="w-12 h-12 rounded-lg bg-[#F1F1EF] text-[#3E4234] flex items-center justify-center shrink-0">
            {tipo === "PAYPAL" ? <IconoPayPal /> : <IconoTarjeta />}
        </div>
    );
}

export default function MetodosPagoPage() {
    const { usuario, autenticado } = useAuth();

    const [metodos, setMetodos] =
        useState<MetodoPago[]>(metodosIniciales);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tipoNuevo, setTipoNuevo] = useState<TipoMetodo>("CREDITO");
    const [marca, setMarca] = useState("Visa");
    const [ultimosDigitos, setUltimosDigitos] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const paypal = metodos.find(
        (metodo) => metodo.tipo === "PAYPAL"
    );

    function establecerPredeterminado(id: number) {
        setMetodos((actuales) =>
            actuales.map((metodo) => ({
                ...metodo,
                predeterminado: metodo.id === id,
            }))
        );

        setError("");
        setMensaje(
            "Método predeterminado actualizado en esta demostración."
        );
    }

    function eliminarMetodo(id: number) {
        const metodo = metodos.find((item) => item.id === id);

        if (!metodo) return;

        // PayPal siempre permanece disponible.
        if (metodo.tipo === "PAYPAL") {
            setError(
                "PayPal no se puede eliminar de tus métodos disponibles."
            );
            return;
        }

        if (
            !window.confirm(
                "¿Deseas eliminar esta tarjeta de la demostración?"
            )
        ) {
            return;
        }

        const restantes = metodos.filter(
            (item) => item.id !== id
        );

        // Si se elimina el método predeterminado,
        // PayPal pasa a ser el predeterminado.
        if (metodo.predeterminado) {
            restantes.forEach((item) => {
                item.predeterminado = item.tipo === "PAYPAL";
            });
        }

        setMetodos(restantes);
        setError("");
        setMensaje(
            "Tarjeta eliminada de la demostración."
        );
    }

    function conectarPayPal() {
        // Acceso oficial de PayPal.
        // La vinculación real requiere configurar OAuth
        // y una URL de retorno en el backend.
        window.location.assign("https://www.paypal.com/signin");
    }

    function limpiarFormulario() {
        setTipoNuevo("CREDITO");
        setMarca("Visa");
        setUltimosDigitos("");
        setVencimiento("");
        setError("");
        setMostrarFormulario(false);
    }

    function agregarMetodo(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setError("");
        setMensaje("");

        if (tipoNuevo === "PAYPAL") {
            conectarPayPal();
            return;
        }

        if (!/^\d{4}$/.test(ultimosDigitos)) {
            setError(
                "Introduce únicamente los últimos cuatro dígitos de la tarjeta."
            );
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) {
            setError(
                "Introduce el vencimiento con el formato MM/AA."
            );
            return;
        }

        const [mes, anio] = vencimiento.split("/").map(Number);
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear();
        const mesActual = fechaActual.getMonth() + 1;
        const anioCompleto = 2000 + anio;

        if (
            anioCompleto < anioActual ||
            (anioCompleto === anioActual && mes < mesActual)
        ) {
            setError(
                "La tarjeta debe tener una fecha de vencimiento vigente."
            );
            return;
        }

        const duplicado = metodos.some(
            (metodo) =>
                metodo.tipo === tipoNuevo &&
                metodo.marca === marca &&
                metodo.ultimosDigitos === ultimosDigitos
        );

        if (duplicado) {
            setError(
                "Esta tarjeta ya existe en la demostración."
            );
            return;
        }

        const nuevo: MetodoPago = {
            id: Math.max(
                0,
                ...metodos.map((metodo) => metodo.id)
            ) + 1,
            tipo: tipoNuevo,
            nombre:
                tipoNuevo === "CREDITO"
                    ? "Tarjeta de crédito"
                    : "Tarjeta de débito",
            marca,
            ultimosDigitos,
            vencimiento,
            predeterminado: false,
        };

        setMetodos((actuales) => [...actuales, nuevo]);
        limpiarFormulario();

        setMensaje(
            "Tarjeta agregada a la demostración. No se guardó en la base de datos."
        );
    }

    if (!autenticado || !usuario) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Inicia sesión para consultar tus métodos de pago.
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
                                Métodos de pago
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Administra tus tarjetas y tu cuenta de PayPal.
                            </p>
                        </div>

                        {/* Mensajes */}
                        {mensaje && (
                            <div
                                role="status"
                                className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                            >
                                {mensaje}
                            </div>
                        )}

                        {error && !mostrarFormulario && (
                            <div
                                role="alert"
                                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        {/* 1. Métodos guardados */}
                        <section className="mb-7">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    1. Métodos guardados
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Consulta tus tarjetas y las opciones de pago disponibles.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm overflow-hidden">
                                {metodos.map((metodo, indice) => (
                                    <div
                                        key={metodo.id}
                                        className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 ${
                                            indice !== metodos.length - 1
                                                ? "border-b border-[#E5E5E0]"
                                                : ""
                                        }`}
                                    >
                                        <IconoMetodo tipo={metodo.tipo} />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold text-[#3E4234]">
                                                    {metodo.nombre}
                                                </h3>

                                                {metodo.predeterminado && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F1EF] text-[#596047] px-2.5 py-1 text-xs font-medium">
                                                        <IconoEstrella />
                                                        Predeterminado
                                                    </span>
                                                )}

                                                {metodo.tipo === "PAYPAL" && (
                                                    <span className="inline-flex rounded-full bg-blue-50 text-blue-800 px-2.5 py-1 text-xs font-medium">
                                                        Disponible
                                                    </span>
                                                )}
                                            </div>

                                            {metodo.tipo === "PAYPAL" ? (
                                                <>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Accede a tu cuenta de PayPal para iniciar sesión.
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        No está vinculado todavía a eNova Home.
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {metodo.marca} ···· {metodo.ultimosDigitos}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Vence {metodo.vencimiento}
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            {metodo.tipo === "PAYPAL" ? (
                                                <button
                                                    type="button"
                                                    onClick={conectarPayPal}
                                                    className="rounded-md bg-[#3E4234] hover:bg-[#525744] px-4 py-2 text-sm text-white transition-colors"
                                                >
                                                    Conectar con PayPal
                                                </button>
                                            ) : (
                                                <>
                                                    {!metodo.predeterminado && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                establecerPredeterminado(metodo.id)
                                                            }
                                                            className="rounded-md border border-[#D6D6CF] px-3 py-2 text-xs sm:text-sm text-[#3E4234] hover:bg-[#F5F5F2] transition-colors"
                                                        >
                                                            Hacer predeterminado
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            eliminarMetodo(metodo.id)
                                                        }
                                                        className="rounded-md border border-red-200 px-3 py-2 text-xs sm:text-sm text-red-700 hover:bg-red-50 transition-colors"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 2. Método predeterminado */}
                        <section className="mb-7">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    2. Método predeterminado
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Elige el método que prefieres para futuras compras.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-5">
                                {(() => {
                                    const predeterminado = metodos.find(
                                        (metodo) => metodo.predeterminado
                                    );

                                    if (!predeterminado) {
                                        return (
                                            <p className="text-sm text-gray-600">
                                                Selecciona un método de pago para establecerlo como predeterminado.
                                            </p>
                                        );
                                    }

                                    return (
                                        <div className="flex items-center gap-3">
                                            <IconoMetodo tipo={predeterminado.tipo} />

                                            <div className="min-w-0">
                                                <p className="font-semibold text-[#3E4234]">
                                                    {predeterminado.nombre}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {predeterminado.tipo === "PAYPAL"
                                                        ? "PayPal seleccionado como preferencia"
                                                        : `${predeterminado.marca} ···· ${predeterminado.ultimosDigitos}`}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {paypal && !paypal.predeterminado && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            establecerPredeterminado(paypal.id)
                                        }
                                        className="mt-4 rounded-md border border-[#D6D6CF] px-4 py-2 text-sm text-[#3E4234] hover:bg-[#F5F5F2] transition-colors"
                                    >
                                        Elegir PayPal como predeterminado
                                    </button>
                                )}

                                {paypal?.predeterminado && (
                                    <p className="text-xs text-gray-500 mt-3">
                                        PayPal es la preferencia inicial. Para realizar pagos reales, primero deberá completarse su vinculación.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* 3. Agregar método de pago */}
                        <section>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    3. Agregar método de pago
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Añade una tarjeta o inicia el acceso a PayPal.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-[#D6D6CF] shadow-sm p-5">
                                {!mostrarFormulario ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setError("");
                                            setMensaje("");
                                            setMostrarFormulario(true);
                                        }}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-[#3E4234] hover:bg-[#525744] text-white px-5 py-3 text-sm font-medium transition-colors"
                                    >
                                        <IconoAgregar />
                                        Agregar método de pago
                                    </button>
                                ) : (
                                    <form
                                        onSubmit={agregarMetodo}
                                        className="space-y-5"
                                    >
                                        <div>
                                            <label
                                                htmlFor="tipoMetodo"
                                                className="block text-sm font-medium text-[#3E4234] mb-2"
                                            >
                                                Tipo de método
                                            </label>

                                            <select
                                                id="tipoMetodo"
                                                value={tipoNuevo}
                                                onChange={(evento) => {
                                                    setTipoNuevo(
                                                        evento.target.value as TipoMetodo
                                                    );
                                                    setError("");
                                                }}
                                                className="w-full rounded-lg border border-[#D6D6CF] bg-white px-3 py-3 text-sm text-[#3E4234] outline-none focus:ring-2 focus:ring-[#6B705C]"
                                            >
                                                <option value="CREDITO">
                                                    Tarjeta de crédito
                                                </option>
                                                <option value="DEBITO">
                                                    Tarjeta de débito
                                                </option>
                                                <option value="PAYPAL">
                                                    PayPal
                                                </option>
                                            </select>
                                        </div>

                                        {tipoNuevo === "PAYPAL" ? (
                                            <div className="rounded-lg bg-[#F5F5F2] p-4">
                                                <p className="text-sm text-gray-600 mb-3">
                                                    Inicia sesión en PayPal para continuar.
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={conectarPayPal}
                                                    className="rounded-md bg-[#3E4234] hover:bg-[#525744] px-4 py-2.5 text-sm text-white"
                                                >
                                                    Conectar con PayPal
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    <label
                                                        htmlFor="marcaTarjeta"
                                                        className="block text-sm font-medium text-[#3E4234] mb-2"
                                                    >
                                                        Marca de la tarjeta
                                                    </label>

                                                    <select
                                                        id="marcaTarjeta"
                                                        value={marca}
                                                        onChange={(evento) =>
                                                            setMarca(evento.target.value)
                                                        }
                                                        className="w-full rounded-lg border border-[#D6D6CF] bg-white px-3 py-3 text-sm text-[#3E4234] outline-none focus:ring-2 focus:ring-[#6B705C]"
                                                    >
                                                        <option value="Visa">
                                                            Visa
                                                        </option>
                                                        <option value="Mastercard">
                                                            Mastercard
                                                        </option>
                                                        <option value="American Express">
                                                            American Express
                                                        </option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="ultimosDigitos"
                                                        className="block text-sm font-medium text-[#3E4234] mb-2"
                                                    >
                                                        Últimos cuatro dígitos
                                                    </label>

                                                    <input
                                                        id="ultimosDigitos"
                                                        type="text"
                                                        inputMode="numeric"
                                                        autoComplete="off"
                                                        maxLength={4}
                                                        pattern="[0-9]{4}"
                                                        value={ultimosDigitos}
                                                        onChange={(evento) =>
                                                            setUltimosDigitos(
                                                                evento.target.value
                                                                    .replace(/\D/g, "")
                                                                    .slice(0, 4)
                                                            )
                                                        }
                                                        placeholder="Ej. 4821"
                                                        required
                                                        className="w-full rounded-lg border border-[#D6D6CF] px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6B705C]"
                                                    />

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        No introduzcas el número completo de la tarjeta ni el CVV.
                                                    </p>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="vencimiento"
                                                        className="block text-sm font-medium text-[#3E4234] mb-2"
                                                    >
                                                        Vencimiento (MM/AA)
                                                    </label>

                                                    <input
                                                        id="vencimiento"
                                                        type="text"
                                                        inputMode="numeric"
                                                        autoComplete="off"
                                                        maxLength={5}
                                                        value={vencimiento}
                                                        onChange={(evento) => {
                                                            const numeros = evento.target.value
                                                                .replace(/\D/g, "")
                                                                .slice(0, 4);

                                                            setVencimiento(
                                                                numeros.length > 2
                                                                    ? `${numeros.slice(0, 2)}/${numeros.slice(2)}`
                                                                    : numeros
                                                            );
                                                        }}
                                                        placeholder="MM/AA"
                                                        required
                                                        className="w-full rounded-lg border border-[#D6D6CF] px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6B705C]"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {error && (
                                            <div
                                                role="alert"
                                                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                            >
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {tipoNuevo !== "PAYPAL" && (
                                                <button
                                                    type="submit"
                                                    className="rounded-lg bg-[#3E4234] hover:bg-[#525744] text-white px-5 py-3 text-sm font-medium transition-colors"
                                                >
                                                    Guardar tarjeta de demostración
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={limpiarFormulario}
                                                className="rounded-lg border border-[#D6D6CF] hover:bg-[#F5F5F2] text-[#3E4234] px-5 py-3 text-sm transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </section>

                        <p className="mt-5 text-xs text-gray-400">
                            Las tarjetas se administran localmente en esta demostración. PayPal abre su página oficial de inicio de sesión, pero aún no está vinculado a eNova Home. Los cambios se restablecen al recargar.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
