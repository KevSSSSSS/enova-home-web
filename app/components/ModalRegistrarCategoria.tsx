"use client";

import { useState } from "react";

/*
 * ============================================================
 * TIPOS
 * ============================================================
 */

interface SubcategoriaFormulario {
    nombre: string;
    descripcion: string;
}

interface ModalRegistrarCategoriaProps {
    abierto: boolean;
    onCerrar: () => void;
    onRegistrado: () => void;
}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function ModalRegistrarCategoria({
    abierto,
    onCerrar,
    onRegistrado
}: ModalRegistrarCategoriaProps) {

    /*
     * ========================================================
     * DATOS DE LA CATEGORÍA
     * ========================================================
     */

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");


    /*
     * ========================================================
     * SUBCATEGORÍAS
     * ========================================================
     */

    const [subcategorias, setSubcategorias] = useState<
        SubcategoriaFormulario[]
    >([]);


    /*
     * ========================================================
     * ESTADOS
     * ========================================================
     */

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");


    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const palabrasCortasPermitidas = new Set([
        "a",
        "al",
        "con",
        "de",
        "del",
        "e",
        "el",
        "en",
        "la",
        "las",
        "los",
        "para",
        "por",
        "sin",
        "un",
        "una",
        "y"
    ]);

    const validarNombre = (valor: string): string | null => {

        const nombre = valor.trim();

        if (!nombre) {
            return "El nombre es obligatorio.";
        }

        if (nombre.length > 50) {
            return "El nombre no puede tener más de 50 caracteres.";
        }

        if (!/^[\p{L}\p{M}\s'-]+$/u.test(nombre)) {
            return "El nombre solo puede contener letras, espacios, guiones y apóstrofes.";
        }

        const palabras = nombre.split(/\s+/);

        const palabraInvalida = palabras.some((palabra) => {

            const palabraLimpia = palabra
                .replace(/^[-']+|[-']+$/g, "");

            if (!palabraLimpia) {
                return true;
            }

            if (palabrasCortasPermitidas.has(
                palabraLimpia.toLowerCase()
            )) {
                return false;
            }

            return palabraLimpia.length < 3;
        });

        if (palabraInvalida) {
            return "Cada palabra debe tener al menos 3 letras.";
        }

        return null;
    };

    /*
     * ============================================================
     * AGREGAR SUBCATEGORÍA
     * ============================================================
     */

    const agregarSubcategoria = () => {

        setSubcategorias((actuales) => [
            ...actuales,
            {
                nombre: "",
                descripcion: ""
            }
        ]);

    };


    /*
     * ============================================================
     * ACTUALIZAR SUBCATEGORÍA
     * ============================================================
     */

    const actualizarSubcategoria = (
        indice: number,
        campo: keyof SubcategoriaFormulario,
        valor: string
    ) => {

        setSubcategorias((actuales) =>
            actuales.map((subcategoria, index) =>
                index === indice
                    ? {
                        ...subcategoria,
                        [campo]: valor
                    }
                    : subcategoria
            )
        );

    };


    /*
     * ============================================================
     * ELIMINAR SUBCATEGORÍA DEL FORMULARIO
     * ============================================================
     */

    const eliminarSubcategoria = (indice: number) => {

        setSubcategorias((actuales) =>
            actuales.filter(
                (_, index) => index !== indice
            )
        );

    };


    /*
     * ============================================================
     * LIMPIAR FORMULARIO
     * ============================================================
     */

    const limpiarFormulario = () => {

        setNombre("");
        setDescripcion("");
        setSubcategorias([]);
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
     * REGISTRAR CATEGORÍA + SUBCATEGORÍAS
     * ============================================================
     */

    const registrarCategoria = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");
        setExito("");


        /*
         * ========================================================
         * VALIDAR CATEGORÍA
         * ========================================================
         */

        const errorNombreCategoria = validarNombre(nombre);

        if (errorNombreCategoria) {

            setError(
                `Nombre de categoría: ${errorNombreCategoria}`
            );

            return;
        }


        /*
         * ========================================================
         * VALIDAR SUBCATEGORÍAS
         * ========================================================
         */

        if (subcategorias.length === 0) {

            setError(
                "Debe existir al menos una subcategoría."
            );

            return;
        }

        const subcategoriaInvalida =
            subcategorias.find(
                (subcategoria) =>
                    validarNombre(subcategoria.nombre)
            );

        if (subcategoriaInvalida) {

            const errorNombreSubcategoria =
                validarNombre(
                    subcategoriaInvalida.nombre
                );

            setError(
                `Nombre de subcategoría: ${errorNombreSubcategoria}`
            );

            return;
        }

        const nombresSubcategorias =
            subcategorias.map(
                (subcategoria) =>
                    subcategoria.nombre.trim().toLowerCase()
            );

        const haySubcategoriasDuplicadas =
            new Set(nombresSubcategorias).size !==
            nombresSubcategorias.length;

        if (haySubcategoriasDuplicadas) {

            setError(
                "No puede haber subcategorías con el mismo nombre."
            );

            return;
        }

        try {

            setCargando(true);


            /*
             * ====================================================
             * PREPARAR DATOS
             * ====================================================
             */

            const datosEnviar = {

                nombre: nombre.trim(),

                descripcion: descripcion.trim()
                    ? descripcion.trim()
                    : null,

                subcategorias: subcategorias.map(
                    (subcategoria) => ({

                        nombre:
                            subcategoria.nombre.trim(),

                        descripcion:
                            subcategoria.descripcion.trim()
                                ? subcategoria.descripcion.trim()
                                : null

                    })
                )

            };


            /*
             * ====================================================
             * PETICIÓN
             * ====================================================
             */

            const respuesta = await fetch(
                `${API_URL}/categorias/con-subcategorias`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify(
                        datosEnviar
                    )
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
                    "No se pudo registrar la categoría."
                );

                return;
            }


            /*
             * ====================================================
             * REGISTRO EXITOSO
             * ====================================================
             */

            setExito(
                datos.response ||
                "Categoría y subcategorías registradas correctamente."
            );


            /*
             * ====================================================
             * ACTUALIZAR LISTADO
             * ====================================================
             */

            onRegistrado();


            /*
             * ====================================================
             * CERRAR DESPUÉS DEL ÉXITO
             * ====================================================
             */

            setTimeout(() => {

                limpiarFormulario();

                onCerrar();

            }, 1500);


        } catch (error) {

            console.error(
                "Error al registrar categoría:",
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
                z-50
                flex
                items-center
                justify-center
                bg-black/40
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
                    rounded-lg
                    shadow-xl
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
                        Nueva categoría
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
                    onSubmit={registrarCategoria}
                    className="
                        p-6
                        overflow-y-auto
                    "
                >

                    {/* =================================================
                        DATOS DE CATEGORÍA
                    ================================================== */}

                    <div className="mb-6">

                        <h3
                            className="
                                text-lg
                                font-semibold
                                text-[#3E4234]
                                mb-4
                            "
                        >
                            Datos de la categoría
                        </h3>


                        {/* NOMBRE */}

                        <div className="mb-5">

                            <label
                                htmlFor="nombreCategoria"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Nombre
                            </label>

                            <input
                                id="nombreCategoria"
                                type="text"
                                value={nombre}
                                onChange={(event) =>
                                    setNombre(
                                        event.target.value
                                    )
                                }
                                disabled={cargando}
                                placeholder="Nombre de la categoría"
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


                        {/* DESCRIPCIÓN */}

                        <div>

                            <label
                                htmlFor="descripcionCategoria"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                "
                            >
                                Descripción
                            </label>

                            <textarea
                                id="descripcionCategoria"
                                value={descripcion}
                                onChange={(event) =>
                                    setDescripcion(
                                        event.target.value
                                    )
                                }
                                disabled={cargando}
                                placeholder="Descripción de la categoría"
                                rows={3}
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-[#D6D6CF]
                                    rounded-md
                                    outline-none
                                    resize-none
                                    focus:ring-2
                                    focus:ring-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            />

                        </div>

                    </div>


                    {/* =================================================
                        SUBCATEGORÍAS
                    ================================================== */}

                    <div className="mb-6">

                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-3
                                mb-4
                            "
                        >

                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    text-[#3E4234]
                                "
                            >
                                Subcategorías
                            </h3>


                            <button
                                type="button"
                                onClick={agregarSubcategoria}
                                disabled={cargando}
                                className="
                                    px-4
                                    py-2
                                    rounded-md
                                    border
                                    border-[#6B705C]
                                    text-[#3E4234]
                                    hover:bg-[#E7E7E5]
                                    transition
                                    disabled:opacity-50
                                "
                            >
                                + Agregar subcategoría
                            </button>

                        </div>


                        {/* =================================================
                            SIN SUBCATEGORÍAS
                        ================================================== */}

                        {subcategorias.length === 0 && (

                            <div
                                className="
                                    px-4
                                    py-4
                                    rounded-md
                                    bg-[#E7E7E5]
                                    text-sm
                                    text-gray-600
                                "
                            >
                                Debes agregar al menos una subcategoría.
                                Puedes agregar una o varias.
                            </div>

                        )}


                        {/* =================================================
                            LISTA DE SUBCATEGORÍAS
                        ================================================== */}

                        <div className="space-y-4">

                            {subcategorias.map(
                                (subcategoria, indice) => (

                                    <div
                                        key={indice}
                                        className="
                                            border
                                            border-[#D6D6CF]
                                            rounded-md
                                            p-4
                                            bg-gray-50
                                        "
                                    >

                                        {/* ENCABEZADO */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                mb-4
                                            "
                                        >

                                            <h4
                                                className="
                                                    font-medium
                                                    text-[#3E4234]
                                                "
                                            >
                                                Subcategoría {indice + 1}
                                            </h4>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    eliminarSubcategoria(
                                                        indice
                                                    )
                                                }
                                                disabled={cargando}
                                                className="
                                                    text-sm
                                                    text-red-600
                                                    hover:text-red-800
                                                    disabled:opacity-50
                                                "
                                            >
                                                Eliminar
                                            </button>

                                        </div>


                                        {/* NOMBRE */}

                                        <div className="mb-4">

                                            <label
                                                htmlFor={`subcategoria-nombre-${indice}`}
                                                className="
                                                    block
                                                    mb-2
                                                    text-sm
                                                    font-medium
                                                    text-[#3E4234]
                                                "
                                            >
                                                Nombre
                                            </label>

                                            <input
                                                id={`subcategoria-nombre-${indice}`}
                                                type="text"
                                                value={
                                                    subcategoria.nombre
                                                }
                                                onChange={(event) =>
                                                    actualizarSubcategoria(
                                                        indice,
                                                        "nombre",
                                                        event.target.value
                                                    )
                                                }
                                                disabled={cargando}
                                                placeholder="Nombre de la subcategoría"
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


                                        {/* DESCRIPCIÓN */}

                                        <div>

                                            <label
                                                htmlFor={`subcategoria-descripcion-${indice}`}
                                                className="
                                                    block
                                                    mb-2
                                                    text-sm
                                                    font-medium
                                                    text-[#3E4234]
                                                "
                                            >
                                                Descripción
                                            </label>

                                            <textarea
                                                id={`subcategoria-descripcion-${indice}`}
                                                value={
                                                    subcategoria.descripcion
                                                }
                                                onChange={(event) =>
                                                    actualizarSubcategoria(
                                                        indice,
                                                        "descripcion",
                                                        event.target.value
                                                    )
                                                }
                                                disabled={cargando}
                                                placeholder="Descripción de la subcategoría"
                                                rows={3}
                                                className="
                                                    w-full
                                                    px-4
                                                    py-3
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded-md
                                                    outline-none
                                                    resize-none
                                                    focus:ring-2
                                                    focus:ring-[#6B705C]
                                                    disabled:bg-gray-100
                                                "
                                            />

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================== */}

                    {error && (

                        <div
                            className="
                                mb-5
                                px-4
                                py-3
                                rounded-md
                                bg-red-50
                                border
                                border-red-200
                                text-red-700
                                text-sm
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
                                mb-5
                                px-4
                                py-3
                                rounded-md
                                bg-green-50
                                border
                                border-green-200
                                text-green-700
                                text-sm
                            "
                        >
                            {exito}
                        </div>

                    )}


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
                            pt-2
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
                                border-[#D6D6CF]
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
                            disabled={cargando}
                            className="
                                px-5
                                py-3
                                rounded-md
                                bg-[#6B705C]
                                text-white
                                hover:opacity-90
                                transition
                                disabled:opacity-50
                            "
                        >
                            {cargando
                                ? "Registrando..."
                                : "Registrar categoría"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}