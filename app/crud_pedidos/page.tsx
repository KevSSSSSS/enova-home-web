"use client";

import { useEffect, useState } from "react";
import SidebarAdministrador from "../components/SidebarAdministrador";
import ModalAgregarPedido from "../components/ModalAgregarPedido";
import ModalActualizarPedido from "../components/ModalActualizarPedido";
import ModalEliminarPedido from "../components/ModalEliminarPedido";

/*
 * ============================================================
 * TIPOS
 * ============================================================
 */

interface Pedido {
    id_pedido: number;
    id_cliente: number;

    nombre: string;
    apellido_paterno: string;
    apellido_materno: string | null;

    id_direccion: number;
    nombre_receptor: string;
    telefono_direccion: string | null;
    calle: string;
    numero_exterior: string;
    numero_interior: string | null;
    colonia: string;
    codigo_postal: string;
    municipio: string;
    estado_direccion: string;
    pais: string;
    referencias: string | null;

    numero_pedido: string;
    estado: string;
    subtotal: string;
    descuento: string;
    costo_envio: string;
    total: string;
    fecha_pedido: string;
    fecha_actualizacion: string;
}

/*
 * ============================================================
 * PÁGINA PEDIDOS
 * ============================================================
 */

export default function PedidosPage() {

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] =
    useState<Pedido | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    /*
     * ============================================================
     * OBTENER PEDIDOS
     * ============================================================
     */

const obtenerPedidos = async () => {

    try {

        setCargando(true);
        setError("");

        const respuesta = await fetch(
            `${API_URL}/pedidos`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok || !datos.success) {

            throw new Error(
                datos.response ||
                "No se pudieron obtener los pedidos"
            );

        }

        setPedidos(datos.pedidos);

    } catch (error) {

        console.error(
            "Error al obtener pedidos:",
            error
        );

        setError(
            error instanceof Error
                ? error.message
                : "Error al obtener los pedidos"
        );

    } finally {

        setCargando(false);

    }

};


/*
 * ============================================================
 * CARGAR PEDIDOS AL ABRIR LA PÁGINA
 * ============================================================
 */

