"use client";

import { useEffect, useState } from "react";

interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string | null;
}

interface Direccion {
    id_direccion: number;
    id_cliente: number;
    nombre_receptor: string;
    telefono: string | null;
    calle: string;
    numero_exterior: string;
    numero_interior: string | null;
    colonia: string;
    codigo_postal: string;
    municipio: string;
    estado: string;
    pais: string;
    referencias: string | null;
    principal: boolean;
    activo: boolean;
}

interface Pedido {
    id_pedido: number;
    id_cliente: number;
    id_direccion: number;
    numero_pedido: string;
    estado: string;
    subtotal: number | string;
    descuento: number | string;
    costo_envio: number | string;
    total: number | string;
}

interface ModalActualizarPedidoProps {
    pedido: Pedido;
    onCerrar: () => void;
    onActualizado: () => void;
}

export default function ModalActualizarPedido({
    pedido,
    onCerrar,
    onActualizado
}: ModalActualizarPedidoProps) {

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

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    /*
     * Cargar los datos del pedido
     * cada vez que cambia el pedido seleccionado.
     */
    useEffect(() => {
        setIdCliente(String(pedido.id_cliente));
        setIdDireccion(String(pedido.id_direccion));
        setNumeroPedido(pedido.numero_pedido);
        setEstado(pedido.estado);
        setSubtotal(String(pedido.subtotal));
        setDescuento(String(pedido.descuento));
        setCostoEnvio(String(pedido.costo_envio));
        setTotal(
            (
                Number(pedido.subtotal) -
                Number(pedido.descuento) +
                Number(pedido.costo_envio)
            ).toFixed(2)
        );

        setMensaje("");
        setError("");
    }, [pedido]);

    /*
     * Cargar clientes cuando se abre el modal.
     */
    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const respuesta = await fetch(
                    `${API_URL}/clientes`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const datos = await respuesta.json();

                if (!respuesta.ok || !datos.success) {
                    throw new Error(
                        datos.response ||
                        datos.mensaje ||
                        "No se pudieron cargar los clientes"
                    );
                }

                setClientes(datos.clientes);
            } catch (error) {
                console.error(
                    "Error al cargar clientes:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar los clientes"
                );
            }
        };

        cargarClientes();
    }, [API_URL]);

    /*
     * Cargar las direcciones del cliente seleccionado.
     */
    useEffect(() => {
        const cargarDirecciones = async () => {

            if (!idCliente) {
                setDirecciones([]);
                return;
            }

            try {
                const respuesta = await fetch(
                    `${API_URL}/clientes/${idCliente}/direcciones`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const datos = await respuesta.json();

                if (!respuesta.ok || !datos.success) {
                    throw new Error(
                        datos.response ||
                        datos.mensaje ||
                        "No se pudieron cargar las direcciones"
                    );
                }

                const direccionesCliente = datos.direcciones || [];

                setDirecciones(direccionesCliente);

                /*
                 * Mantener seleccionada la dirección
                 * principal del cliente.
                 */
                const direccionPrincipal =
                    direccionesCliente.find(
                        (direccion: Direccion) =>
                            direccion.principal === true
                    );

                if (direccionPrincipal) {
                    setIdDireccion(
                        String(direccionPrincipal.id_direccion)
                    );
                }

            } catch (error) {
                console.error(
                    "Error al cargar direcciones:",
                    error
                );

                setDirecciones([]);

                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar las direcciones"
                );
            }
        };

        cargarDirecciones();

    }, [idCliente, API_URL]);

    /*
     * Calcular total automáticamente.
     */
    useEffect(() => {

        const subtotalNumero = Number(subtotal) || 0;
        const descuentoNumero = Number(descuento) || 0;
        const costoEnvioNumero = Number(costoEnvio) || 0;

        const totalCalculado =
            subtotalNumero -
            descuentoNumero +
            costoEnvioNumero;

        setTotal(
            Math.max(0, totalCalculado).toFixed(2)
        );

    }, [subtotal, descuento, costoEnvio]);

    const actualizarPedido = async () => {
    try {
        setCargando(true);
        setMensaje("");
        setError("");

        if (!idCliente) {
            throw new Error("Debes seleccionar un cliente.");
        }

        if (!idDireccion) {
            throw new Error(
                "El cliente seleccionado no tiene una dirección principal."
            );
        }

        if (!numeroPedido.trim()) {
            throw new Error(
                "El número de pedido es obligatorio."
            );
        }

        const subtotalNumero = Number(subtotal);
        const descuentoNumero = Number(descuento);
        const costoEnvioNumero = Number(costoEnvio);
        const totalNumero = Number(total);

        if (
            Number.isNaN(subtotalNumero) ||
            subtotalNumero < 0
        ) {
            throw new Error(
                "El subtotal debe ser un número mayor o igual a 0."
            );
        }

        if (
            Number.isNaN(descuentoNumero) ||
            descuentoNumero < 0
        ) {
            throw new Error(
                "El descuento debe ser un número mayor o igual a 0."
            );
        }

        if (descuentoNumero > subtotalNumero) {
            throw new Error(
                "El descuento no puede ser mayor que el subtotal."
            );
        }

        if (
            Number.isNaN(costoEnvioNumero) ||
            costoEnvioNumero < 0
        ) {
            throw new Error(
                "El costo de envío debe ser un número mayor o igual a 0."
            );
        }

        const respuesta = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/pedidos/${pedido.id_pedido}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    id_cliente: Number(idCliente),
                    id_direccion: Number(idDireccion),
                    numero_pedido: numeroPedido.trim(),
                    estado,
                    subtotal: subtotalNumero,
                    descuento: descuentoNumero,
                    costo_envio: costoEnvioNumero,
                    total: totalNumero,
                }),
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok || !datos.success) {
            throw new Error(
                datos.response ||
                "No se pudo actualizar el pedido"
            );
        }

        setMensaje(
            datos.response ||
            "Pedido actualizado correctamente."
        );

        setTimeout(() => {
            onActualizado();
            onCerrar();
        }, 1800);

    } catch (error) {

        console.error(
            "Error al actualizar pedido:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "Error al actualizar el pedido"
        );

    } finally {
        setCargando(false);
    }
};

    /*
     * Cambiar cliente.
     */
    const cambiarCliente = (
        valor: string
    ) => {

        setIdCliente(valor);
        setError("");

        if (!valor) {
            setDirecciones([]);
            setIdDireccion("");
            return;
        }

        /*
         * Las direcciones se cargan mediante
         * el useEffect asociado al cliente.
         */
    };

    if (!pedido) {
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

                    <div>

                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-[#3E4234]
                            "
                        >
                            Actualizar pedido
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-600
                            "
                        >
                            ID: {pedido.id_pedido}
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onCerrar}
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
                        "
                    >
                        ✕
                    </button>

                </div>

                {/* Formulario */}

                <div className="p-6">

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        "
                    >

                        {/* Cliente */}

                        <div className="md:col-span-2">

                            <label
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Cliente
                            </label>

                            <select
                                value={idCliente}
                                onChange={(event) =>
                                    cambiarCliente(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    px-4
                                    py-2.5
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
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

                        {/* Dirección principal */}

                        <div className="md:col-span-2">

                            <label
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Dirección principal
                            </label>

                            <select
                                value={idDireccion}
                                disabled
                                className="
                                    w-full
                                    px-4
                                    py-2.5
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-gray-100
                                    text-[#3E4234]
                                    outline-none
                                "
                            >

                                <option value="">
                                    Seleccionar dirección
                                </option>

                                {direcciones.map((direccion) => (
                                    <option
                                        key={direccion.id_direccion}
                                        value={direccion.id_direccion}
                                    >
                                        {direccion.calle}{" "}
                                        {direccion.numero_exterior},{" "}
                                        {direccion.colonia},{" "}
                                        {direccion.municipio}
                                    </option>
                                ))}

                            </select>

                        </div>

                        {/* Número de pedido */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
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
                                onChange={(event) =>
                                    setNumeroPedido(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    px-4
                                    py-2.5
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                "
                            />

                        </div>

                        {/* Estado */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Estado del pedido
                            </label>

                            <select
                                value={estado}
                                onChange={(event) =>
                                    setEstado(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    px-4
                                    py-2.5
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
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

                        {/* Subtotal */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
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
                                onChange={(event) =>
                                    setSubtotal(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    px-4
                                    py-2.5
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                "
                            />

                        </div>

                        {/* Descuento */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
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
                                onChange={(event) =>
                                    setDescuento(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    px-4
                                    py-2.5
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                "
                            />

                        </div>

                        {/* Costo de envío */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
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
                                onChange={(event) =>
                                    setCostoEnvio(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    px-4
                                    py-2.5
                                    rounded-md
                                    border
                                    border-[#D6D6CF]
                                    bg-white
                                    text-[#3E4234]
                                    outline-none
                                    focus:border-[#6B705C]
                                "
                            />

                        </div>

                        {/* Total */}

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
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

                    {/* Mensajes */}

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

                    {mensaje && (
                        <div
                            className="
                                mt-5
                                rounded-md
                                border
                                border-green-300
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

                    {/* Botones */}

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
                            onClick={onCerrar}
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
                            onClick={actualizarPedido}
                            disabled={cargando}
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
                            "
                        >
                            {cargando
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}