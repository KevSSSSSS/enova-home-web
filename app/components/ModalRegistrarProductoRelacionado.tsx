"use client";

import { useEffect, useState } from "react";

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

interface ModalRegistrarProductoRelacionadoProps {
    abierto: boolean;
    onCerrar: () => void;
    onRegistrado: () => void;
    productoParaRelacion?: Producto | null;
    productosRelacionados: ProductoRelacionado[];
}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function ModalRegistrarProductoRelacionado({
    abierto,
    onCerrar,
    onRegistrado,
    productoParaRelacion,
    productosRelacionados
}: ModalRegistrarProductoRelacionadoProps) {

    /*
     * ========================================================
     * URL DEL BACKEND
     * ========================================================
     */

    const API_URL = process.env.NEXT_PUBLIC_API_URL;


    /*
     * ========================================================
     * PRODUCTOS
     * ========================================================
     */

    const [productos, setProductos] = useState<Producto[]>([]);

    const [cargandoProductos, setCargandoProductos] =
        useState(false);


    /*
     * ========================================================
     * DATOS DEL FORMULARIO
     * ========================================================
     */

    const [idProducto, setIdProducto] = useState("");

    const [idProductoRelacionado, setIdProductoRelacionado] =
        useState("");

    const [tipoRelacion, setTipoRelacion] =
        useState("RELACIONADO");

    const [orden, setOrden] = useState("1");

    const [activo, setActivo] = useState(true);


    /*
     * ========================================================
     * ESTADOS DEL MODAL
     * ========================================================
     */

    const [cargando, setCargando] = useState(false);

    const [error, setError] = useState("");

    const [exito, setExito] = useState("");


    /*
     * ============================================================
     * OBTENER PRODUCTOS
     * ============================================================
     */

    useEffect(() => {

        if (!abierto) {
            return;
        }

        const obtenerProductos = async () => {

            try {

                setCargandoProductos(true);

                setError("");

                const respuesta = await fetch(
                    `${API_URL}/productos/completo`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const datos = await respuesta.json();

                if (!respuesta.ok || !datos.success) {

                    throw new Error(
                        datos.response ||
                        "No se pudieron obtener los productos"
                    );

                }

                const productosBackend: Producto[] =
                    datos.productos.map(
                        (producto: {
                            id_producto: number;
                            nombre: string;
                            marca: string | null;
                        }) => ({
                            idProducto: producto.id_producto,
                            nombre: producto.nombre,
                            marca: producto.marca
                        })
                    );

                setProductos(productosBackend);

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

                setCargandoProductos(false);

            }

        };

        obtenerProductos();

    }, [abierto, API_URL]);

useEffect(() => {
    if (!abierto) {
        return;
    }

    if (productoParaRelacion) {
        setIdProducto(String(productoParaRelacion.idProducto));
        setIdProductoRelacionado("");
    } else {
        setIdProducto("");
        setIdProductoRelacionado("");
    }
}, [abierto, productoParaRelacion]);


    /*
     * ============================================================
     * LIMPIAR FORMULARIO
     * ============================================================
     */

    const limpiarFormulario = () => {

        setIdProducto("");

        setIdProductoRelacionado("");

        setTipoRelacion("RELACIONADO");

        setOrden("1");

        setActivo(true);

        setError("");

        setExito("");

    };


    /*
     * ============================================================
     * CERRAR MODAL
     * ============================================================
     */

    const cerrarModal = () => {

        if (cargando) {
            return;
        }

        limpiarFormulario();

        onCerrar();

    };


    /*
     * ============================================================
     * REGISTRAR PRODUCTO RELACIONADO
     * ============================================================
     */

    const registrarProductoRelacionado = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");

        setExito("");


        /*
         * ========================================================
         * VALIDAR PRODUCTO
         * ========================================================
         */

        if (!idProducto) {

            setError(
                "Debes seleccionar un producto."
            );

            return;

        }


        /*
         * ========================================================
         * VALIDAR PRODUCTO RELACIONADO
         * ========================================================
         */

        if (!idProductoRelacionado) {

            setError(
                "Debes seleccionar un producto relacionado."
            );

            return;

        }


        /*
         * ========================================================
         * EVITAR RELACIÓN CONSIGO MISMO
         * ========================================================
         */

        if (
            idProducto === idProductoRelacionado
        ) {

            setError(
                "Un producto no puede relacionarse consigo mismo."
            );

            return;

        }


        /*
         * ========================================================
         * VALIDAR ORDEN
         * ========================================================
         */

        const ordenNumero = Number(orden);

        if (
            !Number.isInteger(ordenNumero) ||
            ordenNumero <= 0
        ) {

            setError(
                "El orden debe ser un número entero mayor que 0."
            );

            return;

        }


        try {

            setCargando(true);


            /*
             * ====================================================
             * PETICIÓN POST
             * ====================================================
             */

            const respuesta = await fetch(
                `${API_URL}/productos/${idProducto}/relacionados`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        idProductoRelacionado:
                            Number(idProductoRelacionado),

                        tipoRelacion:
                            tipoRelacion,

                        orden:
                            ordenNumero,

                        activo:
                            activo
                    })
                }
            );


            const datos = await respuesta.json();


            /*
             * ====================================================
             * ERROR DEL BACKEND
             * ====================================================
             */

            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    "No se pudo registrar el producto relacionado."
                );

                return;

            }


            /*
             * ====================================================
             * ÉXITO
             * ====================================================
             */

            setExito(
                datos.response ||
                "Producto relacionado registrado correctamente."
            );


            /*
             * Avisar a page.tsx
             */

            onRegistrado();


            /*
             * Cerrar modal después del mensaje
             */

            setTimeout(() => {

                limpiarFormulario();

                onCerrar();

            }, 1200);


        } catch (error) {

            console.error(
                "Error al registrar producto relacionado:",
                error
            );

            setError(
                "No se pudo conectar con el servidor."
            );

        } finally {

            setCargando(false);

        }

    };


    /*
     * ============================================================
     * MODAL CERRADO
     * ============================================================
     */

    if (!abierto) {
        return null;
    }

    const productosRelacionadosDisponibles = productos.filter((producto) => {
    if (!idProducto) {
        return true;
    }

    if (producto.idProducto === Number(idProducto)) {
        return false;
    }

    const relacionYaExiste = productosRelacionados.some(
        (relacion) =>
            relacion.producto.idProducto === Number(idProducto) &&
            relacion.productoRelacionado.idProducto === producto.idProducto
    );

    return !relacionYaExiste;
});

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (

        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/50
                px-4
                py-8
            "
        >

            <div
                className="
                    w-full
                    max-w-2xl
                    max-h-[90vh]
                    bg-white
                    rounded-xl
                    shadow-2xl
                    overflow-hidden
                    flex
                    flex-col
                "
            >

                {/* =================================================
                    ENCABEZADO
                ================================================== */}

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
                        shrink-0
                    "
                >

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-[#3E4234]
                        "
                    >
                        Nueva relación de productos
                    </h2>


                    <button
                        type="button"
                        onClick={cerrarModal}
                        disabled={cargando}
                        className="
                            text-gray-500
                            hover:text-[#3E4234]
                            text-2xl
                            leading-none
                            disabled:opacity-50
                        "
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>


                {/* =================================================
                    FORMULARIO
                ================================================== */}

                <form
                    onSubmit={registrarProductoRelacionado}
                    className="
                        p-6
                        overflow-y-auto
                    "
                >

                    {/* =================================================
                        ERROR
                    ================================================== */}

                    {error && (

                        <div
                            className="
                                mb-6
                                px-4
                                py-3
                                rounded-md
                                bg-red-50
                                border
                                border-red-200
                                text-sm
                                text-red-700
                            "
                        >
                            {error}
                        </div>

                    )}


                    {/* =================================================
                        ÉXITO
                    ================================================== */}

                    {exito && (

                        <div
                            className="
                                mb-6
                                px-4
                                py-3
                                rounded-md
                                bg-green-50
                                border
                                border-green-200
                                text-sm
                                text-green-700
                            "
                        >
                            {exito}
                        </div>

                    )}


                    {/* =================================================
                        PRODUCTOS
                    ================================================== */}

                    <div className="space-y-6">


                        {/* =================================================
                            PRODUCTO
                        ================================================== */}

                        <div>

                            <label
                                htmlFor="producto"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Producto
                            </label>


                            <select
                                id="producto"
                                value={idProducto}
                                onChange={(event) =>
                                    setIdProducto(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    cargando ||
                                    cargandoProductos
                                }
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-[#D6D6CF]
                                    rounded-md
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            >

                                <option value="">
                                    {cargandoProductos
                                        ? "Cargando productos..."
                                        : "Selecciona un producto"}
                                </option>

                                {productos.map((producto) => (
                                <option
                                    key={producto.idProducto}
                                    value={producto.idProducto}
                                >
                                    {producto.nombre}
                                    {producto.marca
                                        ? ` - ${producto.marca}`
                                        : ""}
                                </option>
                                ))}

                            </select>

                        </div>


                        {/* =================================================
                            PRODUCTO RELACIONADO
                        ================================================== */}

                        <div>

                            <label
                                htmlFor="productoRelacionado"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Producto relacionado
                            </label>


                            <select
                                id="productoRelacionado"
                                value={idProductoRelacionado}
                                onChange={(event) =>
                                    setIdProductoRelacionado(
                                        event.target.value
                                    )
                                }
                                disabled={
                                    cargando ||
                                    cargandoProductos
                                }
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-[#D6D6CF]
                                    rounded-md
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            >

                                <option value="">
                                    {cargandoProductos
                                        ? "Cargando productos..."
                                        : "Selecciona un producto relacionado"}
                                </option>

                                
                                {productosRelacionadosDisponibles.map((producto) => (
                                    <option
                                        key={producto.idProducto}
                                        value={producto.idProducto}
                                    >
                                        {producto.nombre}
                                        {producto.marca
                                            ? ` — ${producto.marca}`
                                            : ""}
                                    </option>
                                ))}

                            </select>

                        </div>


                        {/* =================================================
                            TIPO DE RELACIÓN
                        ================================================== */}

                        <div>

                            <label
                                htmlFor="tipoRelacion"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Tipo de relación
                            </label>


                            <select
                                id="tipoRelacion"
                                value={tipoRelacion}
                                onChange={(event) =>
                                    setTipoRelacion(
                                        event.target.value
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-[#D6D6CF]
                                    rounded-md
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            >

                                <option value="RELACIONADO">
                                    RELACIONADO
                                </option>

                                <option value="COMPLEMENTARIO">
                                    COMPLEMENTARIO
                                </option>

                                <option value="SIMILAR">
                                    SIMILAR
                                </option>

                            </select>

                        </div>


                        {/* =================================================
                            ORDEN
                        ================================================== */}

                        <div>

                            <label
                                htmlFor="orden"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Orden
                            </label>


                            <input
                                id="orden"
                                type="number"
                                min="1"
                                value={orden}
                                onChange={(event) =>
                                    setOrden(
                                        event.target.value
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-[#D6D6CF]
                                    rounded-md
                                    outline-none
                                    focus:ring-2
                                    focus:ring-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* =================================================
                            ACTIVO
                        ================================================== */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <input
                                id="activo"
                                type="checkbox"
                                checked={activo}
                                onChange={(event) =>
                                    setActivo(
                                        event.target.checked
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-4
                                    h-4
                                    accent-[#6B705C]
                                "
                            />


                            <label
                                htmlFor="activo"
                                className="
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Relación activa
                            </label>

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
                            mt-8
                            pt-6
                            border-t
                            border-[#D6D6CF]
                        "
                    >

                        <button
                            type="button"
                            onClick={cerrarModal}
                            disabled={cargando}
                            className="
                                px-5
                                py-3
                                rounded-md
                                border
                                border-[#6B705C]
                                text-[#3E4234]
                                hover:bg-[#E7E7E5]
                                transition
                                disabled:opacity-50
                            "
                        >
                            Cancelar
                        </button>


                        <button
                            type="submit"
                            disabled={
                                cargando ||
                                cargandoProductos
                            }
                            className="
                                px-5
                                py-3
                                rounded-md
                                bg-[#6B705C]
                                text-white
                                hover:bg-[#5B604E]
                                transition
                                disabled:opacity-50
                            "
                        >
                            {cargando
                                ? "Registrando..."
                                : "Registrar relación"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}