useEffect(() => {

    obtenerPedidos();

}, [API_URL]);

    /*
     * ============================================================
     * FILTRAR PEDIDOS
     * ============================================================
     */

    const pedidosFiltrados = pedidos.filter((pedido) => {

        const termino =
            busqueda.trim().toLowerCase();

        if (!termino) {
            return true;
        }

        const nombreCompleto = [
            pedido.nombre,
            pedido.apellido_paterno,
            pedido.apellido_materno || "",
        ]
            .join(" ")
            .toLowerCase();

        const direccion = [
            pedido.calle,
            pedido.numero_exterior,
            pedido.numero_interior || "",
            pedido.colonia,
            pedido.codigo_postal,
            pedido.municipio,
            pedido.estado_direccion,
            pedido.pais,
        ]
            .join(" ")
            .toLowerCase();

        return (
            String(pedido.id_pedido)
                .includes(termino) ||
            nombreCompleto.includes(termino) ||
            direccion.includes(termino) ||
            pedido.numero_pedido
                .toLowerCase()
                .includes(termino) ||
            pedido.estado
                .toLowerCase()
                .includes(termino)
        );

    });

    /*
     * ============================================================
     * FORMATEAR FECHA
     * ============================================================
     */

    const formatearFecha = (
        fecha: string
    ) => {

        if (!fecha) {
            return "Sin fecha";
        }

        return new Intl.DateTimeFormat(
            "es-MX",
            {
                dateStyle: "short",
                timeStyle: "short",
            }
        ).format(
            new Date(fecha)
        );

    };

    /*
     * ============================================================
     * FORMATEAR MONEDA
     * ============================================================
     */

    const formatearMoneda = (
        valor: string
    ) => {

        return new Intl.NumberFormat(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
            }
        ).format(
            Number(valor)
        );

    };

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (

        <main
            className="
                min-h-screen
                px-4
                sm:px-6
                pt-32
                pb-8
                sm:pb-12
            "
        >

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    gap-8
                    md:gap-0
                "
            >

                {/* ====================================================
                    SIDEBAR
                ===================================================== */}

                <SidebarAdministrador />


                {/* ====================================================
                    CONTENIDO PRINCIPAL
                ===================================================== */}

                <div
                    className="
                        flex-1
                        min-w-0
                        w-full
                    "
                >

                    <div
                        className="
                            w-full
                            max-w-[1600px]
                            mx-auto
                        "
                    >

                        {/* ====================================================
                            TÍTULO
                        ===================================================== */}

                        <div className="mb-8">

                            <h1
                                className="
                                    text-3xl
                                    font-semibold
                                    text-[#3E4234]
                                "
                            >
                                Pedidos
                            </h1>

                            <p
                                className="
                                    mt-2
                                    text-gray-600
                                "
                            >
                                Administración de pedidos.
                            </p>

                        </div>


                        {/* ====================================================
                            CONTENEDOR PRINCIPAL
                        ===================================================== */}

                        <section
                            className="
                                bg-white
                                rounded-lg
                                shadow-md
                                border
                                border-[#D6D6CF]
                                overflow-hidden
                            "
                        >

                            {/* ====================================================
                                ENCABEZADO
                            ===================================================== */}

                            <div
                                className="
                                    bg-[#E7E7E5]
                                    px-6
                                    py-5
                                    border-b
                                    border-[#D6D6CF]
                                    flex
                                    flex-col
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    gap-4
                                "
                            >

                                {/* ====================================================
                                    TÍTULO
                                ===================================================== */}

                                <h2
                                    className="
                                        text-xl
                                        font-semibold
                                        text-[#3E4234]
                                    "
                                >
                                    Lista de pedidos
                                </h2>


                                {/* ====================================================
                                    BUSCADOR + LUPA + AGREGAR
                                ===================================================== */}

                                <div
                                    className="
                                        flex
                                        flex-col
                                        sm:flex-row
                                        sm:items-center
                                        gap-3
                                    "
                                >

                                    {/* Buscador */}

                                    <input
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) =>
                                            setBusqueda(e.target.value)
                                        }
                                        placeholder="Buscar..."
                                        className="
                                            w-full
                                            sm:w-[264px]
                                            px-4
                                            py-3
                                            text-sm
                                            rounded
                                            border
                                            border-[#D6D6CF]
                                            bg-white
                                            text-[#3E4234]
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-[#6B705C]
                                        "
                                    />


                                    {/* Botón de búsqueda */}

                                    <button
                                        type="button"
                                        aria-label="Buscar pedidos"
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            text-[#6B705C]
                                            hover:text-[#3E4234]
                                            transition-colors
                                        "
                                    >

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle
                                                cx="11"
                                                cy="11"
                                                r="8"
                                            />

                                            <path
                                                d="m21 21-4.35-4.35"
                                            />

                                        </svg>

                                    </button>


                                    {/* Agregar pedido */}

                                    <button
                                        type="button"
                                        onClick={() => setModalAgregar(true)}
                                        className="
                                            px-4
                                            py-3
                                            text-sm
                                            font-medium
                                            rounded
                                            bg-[#6B705C]
                                            text-white
                                            hover:bg-[#5B604E]
                                            transition-colors
                                            whitespace-nowrap
                                        "
                                    >
                                        Agregar pedido
                                    </button>

                                </div>

                            </div>


                            {/* ====================================================
                                CONTENIDO
                            ===================================================== */}

                            <div className="p-6">

                                {/* ====================================================
                                    CARGANDO
                                ===================================================== */}

                                {cargando ? (

                                    <div
                                        className="
                                            py-10
                                            text-center
                                            text-gray-600
                                        "
                                    >
                                        Cargando pedidos...
                                    </div>

                                ) : (


                                    /* ====================================================
                                        TABLA
                                    ===================================================== */

                                    <div className="overflow-x-auto">

                                        <table
                                            className="
                                                w-full
                                                text-sm
                                                min-w-[1500px]
                                            "
                                        >

                                            <thead>

                                                <tr
                                                    className="
                                                        border-b
                                                        border-[#D6D6CF]
                                                    "
                                                >

                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        ID del pedido
                                                    </th>


                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Nombre completo de Cliente
                                                    </th>


                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Dirección del cliente
                                                    </th>


                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Número de pedido
                                                    </th>


                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Estado del pedido
                                                    </th>


                                                    <th
                                                        className="
                                                            text-right
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Subtotal
                                                    </th>


                                                    <th
                                                        className="
                                                            text-right
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Descuento
                                                    </th>


                                                    <th
                                                        className="
                                                            text-right
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Costo de Envío
                                                    </th>


                                                    <th
                                                        className="
                                                            text-right
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Total
                                                    </th>


                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Fecha de Pedido
                                                    </th>


                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Fecha de Actualización
                                                    </th>


                                                    <th
                                                        className="
                                                            text-left
                                                            px-4
                                                            py-3
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Acciones
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {pedidosFiltrados.length === 0 ? (

                                                    <tr>

                                                        <td
                                                            colSpan={12}
                                                            className="
                                                                px-4
                                                                py-10
                                                                text-center
                                                                text-gray-500
                                                            "
                                                        >
                                                            No se encontraron pedidos.
                                                        </td>

                                                    </tr>

                                                ) : (

                                                    pedidosFiltrados.map(
                                                        (pedido) => (

                                                            <tr
                                                                key={
                                                                    pedido.id_pedido
                                                                }
                                                                className="
                                                                    border-b
                                                                    border-[#E5E5E0]
                                                                    hover:bg-gray-50
                                                                "
                                                            >

                                                                {/* ID */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                    "
                                                                >
                                                                    {
                                                                        pedido.id_pedido
                                                                    }
                                                                </td>


                                                                {/* CLIENTE */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                        font-medium
                                                                        text-[#3E4234]
                                                                    "
                                                                >
                                                                    {
                                                                        pedido.nombre
                                                                    }{" "}

                                                                    {
                                                                        pedido.apellido_paterno
                                                                    }{" "}

                                                                    {
                                                                        pedido.apellido_materno ||
                                                                        ""
                                                                    }
                                                                </td>


                                                                {/* DIRECCIÓN */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            min-w-[220px]
                                                                        "
                                                                    >

                                                                        <p
                                                                            className="
                                                                                font-medium
                                                                            "
                                                                        >
                                                                            {
                                                                                pedido.nombre_receptor
                                                                            }
                                                                        </p>

                                                                        <p
                                                                            className="
                                                                                text-gray-600
                                                                            "
                                                                        >
                                                                            {
                                                                                pedido.calle
                                                                            }{" "}

                                                                            {
                                                                                pedido.numero_exterior
                                                                            }

                                                                            {
                                                                                pedido.numero_interior
                                                                                    ? ` Int. ${pedido.numero_interior}`
                                                                                    : ""
                                                                            }
                                                                        </p>

                                                                        <p
                                                                            className="
                                                                                text-gray-600
                                                                            "
                                                                        >
                                                                            {
                                                                                pedido.colonia
                                                                            },{" "}

                                                                            {
                                                                                pedido.codigo_postal
                                                                            }
                                                                        </p>

                                                                        <p
                                                                            className="
                                                                                text-gray-600
                                                                            "
                                                                        >
                                                                            {
                                                                                pedido.municipio
                                                                            },{" "}

                                                                            {
                                                                                pedido.estado_direccion
                                                                            }
                                                                        </p>

                                                                    </div>

                                                                </td>


                                                                {/* NÚMERO DE PEDIDO */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                        font-medium
                                                                    "
                                                                >
                                                                    {
                                                                        pedido.numero_pedido
                                                                    }
                                                                </td>


                                                                {/* ESTADO */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                    "
                                                                >

                                                                    <span
                                                                        className="
                                                                            inline-flex
                                                                            px-3
                                                                            py-1
                                                                            rounded-full
                                                                            text-xs
                                                                            font-medium
                                                                            bg-gray-100
                                                                            text-gray-700
                                                                        "
                                                                    >
                                                                        {
                                                                            pedido.estado
                                                                        }
                                                                    </span>

                                                                </td>


                                                                {/* SUBTOTAL */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                        text-right
                                                                    "
                                                                >
                                                                    {
                                                                        formatearMoneda(
                                                                            pedido.subtotal
                                                                        )
                                                                    }
                                                                </td>


                                                                {/* DESCUENTO */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                        text-right
                                                                    "
                                                                >
                                                                    {
                                                                        formatearMoneda(
                                                                            pedido.descuento
                                                                        )
                                                                    }
                                                                </td>


                                                                {/* COSTO ENVÍO */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                        text-right
                                                                    "
                                                                >
                                                                    {
                                                                        formatearMoneda(
                                                                            pedido.costo_envio
                                                                        )
                                                                    }
                                                                </td>


                                                                {/* TOTAL */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                        text-right
                                                                        font-semibold
                                                                    "
                                                                >
                                                                    {
                                                                        formatearMoneda(
                                                                            pedido.total
                                                                        )
                                                                    }
                                                                </td>


                                                                {/* FECHA PEDIDO */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                    "
                                                                >
                                                                    {
                                                                        formatearFecha(
                                                                            pedido.fecha_pedido
                                                                        )
                                                                    }
                                                                </td>


                                                                {/* FECHA ACTUALIZACIÓN */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                    "
                                                                >
                                                                    {
                                                                        formatearFecha(
                                                                            pedido.fecha_actualizacion
                                                                        )
                                                                    }
                                                                </td>


                                                                {/* ACCIONES */}

                                                                <td
                                                                    className="
                                                                        px-4
                                                                        py-4
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-center
                                                                            gap-2
                                                                        "
                                                                    >

                                                                        {/* EDITAR */}

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setPedidoSeleccionado(pedido);
                                                                                setModalActualizar(true);
                                                                            }}
                                                                            className="
                                                                                px-3
                                                                                py-1.5
                                                                                text-xs
                                                                                font-medium
                                                                                rounded
                                                                                bg-[#6B705C]
                                                                                text-white
                                                                                hover:bg-[#5B604E]
                                                                                transition-colors
                                                                            "
                                                                        >
                                                                            Editar
                                                                        </button>


                                                                        {/* ELIMINAR */}

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setPedidoSeleccionado(pedido);
                                                                                setModalEliminar(true);
                                                                            }}
                                                                            className="
                                                                                px-3
                                                                                py-1.5
                                                                                text-xs
                                                                                font-medium
                                                                                rounded
                                                                                border
                                                                                border-red-300
                                                                                text-red-600
                                                                                hover:bg-red-50
                                                                                transition-colors
                                                                            "
                                                                        >
                                                                            Eliminar
                                                                        </button>

                                                                    </div>

                                                                </td>

                                                            </tr>

                                                        )
                                                    )

                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </section>

                    </div>

                </div>

            </div>

<ModalAgregarPedido
    abierto={modalAgregar}
    onCerrar={() => setModalAgregar(false)}
    onRegistrado={obtenerPedidos}
/>


{modalActualizar && pedidoSeleccionado && (
    <ModalActualizarPedido
        pedido={pedidoSeleccionado}
        onCerrar={() => {
            setModalActualizar(false);
            setPedidoSeleccionado(null);
        }}
        onActualizado={obtenerPedidos}
    />
)}

{modalEliminar && pedidoSeleccionado && (
    <ModalEliminarPedido
        abierto={modalEliminar}
        pedido={pedidoSeleccionado}
        onCerrar={() => {
            setModalEliminar(false);
            setPedidoSeleccionado(null);
        }}
        onEliminado={() => {
            setModalEliminar(false);
            setPedidoSeleccionado(null);
            obtenerPedidos();
        }}
    />
)}

        </main>

    );

}