"use client";

import { useEffect, useState } from "react";
import SidebarAdministrador from "../components/SidebarAdministrador";
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

interface SubcategoriaFormulario {
    idSubcategoria?: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

interface ModalActualizarCategoriaProps {
    abierto: boolean;
    categoria: Categoria | null;
    onCerrar: () => void;
    onActualizado: () => void;
}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function ModalActualizarCategoria({
    abierto,
    categoria,
    onCerrar,
    onActualizado
}: ModalActualizarCategoriaProps) {

    /*
     * ========================================================
     * DATOS DE LA CATEGORÍA
     * ========================================================
     */

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [activo, setActivo] = useState(true);


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
    const [subcategoriasEliminadas, setSubcategoriasEliminadas] =
    useState<number[]>([]);

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

            if (
                palabrasCortasPermitidas.has(
                    palabraLimpia.toLowerCase()
                )
            ) {
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
     * CARGAR DATOS DE LA CATEGORÍA
     * ============================================================
     */

    useEffect(() => {

        if (!abierto || !categoria) {
            return;
        }

        setNombre(categoria.nombre);
        setDescripcion(categoria.descripcion ?? "");
        setActivo(categoria.activo);

        setSubcategorias(
            categoria.subcategorias.map(
                (subcategoria) => ({
                    idSubcategoria:
                        subcategoria.idSubcategoria,

                    nombre:
                        subcategoria.nombre,

                    descripcion:
                        subcategoria.descripcion ?? "",

                    activo:
                        subcategoria.activo
                })
            )
        );

        setError("");
        setExito("");
        setSubcategoriasEliminadas([]);

    }, [abierto, categoria]);


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
                descripcion: "",
                activo: true
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
        campo: keyof Subcategoria,
        valor: string | boolean
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
 * ELIMINAR SUBCATEGORÍA
 * ============================================================
 */

const eliminarSubcategoria = (indice: number) => {

    const subcategoria = subcategorias[indice];

    if (!subcategoria) {
        return;
    }

    const idSubcategoria =
        subcategoria.idSubcategoria;

    if (idSubcategoria !== undefined) {

        setSubcategoriasEliminadas(
            (actuales) => [
                ...actuales,
                idSubcategoria
            ]
        );

    }

    setSubcategorias(
        (actuales) =>
            actuales.filter(
                (_, index) =>
                    index !== indice
            )
    );

};

    /*
     * ============================================================
     * ACTUALIZAR CATEGORÍA
     * ============================================================
     */

    const actualizarCategoria = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");
        setExito("");


        if (!categoria) {
            return;
        }


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

                nombre:
                    nombre.trim(),

                descripcion:
                    descripcion.trim()
                        ? descripcion.trim()
                        : null,

                activo,

                subcategorias:
                    subcategorias.map(
                        (subcategoria) => {

                            const resultado: {
                                idSubcategoria?: number;
                                nombre: string;
                                descripcion: string | null;
                                activo: boolean;
                            } = {

                                nombre:
                                    subcategoria.nombre.trim(),

                                descripcion:
                                    subcategoria.descripcion.trim()
                                        ? subcategoria.descripcion.trim()
                                        : null,

                                activo:
                                    subcategoria.activo

                            };


                            /*
                             * Solamente enviamos el ID cuando
                             * la subcategoría ya existe.
                             */

                            if (
                                subcategoria.idSubcategoria
                            ) {

                                resultado.idSubcategoria =
                                    subcategoria.idSubcategoria;

                            }


                            return resultado;

                        }

                    ),

                subcategoriasEliminadas

            };


            /*
             * ====================================================
             * PETICIÓN PUT
             * ====================================================
             */

            const respuesta = await fetch(
                `${API_URL}/categorias/${categoria.id_categoria}/con-subcategorias`,
                {
                    method: "PUT",

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
             * ERROR
             * ====================================================
             */

            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    "No se pudo actualizar la categoría."
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
                "Categoría y subcategorías actualizadas correctamente."
            );


            /*
             * Actualizar listado
             */

            onActualizado();


            /*
             * Cerrar modal
             */

            setTimeout(() => {

                onCerrar();

            }, 1200);


        } catch (error) {

            console.error(
                "Error al actualizar categoría:",
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
     * NO MOSTRAR
     * ============================================================
     */

    if (!abierto || !categoria) {
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
                        Editar categoría
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
                    onSubmit={actualizarCategoria}
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
                                htmlFor="editarNombreCategoria"
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
                                id="editarNombreCategoria"
                                type="text"
                                value={nombre}
                                onChange={(event) =>
                                    setNombre(
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


                        {/* DESCRIPCIÓN */}

                        <div className="mb-5">

                            <label
                                htmlFor="editarDescripcionCategoria"
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
                                id="editarDescripcionCategoria"
                                value={descripcion}
                                onChange={(event) =>
                                    setDescripcion(
                                        event.target.value
                                    )
                                }
                                disabled={cargando}
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


                        {/* ESTADO */}

                        <div>

                            <label
                                htmlFor="editarActivoCategoria"
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-sm
                                    font-medium
                                    text-[#3E4234]
                                    cursor-pointer
                                "
                            >

                                <input
                                    id="editarActivoCategoria"
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
                                    "
                                />

                                Categoría activa

                            </label>

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
                            LISTADO
                        ================================================== */}

                        <div className="space-y-4">

                            {subcategorias.map(
                                (subcategoria, indice) => (

                                    <div
                                        key={
                                            subcategoria.idSubcategoria ??
                                            `nueva-${indice}`
                                        }
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
                                                htmlFor={`editarSubcategoriaNombre-${indice}`}
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
                                                id={`editarSubcategoriaNombre-${indice}`}
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

                                        <div className="mb-4">

                                            <label
                                                htmlFor={`editarSubcategoriaDescripcion-${indice}`}
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
                                                id={`editarSubcategoriaDescripcion-${indice}`}
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


                                        {/* ESTADO */}

                                        <label
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                text-sm
                                                text-[#3E4234]
                                                cursor-pointer
                                            "
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    subcategoria.activo
                                                }
                                                onChange={(event) =>
                                                    actualizarSubcategoria(
                                                        indice,
                                                        "activo",
                                                        event.target.checked
                                                    )
                                                }
                                                disabled={cargando}
                                                className="
                                                    w-4
                                                    h-4
                                                "
                                            />

                                            Subcategoría activa

                                        </label>

                                    </div>

                                )
                            )}

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
                                Debe existir al menos una subcategoría.
                            </div>

                        )}

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
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}