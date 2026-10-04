"use client";

import { useEffect, useState } from "react";
import SidebarAdministrador from "../components/SidebarAdministrador";
import ModalRegistrarCategoria from "../components/ModalRegistrarCategoria";
import ModalActualizarCategoria from "../components/ModalActualizarCategoria";
import ModalEliminarCategoria from "../components/ModalEliminarCategoria";

/*
 * ============================================================
 * TIPOS
 * ============================================================
 */

interface Subcategoria {
    idSubcategoria: number;
    nombre: string;
    descripcion: string | null;
    activo: boolean;
}

interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion: string | null;
    activo: boolean;
    subcategorias: Subcategoria[];
}

/*
 * ============================================================
 * PÁGINA CRUD CATEGORÍAS
 * ============================================================
 */

export default function CrudCategoriasPage() {

    const [modalActualizarAbierto, setModalActualizarAbierto] =
        useState(false);

    const [categoriaSeleccionada, setCategoriaSeleccionada] =
        useState<Categoria | null>(null);

    const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);
    const [modalEliminarAbierto, setModalEliminarAbierto] =
        useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    /*
     * ============================================================
     * OBTENER CATEGORÍAS
     * ============================================================
     */

    const obtenerCategorias = async () => {

        try {

            setCargando(true);
            setError("");

            const respuesta = await fetch(
                `${API_URL}/categorias`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {

                throw new Error(
                    datos.response ||
                    "No se pudieron obtener las categorías"
                );

            }

            setCategorias(datos.categorias);

        } catch (error) {

            console.error(
                "Error al obtener categorías:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al obtener las categorías"
            );

        } finally {

            setCargando(false);

        }

    };

    const abrirModalActualizar = (
        categoria: Categoria
    ) => {

        setCategoriaSeleccionada(categoria);
        setModalActualizarAbierto(true);

    };

    /*
     * ============================================================
     * ELIMINAR CATEGORÍA CON SUBCATEGORÍAS
     * ============================================================
     */
    const abrirModalEliminar = (
        categoria: Categoria
    ) => {

        setCategoriaSeleccionada(categoria);
        setModalEliminarAbierto(true);

    };


    useEffect(() => {

        obtenerCategorias();

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
                                Categorías
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Administración de categorías.
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
                                    Lista de categorías
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setModalRegistroAbierto(true)}
                                    className="
                                        px-5
                                        py-2.5
                                        rounded-md
                                        bg-[#6B705C]
                                        text-white
                                        font-medium
                                        hover:opacity-90
                                        transition
                                    "
                                >
                                    + Nueva categoría
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
                                        Cargando categorías...
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
                                    SIN CATEGORÍAS
                                ================================================= */}

                                {!cargando &&
                                    !error &&
                                    categorias.length === 0 && (

                                        <p className="text-gray-600">
                                            No hay categorías registradas.
                                        </p>

                                    )}


                                {/* =================================================
                                    CATEGORÍAS
                                ================================================= */}

                                {!cargando &&
                                    !error &&
                                    categorias.length > 0 && (

                                        <div className="space-y-6">

                                            {categorias.map((categoria) => (

                                                <div
                                                    key={categoria.id_categoria}
                                                    className="
                                                        border
                                                        border-[#D6D6CF]
                                                        rounded-lg
                                                        p-5
                                                    "
                                                >

                                                    {/* =================================
                                                        INFORMACIÓN CATEGORÍA
                                                    ================================== */}

                                                    <div
                                                        className="
                                                            flex
                                                            flex-col
                                                            sm:flex-row
                                                            sm:items-start
                                                            sm:justify-between
                                                            gap-4
                                                        "
                                                    >

                                                        {/* =================================
                                                            INFORMACIÓN
                                                        ================================== */}

                                                        <div>

                                                            <h3 className="text-xl font-semibold text-[#3E4234]">
                                                                {categoria.nombre}
                                                            </h3>

                                                            {categoria.descripcion && (

                                                                <p className="mt-1 text-gray-600">
                                                                    {categoria.descripcion}
                                                                </p>

                                                            )}

                                                        </div>


                                                        {/* =================================
                                                            ESTADO Y ACCIONES
                                                        ================================== */}

                                                        <div
                                                            className="
                                                                flex
                                                                flex-col
                                                                sm:items-end
                                                                gap-3
                                                            "
                                                        >

                                                            {/* ESTADO */}

                                                            <span
                                                                className={
                                                                    categoria.activo
                                                                        ? "text-sm font-medium text-green-700"
                                                                        : "text-sm font-medium text-red-700"
                                                                }
                                                            >
                                                                {categoria.activo
                                                                    ? "Activa"
                                                                    : "Inactiva"}
                                                            </span>


                                                            {/* ACCIONES */}

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                "
                                                            >

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        abrirModalActualizar(categoria)
                                                                    }
                                                                    className="
                                                                        px-4
                                                                        py-2
                                                                        rounded-md
                                                                        border
                                                                        border-[#6B705C]
                                                                        text-[#3E4234]
                                                                        text-sm
                                                                        font-medium
                                                                        hover:bg-[#E7E7E5]
                                                                        transition
                                                                    "
                                                                >
                                                                    Editar
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    onClick={() => abrirModalEliminar(categoria)}
                                                                    className="
                                                                        px-4
                                                                        py-2
                                                                        rounded-md
                                                                        border
                                                                        border-red-300
                                                                        text-red-600
                                                                        text-sm
                                                                        font-medium
                                                                        hover:bg-red-50
                                                                        transition
                                                                    "
                                                                >
                                                                    Eliminar
                                                                </button>

                                                            </div>

                                                        </div>

                                                    </div>


                                                    {/* =================================
                                                        SUBCATEGORÍAS
                                                    ================================== */}

                                                    {categoria.subcategorias.length > 0 && (

                                                        <div className="mt-5">

                                                            <h4 className="text-sm font-semibold text-[#3E4234] mb-3">
                                                                Subcategorías
                                                            </h4>

                                                            <div className="space-y-2">

                                                                {categoria.subcategorias.map(
                                                                    (subcategoria) => (

                                                                        <div
                                                                            key={
                                                                                subcategoria.idSubcategoria
                                                                            }
                                                                            className="
                                                                                bg-[#E7E7E5]
                                                                                rounded-md
                                                                                px-4
                                                                                py-3
                                                                            "
                                                                        >

                                                                            <div
                                                                                className="
                                                                                    flex
                                                                                    flex-col
                                                                                    sm:flex-row
                                                                                    sm:items-center
                                                                                    sm:justify-between
                                                                                    gap-2
                                                                                "
                                                                            >

                                                                                <div>

                                                                                    <p className="font-medium text-[#3E4234]">
                                                                                        {
                                                                                            subcategoria.nombre
                                                                                        }
                                                                                    </p>

                                                                                    {subcategoria.descripcion && (

                                                                                        <p className="text-sm text-gray-600">
                                                                                            {
                                                                                                subcategoria.descripcion
                                                                                            }
                                                                                        </p>

                                                                                    )}

                                                                                </div>


                                                                                <span
                                                                                    className={
                                                                                        subcategoria.activo
                                                                                            ? "text-xs font-medium text-green-700"
                                                                                            : "text-xs font-medium text-red-700"
                                                                                    }
                                                                                >
                                                                                    {subcategoria.activo
                                                                                        ? "Activa"
                                                                                        : "Inactiva"}
                                                                                </span>

                                                                            </div>

                                                                        </div>

                                                                    )
                                                                )}

                                                            </div>

                                                        </div>

                                                    )}


                                                    {/* =================================
                                                        SIN SUBCATEGORÍAS
                                                    ================================== */}

                                                    {categoria.subcategorias.length === 0 && (

                                                        <p className="mt-4 text-sm text-gray-500">
                                                            Esta categoría no tiene subcategorías.
                                                        </p>

                                                    )}

                                                </div>

                                            ))}

                                        </div>

                                    )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <ModalRegistrarCategoria
                abierto={modalRegistroAbierto}
                onCerrar={() => setModalRegistroAbierto(false)}
                onRegistrado={obtenerCategorias}
            />

            <ModalActualizarCategoria
                abierto={modalActualizarAbierto}
                categoria={categoriaSeleccionada}
                onCerrar={() => {
                    setModalActualizarAbierto(false);
                    setCategoriaSeleccionada(null);
                }}
                onActualizado={obtenerCategorias}
            />

            {modalEliminarAbierto &&
                categoriaSeleccionada && (
                    <ModalEliminarCategoria
                        categoria={categoriaSeleccionada}
                        onCerrar={() => {
                            setModalEliminarAbierto(false);
                            setCategoriaSeleccionada(null);
                        }}
                        onEliminado={() => {
                            obtenerCategorias();
                        }}
                    />
                )}

        </main>

    );
}