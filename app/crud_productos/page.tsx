"use client";

import {
    Fragment,
    useEffect,
    useState
} from "react";

import SidebarAdministrador from "../components/SidebarAdministrador";
import ModalRegistrarProducto from "../components/ModalRegistrarProducto";
import ModalActualizarProducto from "../components/ModalActualizarProducto";
import ModalEliminarProducto from "../components/ModalEliminarProducto";


/*
 * ============================================================
 * INTERFACES
 * ============================================================
 */

interface Categoria {
    idCategoria: number;
    nombre: string;
}

interface Subcategoria {
    idSubcategoria: number;
    nombre: string;
    categoria: Categoria;
}

interface ImagenProducto {
    idImagen: number;
    imagen: string;
}

interface ValorVariante {
    idValorVariante: number;
    valor: string;

    tipoVariante: {
        idTipoVariante: number;
        nombre: string;
    };
}

interface Variante {
    idVariante: number;
    sku: string;
    codigoBarras: string | null;
    precioNormal: number;
    precioOferta: number | null;
    activo: boolean;

    valores: ValorVariante[];
}

interface Especificacion {
    idEspecificacion: number;
    nombre: string;
    valor: string;
    orden: number;
}

interface Producto {
    id_producto: number;
    id_subcategoria: number;
    nombre: string;
    marca: string | null;
    descripcion_corta: string | null;
    descripcion: string | null;
    destacado: boolean;
    activo: boolean;
    publicado: boolean;
    fecha_registro: string;
    fecha_actualizacion: string;

    subcategoria: Subcategoria;

    especificaciones: Especificacion[];

    imagenes: ImagenProducto[];

    variantes: Variante[];
}


/*
 * ============================================================
 * COMPONENTE PRINCIPAL
 * ============================================================
 */

