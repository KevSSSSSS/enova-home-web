"use client";

import { useEffect, useState } from "react";
import SidebarAdministrador from "../components/SidebarAdministrador";
import ModalRegistrarCliente from "../components/ModalRegistrarCliente";
import ModalActualizarCliente from "../components/ModalActualizarCliente";
import ModalEliminarCliente from "../components/ModalEliminarCliente";

/*
 * ============================================================
 * TIPOS
 * ============================================================
 */

interface Direccion {
    idDireccion: number;
    nombreReceptor: string;
    telefono: string | null;
    calle: string;
    numeroExterior: string;
    numeroInterior: string | null;
    colonia: string;
    codigoPostal: string;
    municipio: string;
    estado: string;
    pais: string;
    referencias: string | null;
    principal: boolean;
    activo: boolean;
}

interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string | null;
    email: string;
    telefono: string | null;
    activo: boolean;
    fecha_registro: string;
    fecha_cierre: string | null;
    direcciones: Direccion[];
}

/*
 * ============================================================
 * PÁGINA CLIENTES
 * ============================================================
 */

export default function ClientesPage() {

    const [modalRegistro, setModalRegistro] = useState(false);

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [busqueda, setBusqueda] = useState("");

    const [clienteSeleccionado, setClienteSeleccionado] =
        useState<Cliente | null>(null);

    const [clienteEliminar, setClienteEliminar] =
        useState<Cliente | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    /*
     * ============================================================
     * OBTENER CLIENTES
     * ============================================================
     */

    const obtenerClientes = async (termino = "") => {

        try {

            setCargando(true);
            setError("");

            const url = termino.trim()
                ? `${API_URL}/clientes/buscar?q=${encodeURIComponent(termino.trim())}`
                : `${API_URL}/clientes`;

            const respuesta = await fetch(
                url,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                throw new Error(
                    datos.response ||
                    "No se pudieron obtener los clientes"
                );

            }

            setClientes(datos.clientes);

        } catch (error) {

            console.error(
                "Error al obtener clientes:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al obtener los clientes"
            );

        } finally {

            setCargando(false);

        }

    };

    /*
     * ============================================================
     * ELIMINAR CLIENTE
     * ============================================================
     */

    const eliminarCliente = async (idCliente: number) => {

        /*const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar este cliente?\n\n" +
            "También se eliminarán todas sus direcciones."
        );

        if (!confirmar) {
            return;
        }*/

        try {

            setError("");

            const respuesta = await fetch(
                `${API_URL}/clientes/${idCliente}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    "No fue posible eliminar el cliente"
                );

                return;
            }

            /*
             * Actualizamos directamente el listado
             * eliminando el cliente de la tabla.
             */
            setClientes((clientesActuales) =>
                clientesActuales.filter(
                    (cliente) =>
                        cliente.id_cliente !== idCliente
                )
            );

        } catch (error) {

            console.error(
                "Error al eliminar cliente:",
                error
            );

            setError(
                "No fue posible conectar con el servidor."
            );
        }
    };


    /*
     * ============================================================
     * CARGAR CLIENTES AL ENTRAR A LA PÁGINA
     * ============================================================
     */

    useEffect(() => {

        obtenerClientes();

    }, [API_URL]);


    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (

        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-8 sm:pb-12">

            <div className="flex flex-col md:flex-row gap-8 md:gap-0">

                {/* =====================================================
                    SIDEBAR
                ====================================================== */}

                <SidebarAdministrador />


                {/* =====================================================
                    CONTENIDO PRINCIPAL
                ====================================================== */}

                <div className="flex-1 min-w-0 w-full">

                    <div className="w-full max-w-7xl mx-auto">

                        {/* =================================================
                            ENCABEZADO
                        ================================================== */}

                        <div className="mb-8">

                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Clientes
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Administración de clientes.
                            </p>

                        </div>


                        {/* =================================================
                            CONTENEDOR PRINCIPAL
                        ================================================== */}

                        <div
                            className="
                                bg-white
                                rounded-lg
                                shadow-md
                                border
                                border-[#D6D6CF]
                                overflow-hidden
                            "
                        >

                            {/* =================================================
                                ENCABEZADO DE LA TABLA
                            ================================================== */}

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

                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    Lista de clientes
                                </h2>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                                    {/* Buscador */}
                                    <input
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => {
                                            const termino = e.target.value;
                                            setBusqueda(termino);
                                            obtenerClientes(termino);
                                        }}
                                        placeholder="Buscar..."
                                        className="w-full sm:w-[264px] px-4 py-3 text-sm rounded border border-[#D6D6CF] bg-white text-[#3E4234] focus:outline-none focus:ring-2 focus:ring-[#6B705C]"
                                    />

                                    {/* Botón de búsqueda */}
                                    <button
                                        type="button"
                                        onClick={() => obtenerClientes(busqueda)}
                                        aria-label="Buscar clientes"
                                        className="flex items-center justify-center text-[#6B705C] hover:text-[#3E4234] transition-colors"
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
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.35-4.35" />
                                        </svg>
                                    </button>

                                    {/* Nuevo cliente */}
                                    <button
                                        type="button"
                                        onClick={() => setModalRegistro(true)}
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
                                        Agregar nuevo cliente
                                    </button>

                                </div>

                            </div>


                            {/* =================================================
                                CONTENIDO
                            ================================================== */}

                            <div className="p-6">

                                {/* =================================================
                                    CARGANDO
                                ================================================== */}

                                {cargando && (

                                    <p className="text-gray-600">
                                        Cargando clientes...
                                    </p>

                                )}


                                {/* =================================================
                                    ERROR
                                ================================================== */}

                                {!cargando && error && (

                                    <p className="text-red-600">
                                        {error}
                                    </p>

                                )}


                                {/* =================================================
                                    SIN CLIENTES
                                ================================================== */}

                                {!cargando &&
                                    !error &&
                                    clientes.length === 0 && (

                                        <p className="text-gray-600">
                                            {busqueda.trim()
                                                ? "No se encontraron clientes con ese término."
                                                : "No hay clientes registrados."}
                                        </p>

                                    )}


                                {/* =================================================
                                    TABLA
                                ================================================== */}

                                {!cargando &&
                                    !error &&
                                    clientes.length > 0 && (

                                        <div className="overflow-x-auto">

                                            <table className="w-full text-sm">

                                                {/* =================================================
                                                ENCABEZADOS
                                            ================================================== */}

                                                <thead>

                                                    <tr className="border-b border-[#D6D6CF]">

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            ID
                                                        </th>

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            Cliente
                                                        </th>

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            Correo
                                                        </th>

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            Teléfono
                                                        </th>

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            Fecha de registro
                                                        </th>

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            Direcciones
                                                        </th>

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            Estado
                                                        </th>

                                                        <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                            Acciones
                                                        </th>

                                                    </tr>

                                                </thead>


                                                {/* =================================================
                                                    CLIENTES
                                                ================================================== */}

                                                <tbody>

                                                    {clientes.map((cliente) => (

                                                        <tr
                                                            key={cliente.id_cliente}
                                                            className="
                                                            border-b
                                                            border-[#E5E5E5]
                                                            hover:bg-[#F8F8F7]
                                                        "
                                                        >

                                                            {/* =================================================
                                                                ID CLIENTE
                                                            ================================================== */}

                                                            <td className="px-4 py-4 text-gray-700">

                                                                {cliente.id_cliente}

                                                            </td>


                                                            {/* =================================================
                                                                CLIENTE
                                                            ================================================== */}

                                                            <td className="px-4 py-4 text-[#3E4234]">

                                                                <div className="font-medium">

                                                                    {cliente.nombre}{" "}
                                                                    {cliente.apellido_paterno}

                                                                </div>

                                                                {cliente.apellido_materno && (

                                                                    <div className="text-xs text-gray-500">

                                                                        {cliente.apellido_materno}

                                                                    </div>

                                                                )}

                                                            </td>


                                                            {/* =================================================
                                                                CORREO
                                                            ================================================== */}

                                                            <td className="px-4 py-4 text-gray-700">

                                                                {cliente.email}

                                                            </td>


                                                            {/* =================================================
                                                                TELÉFONO
                                                            ================================================== */}

                                                            <td className="px-4 py-4 text-gray-700">

                                                                {cliente.telefono ||
                                                                    "No proporcionado"}

                                                            </td>


                                                            {/* =================================================
                                                                FECHA DE REGISTRO
                                                            ================================================== */}

                                                            <td className="px-4 py-4 text-gray-700">

                                                                {new Date(
                                                                    cliente.fecha_registro
                                                                ).toLocaleDateString(
                                                                    "es-MX",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                    }
                                                                )}

                                                            </td>


                                                            {/* =================================================
                                                                DIRECCIONES
                                                            ================================================== */}

                                                            <td className="px-4 py-4">

                                                                {cliente.direcciones.length > 0 ? (

                                                                    <div className="space-y-4">

                                                                        {cliente.direcciones.map(
                                                                            (direccion) => (

                                                                                <div
                                                                                    key={direccion.idDireccion}
                                                                                    className="
                                                                                border
                                                                                border-[#D6D6CF]
                                                                                rounded-md
                                                                                p-3
                                                                                bg-[#F8F8F7]
                                                                            "
                                                                                >

                                                                                    {/* RECEPTOR */}

                                                                                    <div className="font-medium text-[#3E4234]">

                                                                                        {direccion.nombreReceptor}

                                                                                    </div>


                                                                                    {/* TELÉFONO */}

                                                                                    <div className="text-xs text-gray-600 mt-1">

                                                                                        Teléfono:{" "}
                                                                                        {direccion.telefono ||
                                                                                            "No proporcionado"}

                                                                                    </div>


                                                                                    {/* CALLE */}

                                                                                    <div className="text-xs text-gray-700 mt-2">

                                                                                        {direccion.calle}{" "}
                                                                                        #{direccion.numeroExterior}

                                                                                        {direccion.numeroInterior && (
                                                                                            <>
                                                                                                {" "}
                                                                                                Int.{" "}
                                                                                                {direccion.numeroInterior}
                                                                                            </>
                                                                                        )}

                                                                                    </div>


                                                                                    {/* COLONIA */}

                                                                                    <div className="text-xs text-gray-700">

                                                                                        Colonia:{" "}
                                                                                        {direccion.colonia}

                                                                                    </div>


                                                                                    {/* CÓDIGO POSTAL */}

                                                                                    <div className="text-xs text-gray-700">

                                                                                        C.P.{" "}
                                                                                        {direccion.codigoPostal}

                                                                                    </div>


                                                                                    {/* MUNICIPIO Y ESTADO */}

                                                                                    <div className="text-xs text-gray-700">

                                                                                        {direccion.municipio},{" "}
                                                                                        {direccion.estado}

                                                                                    </div>


                                                                                    {/* PAÍS */}

                                                                                    <div className="text-xs text-gray-700">

                                                                                        {direccion.pais}

                                                                                    </div>


                                                                                    {/* REFERENCIAS */}

                                                                                    {direccion.referencias && (

                                                                                        <div className="text-xs text-gray-500 mt-1">

                                                                                            Referencias:{" "}
                                                                                            {direccion.referencias}

                                                                                        </div>

                                                                                    )}


                                                                                    {/* DIRECCIÓN PRINCIPAL */}

                                                                                    {direccion.principal && (

                                                                                        <div className="mt-2">

                                                                                            <span
                                                                                                className="
                                                                                            inline-block
                                                                                            px-2
                                                                                            py-1
                                                                                            text-xs
                                                                                            rounded
                                                                                            bg-[#E7E7E5]
                                                                                            text-[#3E4234]
                                                                                        "
                                                                                            >
                                                                                                Dirección principal
                                                                                            </span>

                                                                                        </div>

                                                                                    )}

                                                                                </div>

                                                                            ))}

                                                                    </div>

                                                                ) : (

                                                                    <span className="text-gray-500">

                                                                        Sin dirección registrada

                                                                    </span>

                                                                )}

                                                            </td>


                                                            {/* =================================================
                                                                ESTADO
                                                            ================================================== */}

                                                            <td className="px-4 py-4">

                                                                <span
                                                                    className={
                                                                        cliente.activo
                                                                            ? "text-[#6B705C] font-medium"
                                                                            : "text-gray-500 font-medium"
                                                                    }
                                                                >

                                                                    {cliente.activo
                                                                        ? "Activo"
                                                                        : "Inactivo"}

                                                                </span>

                                                            </td>


                                                            {/* =================================================
                                                                ACCIONES
                                                            ================================================== */}

                                                            <td className="px-4 py-4">

                                                                <div className="flex items-center gap-2">


                                                                    {/* Editar */}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setClienteSeleccionado(cliente)}
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
                                                                        /*onClick={() =>
                                                                            eliminarCliente(cliente.id_cliente)
                                                                        }*/
                                                                        onClick={() => setClienteEliminar(cliente)}
                                                                        className="
                                                                        px-3
                                                                        py-1.5
                                                                        text-xs
                                                                        font-medium
                                                                        text-red-600
                                                                        border
                                                                        border-red-200
                                                                        rounded-md
                                                                        hover:bg-red-50
                                                                        transition-colors
                                                                    "
                                                                    >
                                                                        Eliminar
                                                                    </button>

                                                                </div>

                                                            </td>

                                                        </tr>

                                                    ))}

                                                </tbody>

                                            </table>

                                        </div>

                                    )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {modalRegistro && (
                <ModalRegistrarCliente
                    onCerrar={() => setModalRegistro(false)}
                    onRegistrado={() => {
                        obtenerClientes();
                    }}
                />
            )}

            {clienteSeleccionado && (
                <ModalActualizarCliente
                    cliente={clienteSeleccionado}
                    onCerrar={() => setClienteSeleccionado(null)}
                    onActualizado={() => {
                        obtenerClientes();
                    }}
                />
            )}

            {clienteEliminar && (
                <ModalEliminarCliente
                    cliente={clienteEliminar}
                    onCerrar={() => setClienteEliminar(null)}
                    onEliminado={() => {
                        setClientes((clientesActuales) =>
                            clientesActuales.filter(
                                (cliente) =>
                                    cliente.id_cliente !== clienteEliminar.id_cliente
                            )
                        );
                    }}
                />
            )}

        </main>

    );

}