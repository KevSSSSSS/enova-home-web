"use client";

import { useEffect, useState } from "react";

interface ModalAgregarPedidoProps {
    abierto: boolean;
    onCerrar: () => void;
    onRegistrado: () => void;
}

interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string | null;
}

interface Direccion {
    id_direccion: number;
    nombre_receptor: string;
    calle: string;
    numero_exterior: string;
    numero_interior?: string | null;
    colonia: string;
    codigo_postal: string;
    municipio: string;
    estado: string;
    pais: string;
}

export default function ModalAgregarPedido({
    abierto,
    onCerrar,
    onRegistrado
}: ModalAgregarPedidoProps) {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [direcciones, setDirecciones] = useState<Direccion[]>([]);

    const [idCliente, setIdCliente] = useState("");
    const [idDireccion, setIdDireccion] = useState("");

    const [numeroPedido, setNumeroPedido] = useState("");
    const [estado, setEstado] = useState("PENDIENTE");

    const [subtotal, setSubtotal] = useState("");
    const [descuento, setDescuento] = useState("");
    const [costoEnvio, setCostoEnvio] = useState("");

    const [total, setTotal] = useState("0.00");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    /*
     * ------------------------------------------------------------
     * Cargar clientes
     * ------------------------------------------------------------
     */

    useEffect(() => {

        if (!abierto) return;

        const cargarClientes = async () => {

            try {

                const respuesta = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/clientes`
                );

                const datos = await respuesta.json();

                if (datos.success) {
                    setClientes(datos.clientes || []);
                }

            } catch (error) {

                console.error(
                    "Error al cargar clientes:",
                    error
                );

            }

        };

        cargarClientes();

    }, [abierto]);

    /*
     * ------------------------------------------------------------
     * Calcular total
     * ------------------------------------------------------------
     */

    useEffect(() => {

        const subtotalNumero =
            parseFloat(subtotal) || 0;

        const descuentoNumero =
            parseFloat(descuento) || 0;

        const costoEnvioNumero =
            parseFloat(costoEnvio) || 0;

        const resultado =
            subtotalNumero -
            descuentoNumero +
            costoEnvioNumero;

        setTotal(
            resultado >= 0
                ? resultado.toFixed(2)
                : "0.00"
        );

    }, [subtotal, descuento, costoEnvio]);

    /*
     * ------------------------------------------------------------
     * Cargar direcciones del cliente
     * ------------------------------------------------------------
     */

    const cambiarCliente = async (
        valor: string
    ) => {

        setIdCliente(valor);
        setIdDireccion("");
        setDirecciones([]);

        if (!valor) {
            return;
        }

        try {

            const respuesta = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/clientes/${valor}/direcciones`
            );

            const datos = await respuesta.json();

            if (datos.success) {

                const direccionesCliente =
                    datos.direcciones || [];

                const direccionPrincipal =
                    direccionesCliente.find(
                        (direccion: Direccion) =>
                            (direccion as Direccion & {
                                principal?: boolean;
                            }).principal === true
                    );

                setDirecciones(
                    direccionPrincipal
                        ? [direccionPrincipal]
                        : direccionesCliente
                );

                if (direccionPrincipal) {
                    setIdDireccion(
                        String(
                            direccionPrincipal.id_direccion
                        )
                    );
                }

            }

        } catch (error) {

            console.error(
                "Error al cargar direcciones:",
                error
            );

        }

    };

    /*
 * ------------------------------------------------------------
 * Guardar pedido
 * ------------------------------------------------------------
 */

const guardarPedido = async () => {

    try {

        setError("");

        if (!idCliente) {
            setError("Debes seleccionar un cliente.");
            return;
        }

        if (!idDireccion) {
            setError("Debes seleccionar una dirección.");
            return;
        }

        if (!numeroPedido.trim()) {
            setError("Debes ingresar el número de pedido.");
            return;
        }

        if (!subtotal || Number(subtotal) < 0) {
            setError("El subtotal debe ser mayor o igual a 0.");
            return;
        }

        if (!descuento || Number(descuento) < 0) {
            setError("El descuento debe ser mayor o igual a 0.");
            return;
        }

        if (!costoEnvio || Number(costoEnvio) < 0) {
            setError("El costo de envío debe ser mayor o igual a 0.");
            return;
        }

        if (Number(descuento) > Number(subtotal)) {
            setError(
                "El descuento no puede ser mayor que el subtotal."
            );
            return;
        }

        setGuardando(true);

        const respuesta = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/pedidos`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    id_cliente: Number(idCliente),
                    id_direccion: Number(idDireccion),
                    numero_pedido: numeroPedido.trim(),
                    estado,
                    subtotal: Number(subtotal),
                    descuento: Number(descuento),
                    costo_envio: Number(costoEnvio),
                    total: Number(total),
                }),
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok || !datos.success) {

            throw new Error(
                datos.response ||
                "No se pudo registrar el pedido."
            );

        }

/*
 * ============================================================
 * PEDIDO REGISTRADO CORRECTAMENTE
 * ============================================================
 */

setMensaje(
    datos.response ||
    "Pedido registrado correctamente."
);

/*
 * Avisar al CRUD que el pedido
 * fue registrado correctamente.
 */
onRegistrado();

/*
 * Dejamos visible el mensaje de éxito
 * antes de cerrar el modal.
 */
setTimeout(() => {

    onCerrar();

}, 1800);

    } catch (error) {

        console.error(
            "Error al guardar pedido:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "No se pudo registrar el pedido."
        );

    } finally {

        setGuardando(false);

    }

};

    /*
     * ------------------------------------------------------------
     * Cerrar modal
     * ------------------------------------------------------------
     */

    const cerrarModal = () => {

        if (onCerrar) {
            onCerrar();
        }

    };

    if (!abierto) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-4
            "
        >

            <div
                className="
                    w-full
                    max-w-3xl
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-lg
                    bg-white
                    shadow-xl
                "
            >

                {/* =================================================
                    ENCABEZADO
                ================================================== */}

                <div
                    className="
                        border-b
                        border-[#D6D6CF]
                        px-6
                        py-5
                    "
                >

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-[#1F2937]
                        "
                    >
                        Agregar pedido
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-[#526581]
                        "
                    >
                        Registra un nuevo pedido.
                    </p>

                </div>

                {/* =================================================
                    FORMULARIO
                ================================================== */}

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="px-6 py-6"
                >

                {error && (

    <div
        className="
            mb-5
            rounded-md
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

{mensaje && (

    <div
        className="
            mb-5
            rounded-md
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

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        "
                    >

                        {/* CLIENTE */}

                        <div className="md:col-span-2">

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Cliente
                            </label>

                            <select
                                value={idCliente}
                                onChange={(e) =>
                                    cambiarCliente(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                    focus:ring-1
                                    focus:ring-[#6B705C]
                                "
                            >

                                <option value="">
                                    Seleccionar cliente
                                </option>

                                {clientes.map((cliente) => (

                                    <option
                                        key={cliente.id_cliente}
                                        value={cliente.id_cliente}
                                    >
                                        {cliente.nombre}{" "}
                                        {cliente.apellido_paterno}{" "}
                                        {cliente.apellido_materno || ""}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* DIRECCIÓN */}

                        <div className="md:col-span-2">

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Dirección principal
                            </label>

                            <select
                                value={idDireccion}
                                onChange={(e) =>
                                    setIdDireccion(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    !idCliente ||
                                    direcciones.length === 0
                                }
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                    focus:ring-1
                                    focus:ring-[#6B705C]
                                    disabled:bg-[#F1F1EF]
                                    disabled:text-gray-400
                                "
                            >

                                <option value="">
                                    {idCliente
                                        ? "Seleccionar dirección"
                                        : "Selecciona primero un cliente"}
                                </option>

                                {direcciones.map((direccion) => (

                                    <option
                                        key={direccion.id_direccion}
                                        value={direccion.id_direccion}
                                    >
                                        {direccion.calle}{" "}
                                        {direccion.numero_exterior}
                                        {direccion.numero_interior
                                            ? ` Int. ${direccion.numero_interior}`
                                            : ""}
                                        {" - "}
                                        {direccion.colonia},{" "}
                                        {direccion.codigo_postal},{" "}
                                        {direccion.municipio},{" "}
                                        {direccion.estado}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* NÚMERO DE PEDIDO */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Número de pedido
                            </label>

                            <input
                                type="text"
                                value={numeroPedido}
                                onChange={(e) =>
                                    setNumeroPedido(
                                        e.target.value
                                    )
                                }
                                placeholder="PED-20260007"
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                    focus:ring-1
                                    focus:ring-[#6B705C]
                                "
                            />

                        </div>

                        {/* ESTADO */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Estado
                            </label>

                            <select
                                value={estado}
                                onChange={(e) =>
                                    setEstado(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                    focus:ring-1
                                    focus:ring-[#6B705C]
                                "
                            >

                                <option value="PENDIENTE">
                                    PENDIENTE
                                </option>

                                <option value="CONFIRMADO">
                                    CONFIRMADO
                                </option>

                                <option value="PREPARANDO">
                                    PREPARANDO
                                </option>

                                <option value="ENVIADO">
                                    ENVIADO
                                </option>

                                <option value="ENTREGADO">
                                    ENTREGADO
                                </option>

                                <option value="CANCELADO">
                                    CANCELADO
                                </option>

                            </select>

                        </div>

                        {/* SUBTOTAL */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Subtotal
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={subtotal}
                                onChange={(e) =>
                                    setSubtotal(
                                        e.target.value
                                    )
                                }
                                placeholder="0.00"
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                    focus:ring-1
                                    focus:ring-[#6B705C]
                                "
                            />

                        </div>

                        {/* DESCUENTO */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Descuento
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={descuento}
                                onChange={(e) =>
                                    setDescuento(
                                        e.target.value
                                    )
                                }
                                placeholder="0.00"
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                    focus:ring-1
                                    focus:ring-[#6B705C]
                                "
                            />

                        </div>

                        {/* COSTO DE ENVÍO */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Costo de envío
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={costoEnvio}
                                onChange={(e) =>
                                    setCostoEnvio(
                                        e.target.value
                                    )
                                }
                                placeholder="0.00"
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                    focus:ring-1
                                    focus:ring-[#6B705C]
                                "
                            />

                        </div>

                        {/* TOTAL */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Total
                            </label>

                            <input
                                type="text"
                                value={`$${total}`}
                                readOnly
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-[#F1F1EF]
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[#3E4234]
                                "
                            />

                        </div>

                    </div>

                    {/* =================================================
                        BOTONES
                    ================================================== */}

                    <div
                        className="
                            flex
                            flex-col-reverse
                            sm:flex-row
                            sm:justify-end
                            gap-3
                            mt-7
                        "
                    >

                        <button
                            type="button"
                            onClick={cerrarModal}
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
                            "
                        >
                            Cancelar
                        </button>

<button
    type="button"
    onClick={guardarPedido}
    disabled={guardando}
    className="
        px-5
        py-2.5
        rounded-md
        bg-[#6B705C]
        text-white
        hover:bg-[#5B604E]
        transition-colors
        cursor-pointer
        disabled:opacity-60
        disabled:cursor-not-allowed
    "
>
    {guardando
        ? "Guardando..."
        : "Guardar pedido"}
</button>

                    </div>

                </form>

            </div>

        </div>
    );
}