export default function ProductosPage() {

    /*
     * ========================================================
     * ESTADOS
     * ========================================================
     */

    const [productos, setProductos] =
        useState<Producto[]>([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
     * ============================================================
     * BÚSQUEDA DE PRODUCTOS
     * ============================================================
     */

    const [busqueda, setBusqueda] =
        useState("");


    /*
     * Producto seleccionado para editar
     */

    const [productoEditar, setProductoEditar] =
        useState<Producto | null>(null);


    /*
     * Producto seleccionado para eliminar
     */

    const [productoEliminar, setProductoEliminar] =
        useState<Producto | null>(null);


    /*
     * Mostrar modal de nuevo producto
     */

    const [mostrarModalNuevo, setMostrarModalNuevo] =
        useState(false);


    /*
     * Producto cuya información está expandida
     */

    const [productoExpandido, setProductoExpandido] =
        useState<number | null>(null);


    /*
     * ========================================================
     * API
     * ========================================================
     */

    const API_URL =
        process.env.NEXT_PUBLIC_API_URL;


    /*
     * ============================================================
     * OBTENER PRODUCTOS
     * ============================================================
     */

    const obtenerProductos = async () => {

        try {

            setCargando(true);

            setError("");


            const respuesta = await fetch(
                `${API_URL}/productos/completo`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );


            const datos = await respuesta.json();


            if (
                !respuesta.ok ||
                !datos.success
            ) {

                throw new Error(
                    datos.response ||
                    "No se pudieron obtener los productos"
                );

            }


            setProductos(
                datos.productos
            );


        } catch (error) {

            console.error(
                "Error al obtener productos:",
                error
            );


            setError(
                error instanceof Error
                    ? error.message
                    : "Error al obtener los productos"
            );


        } finally {

            setCargando(false);

        }

    };


    /*
     * ============================================================
     * CARGAR PRODUCTOS AL INICIAR
     * ============================================================
     */

    useEffect(() => {

        obtenerProductos();

    }, [API_URL]);


    /*
     * ============================================================
     * OBTENER IMAGEN PRINCIPAL
     * ============================================================
     */

    const obtenerImagenPrincipal = (
        producto: Producto
    ) => {

        if (
            !producto.imagenes ||
            producto.imagenes.length === 0
        ) {

            return null;

        }


        return `${API_URL}/imagenes-productos/${producto.imagenes[0].idImagen}`;

    };


    /*
     * ============================================================
     * OBTENER VARIANTE PRINCIPAL
     * ============================================================
     */

    const obtenerVariantePrincipal = (
        producto: Producto
    ) => {

        if (
            !producto.variantes ||
            producto.variantes.length === 0
        ) {

            return null;

        }


        return producto.variantes[0];

    };


    /*
     * ============================================================
     * FORMATEAR PRECIO
     * ============================================================
     */

    const formatearPrecio = (
        precio: number
    ) => {

        return new Intl.NumberFormat(
            "es-MX",
            {
                style: "currency",
                currency: "MXN",
            }
        ).format(
            Number(precio)
        );

    };


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
     * MOSTRAR / OCULTAR DETALLES
     * ============================================================
     */

    const alternarDetalles = (
        idProducto: number
    ) => {

        setProductoExpandido(
            productoExpandido === idProducto
                ? null
                : idProducto
        );

    };


    /*
     * ============================================================
     * FILTRAR PRODUCTOS
     * ============================================================
     *
     * La búsqueda utiliza la información completa que ya está
     * cargada en el frontend, por lo que la tabla conserva todas
     * sus funciones actuales.
     *
     * Se puede buscar por ID, nombre, marca, categoría,
     * subcategoría, SKU o código de barras.
     */

    const productosFiltrados =
        productos.filter((producto) => {

            const termino =
                busqueda.trim().toLowerCase();

            if (!termino) {
                return true;
            }

            const coincideProducto = [
                String(producto.id_producto),
                producto.nombre,
                producto.marca || "",
                producto.subcategoria?.categoria?.nombre || "",
                producto.subcategoria?.nombre || "",
            ].some((valor) =>
                valor.toLowerCase().includes(termino)
            );

            const coincideVariante =
                producto.variantes?.some((variante) =>
                    [
                        variante.sku,
                        variante.codigoBarras || "",
                    ].some((valor) =>
                        valor.toLowerCase().includes(termino)
                    )
                ) || false;

            return coincideProducto || coincideVariante;
        });


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
                                Productos
                            </h1>


                            <p
                                className="
                                    mt-2
                                    text-gray-600
                                "
                            >
                                Administración de productos.
                            </p>

                        </div>


                        {/* ====================================================
                            CONTENEDOR PRINCIPAL
                        ===================================================== */}

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

                            {/* ==================================================
                                ENCABEZADO
                            =================================================== */}

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

                                <h2
                                    className="
                                        text-xl
                                        font-semibold
                                        text-[#3E4234]
                                    "
                                >
                                    Lista de productos
                                </h2>


                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-end
                                        gap-3
                                    "
                                >
                            {/* ==================================================
                                BARRA DE BÚSQUEDA
                            =================================================== */}

                                <div className="flex items-center gap-2 w-full sm:w-[300px]">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={busqueda}
                                            onChange={(event) =>
                                                setBusqueda(event.target.value)
                                            }
                                            placeholder="Buscar..."
                                            className="
                                                w-full
                                                h-11
                                                rounded
                                                border
                                                border-[#D6D6CF]
                                                bg-white
                                                px-4
                                                pr-9
                                                text-sm
                                                text-[#3E4234]
                                                outline-none
                                                transition-colors
                                                focus:border-[#6B705C]
                                            "
                                        />

                                        {busqueda && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setBusqueda("")
                                                }
                                                className="
                                                    absolute
                                                    right-3
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-[#6B705C]
                                                    hover:text-[#3E4234]
                                                    transition-colors
                                                "
                                                aria-label="Limpiar búsqueda"
                                                title="Limpiar búsqueda"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>

                                    <span
                                        className="
                                            flex
                                            h-11
                                            w-7
                                            items-center
                                            justify-center
                                            text-[#6B705C]
                                        "
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="h-6 w-6"
                                        >
                                            <circle cx="11" cy="11" r="7" />
                                            <path d="m20 20-3.5-3.5" />
                                        </svg>
                                    </span>
                                </div>


                                {/* ==================================================
                                    BOTÓN NUEVO PRODUCTO
                                =================================================== */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMostrarModalNuevo(true)
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
                                    Nuevo producto
                                </button>

                                </div>

                            </div>


                            {/* ==================================================
                                CONTENIDO
                            =================================================== */}

                            <div className="p-6 pt-3">

                                {/* ==================================================
                                    CARGANDO
                                =================================================== */}

                                {cargando && (

                                    <p
                                        className="
                                            text-gray-600
                                        "
                                    >
                                        Cargando productos...
                                    </p>

                                )}


                                {/* ==================================================
                                    ERROR
                                =================================================== */}

                                {!cargando &&
                                    error && (

                                        <p
                                            className="
                                                text-red-600
                                            "
                                        >
                                            {error}
                                        </p>

                                    )
                                }


                                {/* ==================================================
                                    SIN PRODUCTOS
                                =================================================== */}

                                {!cargando &&
                                    !error &&
                                    productosFiltrados.length === 0 && (

                                        <p
                                            className="
                                                text-gray-600
                                            "
                                        >
                                            {busqueda
                                                ? "No se encontraron productos con ese criterio."
                                                : "No hay productos registrados."}
                                        </p>

                                    )
                                }


                                {/* ==================================================
                                    TABLA
                                =================================================== */}

                                {!cargando &&
                                    !error &&
                                    productosFiltrados.length > 0 && (

                                        <div
                                            className="
                                                overflow-x-auto
                                            "
                                        >

                                            <table
                                                className="
                                                    w-full
                                                    min-w-[1100px]
                                                    text-sm
                                                "
                                            >

                                                {/* ==================================================
                                                    ENCABEZADO DE TABLA
                                                =================================================== */}

                                                <thead>

                                                    <tr
                                                        className="
                                                            border-b
                                                            border-[#D6D6CF]
                                                        "
                                                    >

                                                        <th
                                                            className="
                                                                w-[4%]
                                                                text-center
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[5%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            ID
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[9%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            Imagen
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[20%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            Producto
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[17%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            Clasificación
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[11%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            Marca
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[12%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            Precio / SKU
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[10%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            Estado
                                                        </th>


                                                        <th
                                                            className="
                                                                w-[12%]
                                                                text-left
                                                                px-2
                                                                py-3
                                                                font-semibold
                                                                text-[#3E4234]
                                                            "
                                                        >
                                                            Acciones
                                                        </th>

                                                    </tr>

                                                </thead>


                                                {/* ==================================================
                                                    CUERPO DE TABLA
                                                =================================================== */}

                                                <tbody>

                                                    {productosFiltrados.map(
                                                        (producto) => {

                                                            const imagenPrincipal =
                                                                obtenerImagenPrincipal(
                                                                    producto
                                                                );


                                                            const variantePrincipal =
                                                                obtenerVariantePrincipal(
                                                                    producto
                                                                );


                                                            const expandido =
                                                                productoExpandido ===
                                                                producto.id_producto;


                                                            /*
                                                             * IMPORTANTE:
                                                             *
                                                             * La key está en el Fragment.
                                                             *
                                                             * Esto corrige:
                                                             *
                                                             * "Each child in a list should have
                                                             * a unique key prop."
                                                             */

                                                            return (

                                                                <Fragment
                                                                    key={
                                                                        producto.id_producto
                                                                    }
                                                                >

                                                                    {/* ==================================================
                                                                        FILA PRINCIPAL
                                                                    =================================================== */}

                                                                    <tr
                                                                        className="
                                                                            border-b
                                                                            border-[#E5E5E5]
                                                                            hover:bg-[#F8F8F7]
                                                                        "
                                                                    >

                                                                        {/* ==================================================
                                                                            BOTÓN EXPANDIR
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                                text-center
                                                                            "
                                                                        >

                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    alternarDetalles(
                                                                                        producto.id_producto
                                                                                    )
                                                                                }
                                                                                className="
                                                                                    w-7
                                                                                    h-7
                                                                                    rounded
                                                                                    border
                                                                                    border-[#D6D6CF]
                                                                                    text-[#3E4234]
                                                                                    hover:bg-[#E7E7E5]
                                                                                    transition-colors
                                                                                    font-medium
                                                                                "
                                                                                title={
                                                                                    expandido
                                                                                        ? "Ocultar información"
                                                                                        : "Ver información"
                                                                                }
                                                                            >

                                                                                {expandido
                                                                                    ? "−"
                                                                                    : "+"
                                                                                }

                                                                            </button>

                                                                        </td>


                                                                        {/* ==================================================
                                                                            ID
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                                text-gray-700
                                                                            "
                                                                        >
                                                                            {
                                                                                producto.id_producto
                                                                            }
                                                                        </td>


                                                                        {/* ==================================================
                                                                            IMAGEN
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                            "
                                                                        >

                                                                            {imagenPrincipal ? (

                                                                                <img
                                                                                    src={
                                                                                        imagenPrincipal
                                                                                    }
                                                                                    alt={
                                                                                        producto.nombre
                                                                                    }
                                                                                    className="
                                                                                        w-16
                                                                                        h-16
                                                                                        object-cover
                                                                                        rounded
                                                                                        border
                                                                                        border-[#D6D6CF]
                                                                                    "
                                                                                />

                                                                            ) : (

                                                                                <div
                                                                                    className="
                                                                                        w-16
                                                                                        h-16
                                                                                        rounded
                                                                                        border
                                                                                        border-[#D6D6CF]
                                                                                        bg-[#F1F1EF]
                                                                                        flex
                                                                                        items-center
                                                                                        justify-center
                                                                                        text-xs
                                                                                        text-gray-500
                                                                                    "
                                                                                >
                                                                                    Sin imagen
                                                                                </div>

                                                                            )}

                                                                        </td>


                                                                        {/* ==================================================
                                                                            PRODUCTO
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                                text-[#3E4234]
                                                                            "
                                                                        >

                                                                            <div
                                                                                className="
                                                                                    font-medium
                                                                                "
                                                                            >
                                                                                {
                                                                                    producto.nombre
                                                                                }
                                                                            </div>


                                                                            {producto.descripcion_corta && (

                                                                                <div
                                                                                    className="
                                                                                        text-xs
                                                                                        text-gray-500
                                                                                        mt-1
                                                                                        line-clamp-2
                                                                                    "
                                                                                >
                                                                                    {
                                                                                        producto.descripcion_corta
                                                                                    }
                                                                                </div>

                                                                            )}

                                                                        </td>


                                                                        {/* ==================================================
                                                                            CLASIFICACIÓN
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                                text-gray-700
                                                                            "
                                                                        >

                                                                            <div>

                                                                                {
                                                                                    producto
                                                                                        .subcategoria
                                                                                        ?.categoria
                                                                                        ?.nombre ||
                                                                                    "Sin categoría"
                                                                                }

                                                                            </div>


                                                                            <div
                                                                                className="
                                                                                    text-xs
                                                                                    text-gray-500
                                                                                    mt-1
                                                                                "
                                                                            >

                                                                                {
                                                                                    producto
                                                                                        .subcategoria
                                                                                        ?.nombre ||
                                                                                    "Sin subcategoría"
                                                                                }

                                                                            </div>

                                                                        </td>


                                                                        {/* ==================================================
                                                                            MARCA
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                                text-gray-700
                                                                            "
                                                                        >

                                                                            {
                                                                                producto.marca ||
                                                                                "Sin marca"
                                                                            }

                                                                        </td>


                                                                        {/* ==================================================
                                                                            PRECIO / SKU
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                                text-gray-700
                                                                            "
                                                                        >

                                                                            {variantePrincipal ? (

                                                                                <div>

                                                                                    {variantePrincipal.precioOferta !== null ? (

                                                                                        <>

                                                                                            <div
                                                                                                className="
                                                                                                    font-medium
                                                                                                    text-[#6B705C]
                                                                                                "
                                                                                            >
                                                                                                {
                                                                                                    formatearPrecio(
                                                                                                        variantePrincipal.precioOferta
                                                                                                    )
                                                                                                }
                                                                                            </div>


                                                                                            <div
                                                                                                className="
                                                                                                    text-xs
                                                                                                    text-gray-500
                                                                                                    line-through
                                                                                                "
                                                                                            >
                                                                                                {
                                                                                                    formatearPrecio(
                                                                                                        variantePrincipal.precioNormal
                                                                                                    )
                                                                                                }
                                                                                            </div>

                                                                                        </>

                                                                                    ) : (

                                                                                        <div
                                                                                            className="
                                                                                                font-medium
                                                                                            "
                                                                                        >
                                                                                            {
                                                                                                formatearPrecio(
                                                                                                    variantePrincipal.precioNormal
                                                                                                )
                                                                                            }
                                                                                        </div>

                                                                                    )}


                                                                                    <div
                                                                                        className="
                                                                                            text-xs
                                                                                            text-gray-500
                                                                                            mt-1
                                                                                        "
                                                                                    >
                                                                                        SKU:{" "}
                                                                                        {
                                                                                            variantePrincipal.sku
                                                                                        }
                                                                                    </div>

                                                                                </div>

                                                                            ) : (

                                                                                <span
                                                                                    className="
                                                                                        text-gray-500
                                                                                    "
                                                                                >
                                                                                    Sin variante
                                                                                </span>

                                                                            )}

                                                                        </td>


                                                                        {/* ==================================================
                                                                            ESTADO
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                            "
                                                                        >

                                                                            <div
                                                                                className="
                                                                                    space-y-1
                                                                                "
                                                                            >

                                                                                <div>

                                                                                    <span
                                                                                        className="
                                                                                            text-gray-500
                                                                                        "
                                                                                    >
                                                                                        Destacado:
                                                                                    </span>{" "}

                                                                                    <span
                                                                                        className={
                                                                                            producto.destacado
                                                                                                ? "text-[#6B705C] font-medium"
                                                                                                : "text-gray-500 font-medium"
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            producto.destacado
                                                                                                ? "Sí"
                                                                                                : "No"
                                                                                        }
                                                                                    </span>

                                                                                </div>


                                                                                <div>

                                                                                    <span
                                                                                        className="
                                                                                            text-gray-500
                                                                                        "
                                                                                    >
                                                                                        Activo:
                                                                                    </span>{" "}

                                                                                    <span
                                                                                        className={
                                                                                            producto.activo
                                                                                                ? "text-[#6B705C] font-medium"
                                                                                                : "text-gray-500 font-medium"
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            producto.activo
                                                                                                ? "Sí"
                                                                                                : "No"
                                                                                        }
                                                                                    </span>

                                                                                </div>


                                                                                <div>

                                                                                    <span
                                                                                        className="
                                                                                            text-gray-500
                                                                                        "
                                                                                    >
                                                                                        Publicado:
                                                                                    </span>{" "}

                                                                                    <span
                                                                                        className={
                                                                                            producto.publicado
                                                                                                ? "text-[#6B705C] font-medium"
                                                                                                : "text-gray-500 font-medium"
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            producto.publicado
                                                                                                ? "Sí"
                                                                                                : "No"
                                                                                        }
                                                                                    </span>

                                                                                </div>

                                                                            </div>

                                                                        </td>


                                                                        {/* ==================================================
                                                                            ACCIONES
                                                                        =================================================== */}

                                                                        <td
                                                                            className="
                                                                                px-2
                                                                                py-4
                                                                            "
                                                                        >

                                                                            <div
                                                                                className="
                                                                                    flex
                                                                                    items-center
                                                                                    gap-1
                                                                                    whitespace-nowrap
                                                                                "
                                                                            >

                                                                                {/* EDITAR */}

                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        setProductoEditar(
                                                                                            producto
                                                                                        )
                                                                                    }
                                                                                    className="
                                                                                        px-2
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
                                                                                    onClick={() =>
                                                                                        setProductoEliminar(
                                                                                            producto
                                                                                        )
                                                                                    }
                                                                                    className="
                                                                                        px-2
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


                                                                    {/* ==================================================
                                                                        FILA EXPANDIDA
                                                                    =================================================== */}

                                                                    {expandido && (

                                                                        <tr
                                                                            className="
                                                                                border-b
                                                                                border-[#D6D6CF]
                                                                                bg-[#F8F8F7]
                                                                            "
                                                                        >

                                                                            <td
                                                                                colSpan={9}
                                                                                className="
                                                                                    px-6
                                                                                    py-6
                                                                                "
                                                                            >

                                                                                <div
                                                                                    className="
                                                                                        space-y-6
                                                                                    "
                                                                                >

                                                                                    {/* ==================================================
                                                                                        INFORMACIÓN GENERAL
                                                                                    =================================================== */}

                                                                                    <div>

                                                                                        <h3
                                                                                            className="
                                                                                                text-base
                                                                                                font-semibold
                                                                                                text-[#3E4234]
                                                                                                mb-4
                                                                                            "
                                                                                        >
                                                                                            Información del producto
                                                                                        </h3>


                                                                                        <div
                                                                                            className="
                                                                                                grid
                                                                                                grid-cols-1
                                                                                                md:grid-cols-2
                                                                                                lg:grid-cols-3
                                                                                                gap-4
                                                                                            "
                                                                                        >

                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    ID producto
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-[#3E4234]
                                                                                                        font-medium
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto.id_producto
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    ID subcategoría
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-[#3E4234]
                                                                                                        font-medium
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto.id_subcategoria
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Nombre
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-[#3E4234]
                                                                                                        font-medium
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto.nombre
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Marca
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-[#3E4234]
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto.marca ||
                                                                                                        "Sin marca"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Categoría
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-[#3E4234]
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto
                                                                                                            .subcategoria
                                                                                                            ?.categoria
                                                                                                            ?.nombre ||
                                                                                                        "Sin categoría"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Subcategoría
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-[#3E4234]
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto
                                                                                                            .subcategoria
                                                                                                            ?.nombre ||
                                                                                                        "Sin subcategoría"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>

                                                                                        </div>

                                                                                    </div>


                                                                                    {/* ==================================================
                                                                                        DESCRIPCIONES
                                                                                    =================================================== */}

                                                                                    <div
                                                                                        className="
                                                                                            border-t
                                                                                            border-[#D6D6CF]
                                                                                            pt-5
                                                                                        "
                                                                                    >

                                                                                        <h3
                                                                                            className="
                                                                                                text-base
                                                                                                font-semibold
                                                                                                text-[#3E4234]
                                                                                                mb-4
                                                                                            "
                                                                                        >
                                                                                            Descripciones
                                                                                        </h3>


                                                                                        <div
                                                                                            className="
                                                                                                grid
                                                                                                grid-cols-1
                                                                                                lg:grid-cols-2
                                                                                                gap-5
                                                                                            "
                                                                                        >

                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Descripción corta
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-gray-700
                                                                                                        mt-1
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto.descripcion_corta ||
                                                                                                        "Sin descripción corta"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Descripción
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-gray-700
                                                                                                        mt-1
                                                                                                        whitespace-pre-line
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        producto.descripcion ||
                                                                                                        "Sin descripción"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>

                                                                                        </div>

                                                                                    </div>


                                                                                    {/* ==================================================
                                                                                        ESTADOS
                                                                                    =================================================== */}

                                                                                    <div
                                                                                        className="
                                                                                            border-t
                                                                                            border-[#D6D6CF]
                                                                                            pt-5
                                                                                        "
                                                                                    >

                                                                                        <h3
                                                                                            className="
                                                                                                text-base
                                                                                                font-semibold
                                                                                                text-[#3E4234]
                                                                                                mb-4
                                                                                            "
                                                                                        >
                                                                                            Estado del producto
                                                                                        </h3>


                                                                                        <div
                                                                                            className="
                                                                                                grid
                                                                                                grid-cols-1
                                                                                                sm:grid-cols-3
                                                                                                gap-4
                                                                                            "
                                                                                        >

                                                                                            {/* DESTACADO */}

                                                                                            <div
                                                                                                className="
                                                                                                    bg-white
                                                                                                    border
                                                                                                    border-[#D6D6CF]
                                                                                                    rounded
                                                                                                    px-4
                                                                                                    py-3
                                                                                                "
                                                                                            >

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Destacado
                                                                                                </span>


                                                                                                <p
                                                                                                    className={
                                                                                                        producto.destacado
                                                                                                            ? "text-[#6B705C] font-medium"
                                                                                                            : "text-gray-500 font-medium"
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        producto.destacado
                                                                                                            ? "Sí"
                                                                                                            : "No"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            {/* ACTIVO */}

                                                                                            <div
                                                                                                className="
                                                                                                    bg-white
                                                                                                    border
                                                                                                    border-[#D6D6CF]
                                                                                                    rounded
                                                                                                    px-4
                                                                                                    py-3
                                                                                                "
                                                                                            >

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Activo
                                                                                                </span>


                                                                                                <p
                                                                                                    className={
                                                                                                        producto.activo
                                                                                                            ? "text-[#6B705C] font-medium"
                                                                                                            : "text-gray-500 font-medium"
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        producto.activo
                                                                                                            ? "Sí"
                                                                                                            : "No"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            {/* PUBLICADO */}

                                                                                            <div
                                                                                                className="
                                                                                                    bg-white
                                                                                                    border
                                                                                                    border-[#D6D6CF]
                                                                                                    rounded
                                                                                                    px-4
                                                                                                    py-3
                                                                                                "
                                                                                            >

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Publicado
                                                                                                </span>


                                                                                                <p
                                                                                                    className={
                                                                                                        producto.publicado
                                                                                                            ? "text-[#6B705C] font-medium"
                                                                                                            : "text-gray-500 font-medium"
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        producto.publicado
                                                                                                            ? "Sí"
                                                                                                            : "No"
                                                                                                    }
                                                                                                </p>

                                                                                            </div>

                                                                                        </div>

                                                                                    </div>


                                                                                    {/* ==================================================
                                                                                        FECHAS
                                                                                    =================================================== */}

                                                                                    <div
                                                                                        className="
                                                                                            border-t
                                                                                            border-[#D6D6CF]
                                                                                            pt-5
                                                                                        "
                                                                                    >

                                                                                        <h3
                                                                                            className="
                                                                                                text-base
                                                                                                font-semibold
                                                                                                text-[#3E4234]
                                                                                                mb-4
                                                                                            "
                                                                                        >
                                                                                            Fechas
                                                                                        </h3>


                                                                                        <div
                                                                                            className="
                                                                                                grid
                                                                                                grid-cols-1
                                                                                                md:grid-cols-2
                                                                                                gap-4
                                                                                            "
                                                                                        >

                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Fecha de registro
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-gray-700
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        formatearFecha(
                                                                                                            producto.fecha_registro
                                                                                                        )
                                                                                                    }
                                                                                                </p>

                                                                                            </div>


                                                                                            <div>

                                                                                                <span
                                                                                                    className="
                                                                                                        text-xs
                                                                                                        text-gray-500
                                                                                                    "
                                                                                                >
                                                                                                    Fecha de actualización
                                                                                                </span>


                                                                                                <p
                                                                                                    className="
                                                                                                        text-sm
                                                                                                        text-gray-700
                                                                                                    "
                                                                                                >
                                                                                                    {
                                                                                                        formatearFecha(
                                                                                                            producto.fecha_actualizacion
                                                                                                        )
                                                                                                    }
                                                                                                </p>

                                                                                            </div>

                                                                                        </div>

                                                                                    </div>


                                                                                    {/* ==================================================
                                                                                        IMÁGENES
                                                                                    =================================================== */}

                                                                                    <div
                                                                                        className="
                                                                                            border-t
                                                                                            border-[#D6D6CF]
                                                                                            pt-5
                                                                                        "
                                                                                    >

                                                                                        <h3
                                                                                            className="
                                                                                                text-base
                                                                                                font-semibold
                                                                                                text-[#3E4234]
                                                                                                mb-4
                                                                                            "
                                                                                        >
                                                                                            Imágenes
                                                                                        </h3>


                                                                                        {producto.imagenes &&
                                                                                        producto.imagenes.length > 0 ? (

                                                                                            <div
                                                                                                className="
                                                                                                    flex
                                                                                                    flex-wrap
                                                                                                    gap-4
                                                                                                "
                                                                                            >

                                                                                                {producto.imagenes.map(
                                                                                                    (imagen) => (

                                                                                                        <div
                                                                                                            key={
                                                                                                                imagen.idImagen
                                                                                                            }
                                                                                                            className="
                                                                                                                w-24
                                                                                                                h-24
                                                                                                                rounded
                                                                                                                border
                                                                                                                border-[#D6D6CF]
                                                                                                                bg-white
                                                                                                                overflow-hidden
                                                                                                            "
                                                                                                        >

                                                                                                            <img
                                                                                                                src={
                                                                                                                    `${API_URL}/imagenes-productos/${imagen.idImagen}`
                                                                                                                }
                                                                                                                alt={
                                                                                                                    producto.nombre
                                                                                                                }
                                                                                                                className="
                                                                                                                    w-full
                                                                                                                    h-full
                                                                                                                    object-cover
                                                                                                                "
                                                                                                            />

                                                                                                        </div>

                                                                                                    )
                                                                                                )}

                                                                                            </div>

                                                                                        ) : (

                                                                                            <p
                                                                                                className="
                                                                                                    text-sm
                                                                                                    text-gray-500
                                                                                                "
                                                                                            >
                                                                                                Este producto no tiene imágenes registradas.
                                                                                            </p>

                                                                                        )}

                                                                                    </div>


                                                                                    {/* ==================================================
                                                                                        VARIANTES
                                                                                    =================================================== */}

                                                                                    <div
                                                                                        className="
                                                                                            border-t
                                                                                            border-[#D6D6CF]
                                                                                            pt-5
                                                                                        "
                                                                                    >

                                                                                        <h3
                                                                                            className="
                                                                                                text-base
                                                                                                font-semibold
                                                                                                text-[#3E4234]
                                                                                                mb-4
                                                                                            "
                                                                                        >
                                                                                            Variantes
                                                                                        </h3>


                                                                                        {producto.variantes &&
                                                                                        producto.variantes.length > 0 ? (

                                                                                            <div
                                                                                                className="
                                                                                                    space-y-4
                                                                                                "
                                                                                            >

                                                                                                {producto.variantes.map(
                                                                                                    (variante) => (

                                                                                                        <div
                                                                                                            key={
                                                                                                                variante.idVariante
                                                                                                            }
                                                                                                            className="
                                                                                                                bg-white
                                                                                                                border
                                                                                                                border-[#D6D6CF]
                                                                                                                rounded
                                                                                                                p-4
                                                                                                            "
                                                                                                        >

                                                                                                            <div
                                                                                                                className="
                                                                                                                    grid
                                                                                                                    grid-cols-1
                                                                                                                    sm:grid-cols-2
                                                                                                                    lg:grid-cols-5
                                                                                                                    gap-4
                                                                                                                "
                                                                                                            >

                                                                                                                {/* SKU */}

                                                                                                                <div>

                                                                                                                    <span
                                                                                                                        className="
                                                                                                                            text-xs
                                                                                                                            text-gray-500
                                                                                                                        "
                                                                                                                    >
                                                                                                                        SKU
                                                                                                                    </span>


                                                                                                                    <p
                                                                                                                        className="
                                                                                                                            text-sm
                                                                                                                            text-[#3E4234]
                                                                                                                            font-medium
                                                                                                                        "
                                                                                                                    >
                                                                                                                        {
                                                                                                                            variante.sku
                                                                                                                        }
                                                                                                                    </p>

                                                                                                                </div>


                                                                                                                {/* CÓDIGO */}

                                                                                                                <div>

                                                                                                                    <span
                                                                                                                        className="
                                                                                                                            text-xs
                                                                                                                            text-gray-500
                                                                                                                        "
                                                                                                                    >
                                                                                                                        Código de barras
                                                                                                                    </span>


                                                                                                                    <p
                                                                                                                        className="
                                                                                                                            text-sm
                                                                                                                            text-gray-700
                                                                                                                        "
                                                                                                                    >
                                                                                                                        {
                                                                                                                            variante.codigoBarras ||
                                                                                                                            "Sin código"
                                                                                                                        }
                                                                                                                    </p>

                                                                                                                </div>


                                                                                                                {/* PRECIO NORMAL */}

                                                                                                                <div>

                                                                                                                    <span
                                                                                                                        className="
                                                                                                                            text-xs
                                                                                                                            text-gray-500
                                                                                                                        "
                                                                                                                    >
                                                                                                                        Precio normal
                                                                                                                    </span>


                                                                                                                    <p
                                                                                                                        className="
                                                                                                                            text-sm
                                                                                                                            text-gray-700
                                                                                                                        "
                                                                                                                    >
                                                                                                                        {
                                                                                                                            formatearPrecio(
                                                                                                                                variante.precioNormal
                                                                                                                            )
                                                                                                                        }
                                                                                                                    </p>

                                                                                                                </div>


                                                                                                                {/* PRECIO OFERTA */}

                                                                                                                <div>

                                                                                                                    <span
                                                                                                                        className="
                                                                                                                            text-xs
                                                                                                                            text-gray-500
                                                                                                                        "
                                                                                                                    >
                                                                                                                        Precio oferta
                                                                                                                    </span>


                                                                                                                    <p
                                                                                                                        className="
                                                                                                                            text-sm
                                                                                                                            text-[#6B705C]
                                                                                                                            font-medium
                                                                                                                        "
                                                                                                                    >
                                                                                                                        {
                                                                                                                            variante.precioOferta !== null
                                                                                                                                ? formatearPrecio(
                                                                                                                                    variante.precioOferta
                                                                                                                                )
                                                                                                                                : "Sin oferta"
                                                                                                                        }
                                                                                                                    </p>

                                                                                                                </div>

                                                                                                            


                                                                                                            {/* ACTIVO DE LA VARIANTE */}

                                                                                                            <div>

                                                                                                                <span
                                                                                                                    className="
                                                                                                                        text-xs
                                                                                                                        text-gray-500
                                                                                                                    "
                                                                                                                >
                                                                                                                    Activo
                                                                                                                </span>


                                                                                                                <p
                                                                                                                    className={
                                                                                                                        variante.activo
                                                                                                                            ? "text-[#6B705C] font-medium"
                                                                                                                            : "text-gray-500 font-medium"
                                                                                                                    }
                                                                                                                >
                                                                                                                    {
                                                                                                                        variante.activo
                                                                                                                            ? "Sí"
                                                                                                                            : "No"
                                                                                                                    }
                                                                                                                </p>

                                                                                                            </div></div>


                                                                                                            {/* VALORES DE LA VARIANTE */}

                                                                                                            {variante.valores &&
                                                                                                            variante.valores.length > 0 && (

                                                                                                                <div
                                                                                                                    className="
                                                                                                                        mt-4
                                                                                                                        pt-4
                                                                                                                        border-t
                                                                                                                        border-[#E5E5E5]
                                                                                                                    "
                                                                                                                >

                                                                                                                    <span
                                                                                                                        className="
                                                                                                                            text-xs
                                                                                                                            text-gray-500
                                                                                                                        "
                                                                                                                    >
                                                                                                                        Valores
                                                                                                                    </span>


                                                                                                                    <div
                                                                                                                        className="
                                                                                                                            flex
                                                                                                                            flex-wrap
                                                                                                                            gap-2
                                                                                                                            mt-2
                                                                                                                        "
                                                                                                                    >

                                                                                                                        {variante.valores.map(
                                                                                                                            (valor) => (

                                                                                                                                <span
                                                                                                                                    key={
                                                                                                                                        valor.idValorVariante
                                                                                                                                    }
                                                                                                                                    className="
                                                                                                                                        px-3
                                                                                                                                        py-1
                                                                                                                                        rounded
                                                                                                                                        bg-[#E7E7E5]
                                                                                                                                        text-xs
                                                                                                                                        text-[#3E4234]
                                                                                                                                    "
                                                                                                                                >
                                                                                                                                    {
                                                                                                                                        valor.tipoVariante
                                                                                                                                            ?.nombre
                                                                                                                                    }:{" "}
                                                                                                                                    {
                                                                                                                                        valor.valor
                                                                                                                                    }
                                                                                                                                </span>

                                                                                                                            )
                                                                                                                        )}

                                                                                                                    </div>

                                                                                                                </div>

                                                                                                            )}

                                                                                                        </div>

                                                                                                    )
                                                                                                )}

                                                                                            </div>

                                                                                        ) : (

                                                                                            <p
                                                                                                className="
                                                                                                    text-sm
                                                                                                    text-gray-500
                                                                                                "
                                                                                            >
                                                                                                Este producto no tiene variantes registradas.
                                                                                            </p>

                                                                                        )}

                                                                                    </div>


                                                                                    {/* ==================================================
                                                                                        ESPECIFICACIONES
                                                                                    =================================================== */}

                                                                                    <div
                                                                                        className="
                                                                                            border-t
                                                                                            border-[#D6D6CF]
                                                                                            pt-5
                                                                                        "
                                                                                    >

                                                                                        <h3
                                                                                            className="
                                                                                                text-base
                                                                                                font-semibold
                                                                                                text-[#3E4234]
                                                                                                mb-4
                                                                                            "
                                                                                        >
                                                                                            Especificaciones
                                                                                        </h3>


                                                                                        {producto.especificaciones &&
                                                                                        producto.especificaciones.length > 0 ? (

                                                                                            <div
                                                                                                className="
                                                                                                    grid
                                                                                                    grid-cols-1
                                                                                                    sm:grid-cols-2
                                                                                                    lg:grid-cols-3
                                                                                                    gap-3
                                                                                                "
                                                                                            >

                                                                                                {producto.especificaciones.map(
                                                                                                    (especificacion) => (

                                                                                                        <div
                                                                                                            key={
                                                                                                                especificacion.idEspecificacion
                                                                                                            }
                                                                                                            className="
                                                                                                                bg-white
                                                                                                                border
                                                                                                                border-[#D6D6CF]
                                                                                                                rounded
                                                                                                                px-4
                                                                                                                py-3
                                                                                                            "
                                                                                                        >

                                                                                                            <span
                                                                                                                className="
                                                                                                                    text-xs
                                                                                                                    text-gray-500
                                                                                                                "
                                                                                                            >
                                                                                                                {
                                                                                                                    especificacion.nombre
                                                                                                                }
                                                                                                            </span>


                                                                                                            <p
                                                                                                                className="
                                                                                                                    text-sm
                                                                                                                    text-[#3E4234]
                                                                                                                    font-medium
                                                                                                                "
                                                                                                            >
                                                                                                                {
                                                                                                                    especificacion.valor
                                                                                                                }
                                                                                                            </p>

                                                                                                        </div>

                                                                                                    )
                                                                                                )}

                                                                                            </div>

                                                                                        ) : (

                                                                                            <p
                                                                                                className="
                                                                                                    text-sm
                                                                                                    text-gray-500
                                                                                                "
                                                                                            >
                                                                                                Este producto no tiene especificaciones registradas.
                                                                                            </p>

                                                                                        )}

                                                                                    </div>

                                                                                </div>

                                                                            </td>

                                                                        </tr>

                                                                    )}

                                                                </Fragment>

                                                            );

                                                        }
                                                    )}

                                                </tbody>

                                            </table>

                                        </div>

                                    )
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ============================================================
                MODAL NUEVO PRODUCTO
            ============================================================= */}

<ModalRegistrarProducto
    abierto={mostrarModalNuevo}
    onCerrar={() =>
        setMostrarModalNuevo(false)
    }
    onRegistrado={() => {
        setMostrarModalNuevo(false);
        obtenerProductos();
    }}
/>


            {/* ============================================================
                MODAL ACTUALIZAR PRODUCTO
            ============================================================= */}

            {productoEditar && (

                <ModalActualizarProducto
                    abierto={productoEditar !== null}
                    producto={productoEditar}
                    onCerrar={() =>
                        setProductoEditar(null)
                    }
                    onActualizado={() => {
                        setProductoEditar(null);
                        obtenerProductos();
                    }}
                />

            )}


            {/* ============================================================
                MODAL ELIMINAR PRODUCTO
            ============================================================= */}

            {productoEliminar && (

                <ModalEliminarProducto
                    abierto={productoEliminar !== null}
                    producto={productoEliminar}
                    onCerrar={() =>
                        setProductoEliminar(null)
                    }
                    onEliminado={() => {
                        setProductoEliminar(null);
                        obtenerProductos();
                    }}
                />

            )}

        </main>

    );

}