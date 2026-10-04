"use client";

import { useEffect, useState } from "react";
import SidebarAdministrador from "../components/SidebarAdministrador";
import ModalRegistrarProductoRelacionado from "../components/ModalRegistrarProductoRelacionado";
import ModalActualizarProductoRelacionado from "../components/ModalActualizarProductoRelacionado";
import ModalEliminarProductoRelacionado from "../components/ModalEliminarProductoRelacionado";

/*
 * ============================================================
 * TIPOS
 * ============================================================
 */

interface Producto {
    idProducto: number;
    nombre: string;
    marca: string | null;
}

interface ProductoRelacionado {
    producto: Producto;
    productoRelacionado: Producto;
    tipoRelacion: string;
    orden: number;
    activo: boolean;
}

/*
 * ============================================================
 * PÁGINA CRUD PRODUCTOS RELACIONADOS
 * ============================================================
 */

export default function CrudProductosRelacionadosPage() {

    const [modalRegistroAbierto, setModalRegistroAbierto] =
        useState(false);

    const [productoParaRelacion, setProductoParaRelacion] =
        useState<Producto | null>(null);

    const [modalActualizarAbierto, setModalActualizarAbierto] =
        useState(false);

    const [relacionSeleccionada, setRelacionSeleccionada] =
        useState<ProductoRelacionado | null>(null);

    const [modalEliminarAbierto, setModalEliminarAbierto] =
    useState(false);

    const [relacionParaEliminar, setRelacionParaEliminar] =
        useState<ProductoRelacionado | null>(null);

    const [productosRelacionados, setProductosRelacionados] =
        useState<ProductoRelacionado[]>([]);

    const [cargando, setCargando] = useState(true);

    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const productosAgrupados = productosRelacionados.reduce(
        (grupos, relacion) => {
            const idProducto = relacion.producto.idProducto;

            if (!grupos[idProducto]) {
                grupos[idProducto] = {
                    producto: relacion.producto,
                    relaciones: []
                };
            }

            grupos[idProducto].relaciones.push(relacion);

            return grupos;
        },
        {} as Record<
            number,
            {
                producto: Producto;
                relaciones: ProductoRelacionado[];
            }
        >
    );

    /*
     * ============================================================
     * OBTENER PRODUCTOS RELACIONADOS
     * ============================================================
     */

    const obtenerProductosRelacionados = async () => {

        try {

            setCargando(true);
            setError("");

            const respuesta = await fetch(
                `${API_URL}/productos-relacionados`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                throw new Error(
                    datos.response ||
                    "No se pudieron obtener los productos relacionados"
                );

            }

            setProductosRelacionados(
                datos.productosRelacionados
            );

        } catch (error) {

            console.error(
                "Error al obtener productos relacionados:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al obtener los productos relacionados"
            );

        } finally {

            setCargando(false);

        }

    };

    const abrirModalActualizar = (
        relacion: ProductoRelacionado
    ) => {

        setRelacionSeleccionada(relacion);

        setModalActualizarAbierto(true);

    };

    /*
     * ============================================================
     * ELIMINAR PRODUCTO RELACIONADO
     * ============================================================
     */

const abrirModalEliminar = (
    relacion: ProductoRelacionado
) => {

    setRelacionParaEliminar(relacion);

    setModalEliminarAbierto(true);
};

    /*
     * ============================================================
     * CARGAR DATOS
     * ============================================================
     */

    useEffect(() => {

        obtenerProductosRelacionados();

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
                            TÍTULO
                        ================================================= */}

                        <div className="mb-8">

                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Productos relacionados
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Administración de productos relacionados.
                            </p>

                        </div>


                        {/* =================================================
                            CONTENEDOR
                        ================================================= */}

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
                                ENCABEZADO
                            ================================================= */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    gap-4
                                    bg-[#E7E7E5]
                                    px-6
                                    py-5
                                    border-b
                                    border-[#D6D6CF]
                                "
                            >

                                <h2 className="text-lg font-semibold text-[#3E4234]">
                                    Lista de productos relacionados
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setProductoParaRelacion(null);
                                        setModalRegistroAbierto(true);
                                    }}
                                    className="
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        rounded
                                        bg-[#6B705C]
                                        text-white
                                        hover:bg-[#5B604E]
                                        transition-colors
                                    "
                                >
                                    Nueva relación
                                </button>

                            </div>


                            {/* =================================================
                                CONTENIDO
                            ================================================= */}

                            <div className="p-6">

                                {/* =================================================
                                    CARGANDO
                                ================================================= */}

                                {cargando && (

                                    <p className="text-gray-600">
                                        Cargando productos relacionados...
                                    </p>

                                )}


                                {/* =================================================
                                    ERROR
                                ================================================= */}

                                {!cargando && error && (

                                    <p className="text-red-600">
                                        {error}
                                    </p>

                                )}


                                {/* =================================================
                                    SIN RELACIONES
                                ================================================= */}

                                {!cargando &&
                                    !error &&
                                    productosRelacionados.length === 0 && (

                                        <p className="text-gray-600">
                                            No hay productos relacionados registrados.
                                        </p>

                                    )}


{/* ============================================================
    PRODUCTOS RELACIONADOS AGRUPADOS
============================================================ */}

<div className="space-y-6">

    {Object.values(productosAgrupados).map(
        (grupo) => (

            <div
                key={grupo.producto.idProducto}
                className="
                    bg-white
                    rounded-lg
                    shadow
                    border
                    border-gray-200
                    p-6
                "
            >

                {/* ====================================================
                    PRODUCTO PRINCIPAL
                ==================================================== */}

                <div className="mb-5">

                    <p className="
                        text-xs
                        font-semibold
                        text-[#6B705C]
                        uppercase
                        tracking-wide
                        mb-1
                    ">
                        Producto
                    </p>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-[#3E4234]
                    ">
                        {grupo.producto.nombre}
                    </h2>

                    {grupo.producto.marca && (
                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            {grupo.producto.marca}
                        </p>
                    )}

                </div>


                {/* ====================================================
                    TÍTULO DE RELACIONES
                ==================================================== */}

                <div className="
                    border-t
                    border-gray-200
                    pt-4
                ">

                    <p className="
                        text-sm
                        font-semibold
                        text-[#3E4234]
                        mb-4
                    ">
                        Productos relacionados
                    </p>


                    {/* =================================================
                        RELACIONES DEL PRODUCTO
                    ================================================= */}

                    <div className="space-y-3">

                        {grupo.relaciones.map(
                            (relacion) => (

                                <div
                                    key={`
                                        ${relacion.producto.idProducto}-
                                        ${relacion.productoRelacionado.idProducto}
                                    `}
                                    className="
                                        border
                                        border-gray-200
                                        rounded-lg
                                        p-4
                                        bg-[#FAFAF9]
                                    "
                                >

                                    <div className="
                                        flex
                                        flex-col
                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                        gap-4
                                    ">

                                        {/* ============================
                                            INFORMACIÓN DEL RELACIONADO
                                        ============================ */}

                                        <div>

                                            <p className="
                                                text-base
                                                font-medium
                                                text-[#3E4234]
                                            ">
                                                {relacion.productoRelacionado.nombre}
                                            </p>

                                            {relacion.productoRelacionado.marca && (
                                                <p className="
                                                    text-sm
                                                    text-gray-500
                                                    mt-1
                                                ">
                                                    {relacion.productoRelacionado.marca}
                                                </p>
                                            )}

                                        </div>


                                        {/* ============================
                                            INFORMACIÓN DE LA RELACIÓN
                                        ============================ */}

                                        <div className="
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-3
                                            text-sm
                                        ">

                                            <span className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-[#E7E7E5]
                                                text-[#3E4234]
                                                font-medium
                                            ">
                                                {relacion.tipoRelacion}
                                            </span>

                                            <span className="
                                                text-gray-600
                                            ">
                                                Orden: {relacion.orden}
                                            </span>

                                            <span className={
                                                relacion.activo
                                                    ? `
                                                        text-green-600
                                                        font-medium
                                                      `
                                                    : `
                                                        text-gray-500
                                                        font-medium
                                                      `
                                            }>
                                                {relacion.activo
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>

                                        </div>


                                        {/* ============================
                                            BOTONES
                                        ============================ */}

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    abrirModalActualizar(
                                                        relacion
                                                    )
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    text-sm
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


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    abrirModalEliminar(
                                                        relacion
                                                    )
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    text-sm
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

                                    </div>

                                </div>

                            )
                        )}

                    </div>


                    {/* =================================================
                        AGREGAR NUEVA RELACIÓN
                    ================================================= */}

                    <div className="
                        flex
                        justify-end
                        mt-4
                    ">

                        <button
                            type="button"
                            onClick={() => {
                                setProductoParaRelacion(grupo.producto);
                                setModalRegistroAbierto(true);
                            }}
                            className="
                                px-4
                                py-2
                                text-sm
                                font-medium
                                rounded
                                border
                                border-[#6B705C]
                                text-[#6B705C]
                                hover:bg-[#6B705C]
                                hover:text-white
                                transition-colors
                            "
                        >
                            + Agregar relación
                        </button>

                    </div>

                </div>

            </div>

        )
    )}

</div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <ModalActualizarProductoRelacionado
                abierto={modalActualizarAbierto}
                relacion={relacionSeleccionada}
                productosRelacionados={productosRelacionados}
                onCerrar={() => setModalActualizarAbierto(false)}
                onActualizado={obtenerProductosRelacionados}
            />

            {modalEliminarAbierto && relacionParaEliminar && (
                <ModalEliminarProductoRelacionado
                    relacion={relacionParaEliminar}
                        onCerrar={() => {
                            setModalEliminarAbierto(false);
                            setRelacionParaEliminar(null);
                        }}
                    onEliminado={obtenerProductosRelacionados}
                />
            )}

        </main>

    );
}