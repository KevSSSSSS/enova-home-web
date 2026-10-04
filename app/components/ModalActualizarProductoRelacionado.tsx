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

interface ModalActualizarProductoRelacionadoProps {
    abierto: boolean;
    relacion: ProductoRelacionado | null;
    productosRelacionados: ProductoRelacionado[];
    onCerrar: () => void;
    onActualizado: () => void;
}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function ModalActualizarProductoRelacionado({
    abierto,
    relacion,
    productosRelacionados,
    onCerrar,
    onActualizado
}: ModalActualizarProductoRelacionadoProps) {


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

    const [productos, setProductos] =
        useState<Producto[]>([]);


    /*
     * ========================================================
     * DATOS EDITABLES
     * ========================================================
     */

    const [idProducto, setIdProducto] =
        useState("");

    const [idProductoRelacionado, setIdProductoRelacionado] =
        useState("");

    const [tipoRelacion, setTipoRelacion] =
        useState("RELACIONADO");

    const [orden, setOrden] =
        useState("1");

    const [activo, setActivo] =
        useState(true);


    /*
     * ========================================================
     * ESTADOS
     * ========================================================
     */

    const [cargandoProductos, setCargandoProductos] =
        useState(false);

    const [cargando, setCargando] =
        useState(false);

    const [error, setError] =
        useState("");

    const [exito, setExito] =
        useState("");


/*
 * ============================================================
 * CARGAR PRODUCTOS
 * ============================================================
 */

useEffect(() => {

    if (!abierto) {
        return;
    }

    const cargarProductos = async () => {

        try {

            setCargandoProductos(true);
            setError("");

            /*
             * Verificar que exista la URL del backend
             */
            if (!API_URL) {
                throw new Error(
                    "No está configurada la URL del servidor."
                );
            }

            /*
             * Solicitar productos al backend
             */
            const respuesta = await fetch(
                `${API_URL}/productos/completo`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            /*
             * Obtener primero la respuesta como texto.
             *
             * Esto evita que response.json() lance
             * directamente el error:
             *
             * JSON.parse: unexpected character...
             */
            const texto = await respuesta.text();

            /*
             * Intentar convertir la respuesta a JSON
             */
            let datos: any;

            try {

                datos = JSON.parse(texto);

            } catch (error) {

                console.error(
                    "La respuesta del servidor no es JSON:",
                    texto
                );

                throw new Error(
                    "El servidor devolvió una respuesta que no es JSON."
                );
            }

            /*
             * Validar respuesta del backend
             */
            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    "No se pudieron obtener los productos."
                );

                return;
            }

            /*
             * Guardar productos
             */
            setProductos(
                (datos.productos || []).map((producto: any) => ({
                    idProducto: producto.id_producto,
                    nombre: producto.nombre,
                    marca: producto.marca
                }))
            );

        } catch (error) {

            console.error(
                "Error al obtener productos:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo conectar con el servidor."
            );

        } finally {

            setCargandoProductos(false);

        }

    };

    cargarProductos();

}, [abierto, API_URL]);


    /*
     * ============================================================
     * CARGAR DATOS DE LA RELACIÓN
     * ============================================================
     */

    useEffect(() => {

        if (!abierto || !relacion) {
            return;
        }

        setIdProducto(
            String(relacion.producto.idProducto)
        );

        setIdProductoRelacionado(
            String(
                relacion.productoRelacionado.idProducto
            )
        );

        setTipoRelacion(
            relacion.tipoRelacion
        );

        setOrden(
            String(relacion.orden)
        );

        setActivo(
            relacion.activo
        );

        setError("");
        setExito("");

    }, [abierto, relacion]);


    /*
     * ============================================================
     * CERRAR MODAL
     * ============================================================
     */

    const cerrarModal = () => {

        if (cargando) {
            return;
        }

        setError("");
        setExito("");

        onCerrar();
    };


    /*
     * ============================================================
     * ACTUALIZAR RELACIÓN
     * ============================================================
     */

    const actualizarProductoRelacionado = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");
        setExito("");


        /*
         * ========================================================
         * VALIDAR RELACIÓN
         * ========================================================
         */

        if (!relacion) {

            setError(
                "No se encontró la relación que deseas actualizar."
            );

            return;
        }


        /*
         * ========================================================
         * VALIDAR PRODUCTO
         * ========================================================
         */

        const idProductoNumero =
            Number(idProducto);

        if (
            !Number.isInteger(idProductoNumero) ||
            idProductoNumero <= 0
        ) {

            setError(
                "Debes seleccionar un producto válido."
            );

            return;
        }


        /*
         * ========================================================
         * VALIDAR PRODUCTO RELACIONADO
         * ========================================================
         */

        const idProductoRelacionadoNumero =
            Number(idProductoRelacionado);

        if (
            !Number.isInteger(
                idProductoRelacionadoNumero
            ) ||
            idProductoRelacionadoNumero <= 0
        ) {

            setError(
                "Debes seleccionar un producto relacionado válido."
            );

            return;
        }


        /*
         * ========================================================
         * UN PRODUCTO NO PUEDE RELACIONARSE CONSIGO MISMO
         * ========================================================
         */

        if (
            idProductoNumero ===
            idProductoRelacionadoNumero
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

        const ordenNumero =
            Number(orden);

        if (
            !Number.isInteger(ordenNumero) ||
            ordenNumero <= 0
        ) {

            setError(
                "El orden debe ser un número entero mayor que 0."
            );

            return;
        }


        /*
         * ========================================================
         * ACTUALIZAR
         * ========================================================
         */

        try {

            setCargando(true);


            /*
             * ====================================================
             * PUT
             * ====================================================
             *
             * La URL identifica la relación ORIGINAL.
             *
             * El body contiene los NUEVOS datos.
             *
             */

            const respuesta = await fetch(
                `${API_URL}/productos/${relacion.producto.idProducto}/relacionados/${relacion.productoRelacionado.idProducto}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({

                        idProducto:
                            idProductoNumero,

                        idProductoRelacionado:
                            idProductoRelacionadoNumero,

                        tipoRelacion:
                            tipoRelacion,

                        orden:
                            ordenNumero,

                        activo:
                            activo
                    })
                }
            );


            const datos =
                await respuesta.json();


            /*
             * ====================================================
             * RESPUESTA DEL BACKEND
             * ====================================================
             */

            if (
                !respuesta.ok ||
                !datos.success
            ) {

                setError(
                    datos.response ||
                    "No se pudo actualizar el producto relacionado."
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
                "Producto relacionado actualizado correctamente"
            );


            /*
             * Actualizar listado
             */

            onActualizado();


            /*
             * Cerrar después del mensaje
             */

            setTimeout(() => {

                onCerrar();

            }, 1200);


        } catch (error) {

            console.error(
                "Error al actualizar producto relacionado:",
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

    if (!abierto || !relacion) {
        return null;
    }

    const productosParaActualizar = productos.some(
    (producto) =>
        producto.idProducto === relacion.producto.idProducto
    )

    ? productos
    : [relacion.producto, ...productos];

    const productosRelacionadosDisponibles = productos.filter((producto) => {
    if (producto.idProducto === Number(idProducto)) {
        return false;
    }

    const esRelacionActual =
        producto.idProducto ===
        relacion.productoRelacionado.idProducto;

    if (esRelacionActual) {
        return true;
    }

    const relacionYaExiste = productosRelacionados.some(
        (relacionExistente) =>
            relacionExistente.producto.idProducto ===
                Number(idProducto) &&
            relacionExistente.productoRelacionado.idProducto ===
                producto.idProducto &&
            !(
                relacionExistente.producto.idProducto ===
                    relacion.producto.idProducto &&
                relacionExistente.productoRelacionado.idProducto ===
                    relacion.productoRelacionado.idProducto
            )
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
                        Actualizar relación de productos
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
                    onSubmit={
                        actualizarProductoRelacionado
                    }
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


                    <div className="space-y-6">


                        {/* =================================================
                            PRODUCTO
                        ================================================== */}

                        <div>

                            <label
                                htmlFor="productoActualizar"
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
                                id="productoActualizar"
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


                                {productosParaActualizar.map((producto) => (

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
                            PRODUCTO RELACIONADO
                        ================================================== */}

                        <div>

                            <label
                                htmlFor="productoRelacionadoActualizar"
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
                                id="productoRelacionadoActualizar"
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
                                htmlFor="tipoRelacionActualizar"
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
                                id="tipoRelacionActualizar"
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
                                htmlFor="ordenActualizar"
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
                                id="ordenActualizar"
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
                                id="activoActualizar"
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
                                htmlFor="activoActualizar"
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
                                cargandoProductos ||
                                productos.length === 0
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
                                ? "Actualizando..."
                                : "Actualizar relación"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}