"use client";

import {
    useEffect,
    useRef,
    useState
} from "react";


/*
 * ============================================================
 * INTERFACES
 * ============================================================
 */

interface Subcategoria {
    idSubcategoria: number;
    nombre: string;
    descripcion?: string | null;
    activo?: boolean;
}

interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion?: string | null;
    activo?: boolean;
    subcategorias: Subcategoria[];
}

interface ValorVariante {
    idValorVariante: number;
    valor: string;
}

interface TipoVariante {
    id_tipo_variante: number;
    nombre: string;
    valores: ValorVariante[];
}

interface EspecificacionFormulario {
    idEspecificacion?: number;
    nombre: string;
    valor: string;
}

interface ImagenFormulario {
    idImagen?: number;
    imagen: string;
    archivo: File | null;
}

interface ValorVarianteFormulario {
    idValorVariante?: number;
    idTipoVariante?: number;
    tipoVariante: string;
    valor: string;
}

interface VarianteFormulario {
    idVariante?: number;
    sku: string;
    codigoBarras: string;
    precioNormal: string;
    precioOferta: string;
    activo: boolean;
    valores: ValorVarianteFormulario[];
}


interface ValorVarianteProducto {
    idValorVariante: number;
    valor: string;
    tipoVariante: {
        idTipoVariante: number;
        nombre: string;
    };
}

interface VarianteProducto {
    idVariante: number;
    sku: string;
    codigoBarras: string | null;
    precioNormal: number;
    precioOferta: number | null;
    activo: boolean;
    valores: ValorVarianteProducto[];
}

interface EspecificacionProducto {
    idEspecificacion: number;
    nombre: string;
    valor: string;
    orden: number;
}

interface ImagenProducto {
    idImagen: number;
}

interface ProductoActualizar {
    id_producto: number;
    id_subcategoria: number;
    nombre: string;
    marca: string | null;
    descripcion_corta: string | null;
    descripcion: string | null;
    destacado: boolean;
    activo: boolean;
    publicado: boolean;
    especificaciones: EspecificacionProducto[];
    imagenes: ImagenProducto[];
    variantes: VarianteProducto[];
}


/*
 * ============================================================
 * PROPS
 * ============================================================
 */

interface ModalActualizarProductoProps {

    abierto: boolean;

    producto: ProductoActualizar | null;

    onCerrar: () => void;

    onActualizado: () => void;
}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function ModalActualizarProducto({
    abierto,
    producto,
    onCerrar,
    onActualizado,
}: ModalActualizarProductoProps) {


    /*
     * ========================================================
     * API
     * ========================================================
     */

    const API_URL =
        process.env.NEXT_PUBLIC_API_URL;


    /*
     * ========================================================
     * DATOS PRINCIPALES
     * ========================================================
     */

    const [idSubcategoria, setIdSubcategoria] =
        useState("");

    const [nombre, setNombre] =
        useState("");

    const [marca, setMarca] =
        useState("");

    const [descripcionCorta, setDescripcionCorta] =
        useState("");

    const [descripcion, setDescripcion] =
        useState("");

    const [destacado, setDestacado] =
        useState(false);

    const [publicado, setPublicado] =
        useState(false);

    const [activo, setActivo] =
        useState(true);


    /*
     * ========================================================
     * CATEGORÍAS Y SUBCATEGORÍAS
     * ========================================================
     */

    const [categorias, setCategorias] =
        useState<Categoria[]>([]);

    const [cargandoCategorias, setCargandoCategorias] =
        useState(false);


    /*
     * ========================================================
     * TIPOS DE VARIANTE
     * ========================================================
     */

    const [tiposVariante, setTiposVariante] =
        useState<TipoVariante[]>([]);

    const [cargandoVariantes, setCargandoVariantes] =
        useState(false);


    /*
     * ========================================================
     * ESPECIFICACIONES
     * ========================================================
     */

    const [especificaciones, setEspecificaciones] =
        useState<EspecificacionFormulario[]>([]);


    /*
     * ========================================================
     * IMÁGENES
     * ========================================================
     */

    const [imagenes, setImagenes] =
        useState<ImagenFormulario[]>([]);

    /*
     * ========================================================
     * VARIANTES DEL PRODUCTO
     * ========================================================
     *
     * El Backend exige por lo menos una.
     *
     */

    const [variantes, setVariantes] =
        useState<VarianteFormulario[]>([
            {
                sku: "",
                codigoBarras: "",
                precioNormal: "",
                precioOferta: "",
                activo: true,
                valores: [],
            },
        ]);


    /*
     * ========================================================
     * ESTADOS DE OPERACIÓN
     * ========================================================
     */

    const [guardando, setGuardando] =
        useState(false);

    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");


    /*
     * ========================================================
     * CARGAR CATEGORÍAS
     * ========================================================
     */

    const cargarCategorias = async () => {

        try {

            setCargandoCategorias(true);

            const respuesta = await fetch(
                `${API_URL}/categorias`,
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
                    "No se pudieron obtener las categorías."
                );

            }


            setCategorias(
                Array.isArray(datos.categorias)
                    ? datos.categorias
                    : []
            );


        } catch (error) {

            console.error(
                "Error al cargar categorías:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al cargar las categorías."
            );

        } finally {

            setCargandoCategorias(false);

        }

    };


    /*
     * ========================================================
     * CARGAR TIPOS DE VARIANTE
     * ========================================================
     */

    const cargarTiposVariante = async () => {

        try {

            setCargandoVariantes(true);

            const respuesta = await fetch(
                `${API_URL}/tipos-variante`,
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
                    "No se pudieron obtener los tipos de variante."
                );

            }


            setTiposVariante(
                Array.isArray(datos.tiposVariante)
                    ? datos.tiposVariante
                    : []
            );


        } catch (error) {

            console.error(
                "Error al cargar tipos de variante:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al cargar los tipos de variante."
            );

        } finally {

            setCargandoVariantes(false);

        }

    };


    /*
     * ========================================================
     * CARGAR DATOS AL ABRIR MODAL
     * ========================================================
     */

    useEffect(() => {

        if (!abierto) {
            return;
        }

        setError("");
        setMensaje("");

        cargarCategorias();
        cargarTiposVariante();

    }, [abierto]);

    /*
     * ========================================================
     * CARGAR PRODUCTO EN EL FORMULARIO
     * ========================================================
     */

    useEffect(() => {

        if (!abierto || !producto) {
            return;
        }

        setIdSubcategoria(
            String(producto.id_subcategoria)
        );

        setNombre(
            producto.nombre || ""
        );

        setMarca(
            producto.marca || ""
        );

        setDescripcionCorta(
            producto.descripcion_corta || ""
        );

        setDescripcion(
            producto.descripcion || ""
        );

        setDestacado(
            Boolean(producto.destacado)
        );

        setPublicado(
            Boolean(producto.publicado)
        );

        setActivo(
            Boolean(producto.activo)
        );

        setEspecificaciones(
            Array.isArray(producto.especificaciones)
                ? producto.especificaciones.map(
                    especificacion => ({
                        idEspecificacion:
                            especificacion.idEspecificacion,
                        nombre:
                            especificacion.nombre || "",
                        valor:
                            especificacion.valor || "",
                    })
                )
                : []
        );

        setImagenes(
            Array.isArray(producto.imagenes)
                ? producto.imagenes.map(
                    imagen => ({
                        idImagen:
                            imagen.idImagen,
                        imagen:
                            `${API_URL}/imagenes-productos/${imagen.idImagen}`,
                        archivo: null,
                    })
                )
                : []
        );

        setVariantes(
            Array.isArray(producto.variantes) &&
                producto.variantes.length > 0
                ? producto.variantes.map(
                    variante => ({
                        idVariante:
                            variante.idVariante,
                        sku:
                            variante.sku || "",
                        codigoBarras:
                            variante.codigoBarras || "",
                        precioNormal:
                            String(variante.precioNormal ?? ""),
                        precioOferta:
                            variante.precioOferta === null ||
                                variante.precioOferta === undefined
                                ? ""
                                : String(variante.precioOferta),
                        activo:
                            Boolean(variante.activo),
                        valores:
                            Array.isArray(variante.valores)
                                ? variante.valores.map(
                                    valor => ({
                                        idValorVariante:
                                            valor.idValorVariante,
                                        idTipoVariante:
                                            valor.tipoVariante?.idTipoVariante,
                                        tipoVariante:
                                            valor.tipoVariante?.nombre || "",
                                        valor:
                                            valor.valor || "",
                                    })
                                )
                                : [],
                    })
                )
                : [
                    {
                        sku: "",
                        codigoBarras: "",
                        precioNormal: "",
                        precioOferta: "",
                        activo: true,
                        valores: [],
                    },
                ]
        );

    }, [abierto, producto]);


    /*
     * ========================================================
     * LIMPIAR FORMULARIO
     * ========================================================
     */

    const limpiarFormulario = () => {

        setIdSubcategoria("");

        setNombre("");

        setMarca("");

        setDescripcionCorta("");

        setDescripcion("");

        setDestacado(false);

        setPublicado(false);

        setActivo(true);


        setEspecificaciones([]);


        setImagenes([]);


        setVariantes([
            {
                sku: "",
                codigoBarras: "",
                precioNormal: "",
                precioOferta: "",
                activo: true,
                valores: [],
            },
        ]);


        setError("");

        setMensaje("");

    };


    /*
     * ========================================================
     * CERRAR MODAL
     * ========================================================
     */

    const cerrarModal = () => {

        if (guardando) {
            return;
        }


        limpiarFormulario();

        onCerrar();

    };


    /*
     * ========================================================
     * AGREGAR ESPECIFICACIÓN
     * ========================================================
     */

    const agregarEspecificacion = () => {

        setEspecificaciones([
            ...especificaciones,
            {
                nombre: "",
                valor: "",
            },
        ]);

    };


    /*
     * ========================================================
     * ELIMINAR ESPECIFICACIÓN
     * ========================================================
     */

    const eliminarEspecificacion = (
        indice: number
    ) => {

        setEspecificaciones(
            especificaciones.filter(
                (_, index) =>
                    index !== indice
            )
        );

    };


    /*
     * ========================================================
     * ACTUALIZAR ESPECIFICACIÓN
     * ========================================================
     */

    const actualizarEspecificacion = (
        indice: number,
        campo: "nombre" | "valor",
        valor: string
    ) => {

        setEspecificaciones(
            especificaciones.map(
                (especificacion, index) => {

                    if (index !== indice) {
                        return especificacion;
                    }


                    return {
                        ...especificacion,
                        [campo]: valor,
                    };

                }
            )
        );

    };


    /*
     * ========================================================
     * AGREGAR IMAGEN
     * ========================================================
     */

    const agregarImagen = () => {

        setImagenes([
            ...imagenes,
            {
                idImagen: undefined,
                imagen: "",
                archivo: null,
            },
        ]);

    };


    /*
     * ========================================================
     * ELIMINAR IMAGEN
     * ========================================================
     */

    const eliminarImagen = (
        indice: number
    ) => {

        setImagenes(
            imagenes.filter(
                (_, index) =>
                    index !== indice
            )
        );

    };


    /*
     * ========================================================
     * ACTUALIZAR IMAGEN
     * ========================================================
     */




    /*
     * ========================================================
     * AGREGAR VARIANTE
     * ========================================================
     */

    const agregarVariante = () => {

        setVariantes([
            ...variantes,
            {
                sku: "",
                codigoBarras: "",
                precioNormal: "",
                precioOferta: "",
                activo: true,
                valores: [],
            },
        ]);

    };


    /*
     * ========================================================
     * ELIMINAR VARIANTE
     * ========================================================
     */

    const eliminarVariante = (
        indice: number
    ) => {

        /*
         * Nunca dejamos el arreglo vacío
         * porque el Backend exige mínimo una variante.
         */

        if (variantes.length === 1) {

            setError(
                "El producto debe tener al menos una variante."
            );

            return;

        }


        setVariantes(
            variantes.filter(
                (_, index) =>
                    index !== indice
            )
        );

    };


    /*
     * ========================================================
     * ACTUALIZAR VARIANTE
     * ========================================================
     */

    const actualizarVariante = (
        indice: number,
        campo:
            | "sku"
            | "codigoBarras"
            | "precioNormal"
            | "precioOferta",
        valor: string
    ) => {

        setVariantes(
            variantes.map(
                (variante, index) => {

                    if (index !== indice) {
                        return variante;
                    }


                    return {
                        ...variante,
                        [campo]: valor,
                    };

                }
            )
        );

    };


    /*
     * ========================================================
     * ACTUALIZAR ESTADO DE VARIANTE
     * ========================================================
     */

    const actualizarActivoVariante = (
        indice: number,
        valor: boolean
    ) => {

        setVariantes(
            variantes.map(
                (variante, index) => {

                    if (index !== indice) {
                        return variante;
                    }

                    return {
                        ...variante,
                        activo: valor,
                    };

                }
            )
        );

    };


    /*
     * ========================================================
     * AGREGAR VALOR DE VARIANTE
     * ========================================================
     */

    const agregarValorVariante = (
        indiceVariante: number
    ) => {

        setVariantes(
            variantes.map(
                (variante, index) => {

                    if (index !== indiceVariante) {
                        return variante;
                    }

                    return {
                        ...variante,

                        valores: [
                            ...variante.valores,
                            {
                                tipoVariante: "",
                                valor: "",
                            },
                        ],
                    };

                }
            )
        );

    };


    /*
     * ========================================================
     * ELIMINAR VALOR DE VARIANTE
     * ========================================================
     */

    const eliminarValorVariante = (
        indiceVariante: number,
        indiceValor: number
    ) => {

        setVariantes(
            variantes.map(
                (variante, index) => {

                    if (index !== indiceVariante) {
                        return variante;
                    }

                    return {
                        ...variante,

                        valores:
                            variante.valores.filter(
                                (_, indexValor) =>
                                    indexValor !== indiceValor
                            ),
                    };

                }
            )
        );

    };


    /*
     * ========================================================
     * ACTUALIZAR VALOR DE VARIANTE
     * ========================================================
     */

    const actualizarValorVariante = (
        indiceVariante: number,
        indiceValor: number,
        campo: "tipoVariante" | "valor",
        valor: string
    ) => {

        setVariantes(
            variantes.map(
                (variante, index) => {

                    if (index !== indiceVariante) {
                        return variante;
                    }

                    return {
                        ...variante,

                        valores:
                            variante.valores.map(
                                (valorVariante, indexValor) => {

                                    if (indexValor !== indiceValor) {
                                        return valorVariante;
                                    }

                                    return {
                                        ...valorVariante,
                                        [campo]: valor,
                                    };

                                }
                            ),
                    };

                }
            )
        );

    };


    /*
     * ========================================================
     * OBTENER SUBCATEGORÍAS DISPONIBLES
     * ========================================================
     */

    const obtenerSubcategorias = () => {

        const resultado: {
            idSubcategoria: number;
            nombre: string;
            categoria: string;
        }[] = [];


        for (
            const categoria
            of categorias
        ) {

            for (
                const subcategoria
                of categoria.subcategorias || []
            ) {

                if (
                    subcategoria.activo === false
                ) {
                    continue;
                }


                resultado.push({
                    idSubcategoria:
                        subcategoria.idSubcategoria,

                    nombre:
                        subcategoria.nombre,

                    categoria:
                        categoria.nombre,
                });

            }

        }


        return resultado;

    };


    /*
     * ========================================================
     * VALIDAR FORMULARIO
     * ========================================================
     */

    const validarFormulario = (): string | null => {

        if (!idSubcategoria) {

            return "Debe seleccionar una subcategoría.";

        }


        if (!nombre.trim()) {

            return "El nombre del producto es obligatorio.";

        }


        if (variantes.length === 0) {

            return "El producto debe tener al menos una variante.";

        }


        for (
            let indice = 0;
            indice < variantes.length;
            indice++
        ) {

            const variante =
                variantes[indice];


            if (!variante.sku.trim()) {

                return `La variante ${indice + 1} debe tener un SKU.`;

            }


            if (
                variante.precioNormal.trim() === ""
            ) {

                return `La variante ${indice + 1} debe tener un precio normal.`;

            }


            const precioNormal =
                Number(
                    variante.precioNormal
                );


            if (
                !Number.isFinite(precioNormal) ||
                precioNormal < 0
            ) {

                return `El precio normal de la variante ${indice + 1} no es válido.`;

            }


            if (
                variante.precioOferta.trim() !== ""
            ) {

                const precioOferta =
                    Number(
                        variante.precioOferta
                    );


                if (
                    !Number.isFinite(precioOferta) ||
                    precioOferta < 0
                ) {

                    return `El precio de oferta de la variante ${indice + 1} no es válido.`;

                }


                if (
                    precioOferta > precioNormal
                ) {

                    return `El precio de oferta de la variante ${indice + 1} no puede ser mayor al precio normal.`;

                }

            }


            for (
                let indiceValor = 0;
                indiceValor < variante.valores.length;
                indiceValor++
            ) {

                const valorVariante =
                    variante.valores[indiceValor];

                if (!valorVariante.tipoVariante.trim()) {
                    return `El valor ${indiceValor + 1} de la variante ${indice + 1} debe tener un tipo de variante.`;
                }

                if (!valorVariante.valor.trim()) {
                    return `El valor ${indiceValor + 1} de la variante ${indice + 1} no puede estar vacío.`;
                }

            }

        }


        for (
            let indice = 0;
            indice < especificaciones.length;
            indice++
        ) {

            const especificacion =
                especificaciones[indice];


            if (
                !especificacion.nombre.trim() ||
                !especificacion.valor.trim()
            ) {

                return `La especificación ${indice + 1} debe tener nombre y valor.`;

            }

        }


        for (
            let indice = 0;
            indice < imagenes.length;
            indice++
        ) {
            const imagen =
                imagenes[indice];

            if (
                !imagen.idImagen &&
                !imagen.archivo
            ) {
                return `La imagen ${indice + 1} debe tener un archivo seleccionado.`;
            }
        }


        /*
         * Validar SKU duplicados.
         */

        const skus =
            variantes.map(
                variante =>
                    variante.sku
                        .trim()
                        .toLowerCase()
            );


        if (
            new Set(skus).size !== skus.length
        ) {

            return "No puede haber SKU repetidos entre las variantes.";

        }


        return null;

    };


    /*
     * ========================================================
     * REGISTRAR PRODUCTO
     * ========================================================
     */

    const actualizarProducto = async () => {

        setError("");
        setMensaje("");

        if (!producto) {
            setError("No se encontró el producto que se desea actualizar.");
            return;
        }

        const errorValidacion =
            validarFormulario();

        if (errorValidacion) {
            setError(errorValidacion);
            return;
        }

        try {

            setGuardando(true);

            /*
             * ====================================================
             * RESOLVER TIPOS Y VALORES DE VARIANTE
             * ====================================================
             *
             * El formulario permite escribir libremente el tipo
             * y el valor. El Backend necesita los IDs.
             *
             */

            const tiposDisponibles: TipoVariante[] =
                tiposVariante.map(
                    tipo => ({
                        ...tipo,
                        valores: [
                            ...(tipo.valores || [])
                        ],
                    })
                );

            const valoresResueltos: number[][] = [];

            for (const variante of variantes) {

                const idsValores: number[] = [];

                for (const valorVariante of variante.valores) {

                    const nombreTipo =
                        valorVariante.tipoVariante.trim();

                    const valorTexto =
                        valorVariante.valor.trim();

                    let tipoExistente =
                        tiposDisponibles.find(
                            tipo =>
                                tipo.nombre.trim().toLowerCase() ===
                                nombreTipo.toLowerCase()
                        );

                    if (!tipoExistente) {

                        const respuestaTipo =
                            await fetch(
                                `${API_URL}/tipos-variante`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type":
                                            "application/json",
                                    },
                                    credentials: "include",
                                    body:
                                        JSON.stringify({
                                            nombre:
                                                nombreTipo,
                                        }),
                                }
                            );

                        const datosTipo =
                            await respuestaTipo.json();

                        if (
                            !respuestaTipo.ok ||
                            !datosTipo.success
                        ) {
                            throw new Error(
                                datosTipo.response ||
                                "No se pudo registrar el tipo de variante."
                            );
                        }

                        if (
                            !datosTipo.tipoVariante ||
                            !datosTipo.tipoVariante.id_tipo_variante
                        ) {
                            throw new Error(
                                "El servidor no devolvió el ID del tipo de variante."
                            );
                        }

                        tipoExistente = {
                            id_tipo_variante:
                                Number(
                                    datosTipo.tipoVariante
                                        .id_tipo_variante
                                ),
                            nombre:
                                datosTipo.tipoVariante.nombre,
                            valores: [],
                        };

                        tiposDisponibles.push(
                            tipoExistente
                        );
                    }

                    let valorExistente =
                        tipoExistente.valores.find(
                            valor =>
                                valor.valor.trim().toLowerCase() ===
                                valorTexto.toLowerCase()
                        );

                    /*
                     * Si el valor actual ya existe en el producto,
                     * conservamos su ID cuando corresponde.
                     */

                    if (
                        valorVariante.idValorVariante &&
                        !valorExistente
                    ) {
                        valorExistente = {
                            idValorVariante:
                                valorVariante.idValorVariante,
                            valor:
                                valorTexto,
                        };

                        tipoExistente.valores.push(
                            valorExistente
                        );
                    }

                    if (!valorExistente) {

                        const respuestaValor =
                            await fetch(
                                `${API_URL}/tipos-variante/${tipoExistente.id_tipo_variante}/valores`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type":
                                            "application/json",
                                    },
                                    credentials: "include",
                                    body:
                                        JSON.stringify({
                                            valor:
                                                valorTexto,
                                        }),
                                }
                            );

                        const datosValor =
                            await respuestaValor.json();

                        if (
                            !respuestaValor.ok ||
                            !datosValor.success
                        ) {
                            throw new Error(
                                datosValor.response ||
                                "No se pudo registrar el valor de variante."
                            );
                        }

                        if (
                            !datosValor.valor ||
                            !datosValor.valor.id_valor_variante
                        ) {
                            throw new Error(
                                "El servidor no devolvió el ID del valor de variante."
                            );
                        }

                        valorExistente = {
                            idValorVariante:
                                Number(
                                    datosValor.valor
                                        .id_valor_variante
                                ),
                            valor:
                                datosValor.valor.valor,
                        };

                        tipoExistente.valores.push(
                            valorExistente
                        );
                    }

                    idsValores.push(
                        Number(
                            valorExistente.idValorVariante
                        )
                    );
                }

                valoresResueltos.push(
                    idsValores
                );
            }

            /*
             * ====================================================
             * CONSTRUIR ESPECIFICACIONES
             * ====================================================
             */

            const especificacionesBackend =
                especificaciones.map(
                    (
                        especificacion,
                        indice
                    ) => ({
                        ...(especificacion.idEspecificacion
                            ? {
                                idEspecificacion:
                                    especificacion.idEspecificacion,
                            }
                            : {}),
                        nombre:
                            especificacion.nombre.trim(),
                        valor:
                            especificacion.valor.trim(),
                        orden:
                            indice + 1,
                    })
                );

            /*
             * ====================================================
             * CONSTRUIR IMÁGENES
             * ====================================================
             */



            /*
             * ====================================================
             * CONSTRUIR VARIANTES
             * ====================================================
             */

            const variantesBackend =
                variantes.map(
                    (
                        variante,
                        indiceVariante
                    ) => ({
                        ...(variante.idVariante
                            ? {
                                idVariante:
                                    variante.idVariante,
                            }
                            : {}),
                        sku:
                            variante.sku.trim(),
                        codigoBarras:
                            variante.codigoBarras.trim() ||
                            null,
                        precioNormal:
                            Number(
                                variante.precioNormal
                            ),
                        precioOferta:
                            variante.precioOferta.trim() === ""
                                ? null
                                : Number(
                                    variante.precioOferta
                                ),
                        activo:
                            variante.activo,
                        valores:
                            valoresResueltos[
                            indiceVariante
                            ],
                    })
                );

            /*
             * ====================================================
             * CUERPO DE ACTUALIZACIÓN
             * ====================================================
             */

            const cuerpo = new FormData();

            cuerpo.append(
                "idSubcategoria",
                String(Number(idSubcategoria))
            );

            cuerpo.append(
                "nombre",
                nombre.trim()
            );

            cuerpo.append(
                "marca",
                marca.trim() || ""
            );

            cuerpo.append(
                "descripcionCorta",
                descripcionCorta.trim() || ""
            );

            cuerpo.append(
                "descripcion",
                descripcion.trim() || ""
            );

            cuerpo.append(
                "destacado",
                String(destacado)
            );

            cuerpo.append(
                "activo",
                String(activo)
            );

            cuerpo.append(
                "publicado",
                String(publicado)
            );

            cuerpo.append(
                "especificaciones",
                JSON.stringify(
                    especificacionesBackend
                )
            );

            cuerpo.append(
                "variantes",
                JSON.stringify(
                    variantesBackend
                )
            );

            const imagenesExistentes =
                imagenes
                    .filter(
                        imagen =>
                            imagen.idImagen !== undefined &&
                            !imagen.archivo
                    )
                    .map(
                        imagen =>
                            imagen.idImagen
                    );

            cuerpo.append(
                "imagenesExistentes",
                JSON.stringify(
                    imagenesExistentes
                )
            );

            imagenes.forEach(
                imagen => {

                    if (imagen.archivo) {
                        cuerpo.append(
                            "imagenes",
                            imagen.archivo
                        );
                    }

                }
            );

            const respuesta =
                await fetch(
                    `${API_URL}/productos/${producto.id_producto}/completo`,
                    {
                        method: "PUT",
                        credentials: "include",
                        body: cuerpo,
                    }
                );

            const datos =
                await respuesta.json();

            if (
                !respuesta.ok ||
                !datos.success
            ) {
                throw new Error(
                    datos.response ||
                    "No se pudo actualizar el producto."
                );
            }

            setMensaje(
                datos.response ||
                "Producto actualizado correctamente."
            );

            /*
             * Dejamos el modal abierto para que el
             * usuario pueda ver el mensaje de éxito.
             *
             * Después actualizamos la tabla y cerramos.
             */

            setTimeout(() => {

                onActualizado();
                onCerrar();

            }, 1800);

        } catch (error) {

            console.error(
                "Error al actualizar producto:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al actualizar el producto."
            );

        } finally {

            setGuardando(false);

        }

    };

    /*
     * ========================================================
     * SI EL MODAL ESTÁ CERRADO
     * ========================================================
     */

    if (!abierto || !producto) {
        return null;
    }


    /*
     * ========================================================
     * SUBCATEGORÍAS
     * ========================================================
     */

    const subcategorias =
        obtenerSubcategorias();


    /*
     * ========================================================
     * RENDER
     * ========================================================
     */

    return (

        <div
            className="
                fixed
                inset-0
                z-[100]
                bg-black/40
                flex
                items-center
                justify-center
                p-4
            "
        >

            <div
                className="
                    w-full
                    max-w-5xl
                    max-h-[92vh]
                    overflow-y-auto
                    bg-white
                    rounded-lg
                    shadow-2xl
                    border
                    border-[#D6D6CF]
                "
            >

                {/* ==================================================
                    ENCABEZADO
                =================================================== */}

                <div
                    className="
                        sticky
                        top-0
                        z-10
                        bg-[#E7E7E5]
                        px-6
                        py-4
                        border-b
                        border-[#D6D6CF]
                        flex
                        items-center
                        justify-between
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
                            Actualizar producto
                        </h2>


                        <p
                            className="
                                text-sm
                                text-gray-600
                                mt-1
                            "
                        >
                            Actualiza la información del producto seleccionado.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={cerrarModal}
                        disabled={guardando}
                        className="
                            w-8
                            h-8
                            rounded
                            text-gray-600
                            hover:bg-white
                            hover:text-[#3E4234]
                            transition-colors
                            text-xl
                        "
                    >
                        ×
                    </button>

                </div>


                {/* ==================================================
                    CONTENIDO
                =================================================== */}

                <div className="p-6">


                    {/* ==================================================
                        ERROR
                    =================================================== */}

                    {error && (

                        <div
                            className="
                                mb-6
                                px-4
                                py-3
                                rounded
                                border
                                border-red-200
                                bg-red-50
                                text-red-700
                                text-sm
                            "
                        >
                            {error}
                        </div>

                    )}

                    {mensaje && (

                        <div
                            className="
                                mb-6
                                px-4
                                py-3
                                rounded
                                border
                                border-green-200
                                bg-green-50
                                text-green-700
                                text-sm
                            "
                        >
                            {mensaje}
                        </div>

                    )}


                    {/* ==================================================
                        INFORMACIÓN PRINCIPAL
                    =================================================== */}

                    <section>

                        <h3
                            className="
                                text-lg
                                font-semibold
                                text-[#3E4234]
                                mb-4
                            "
                        >
                            Información principal
                        </h3>


                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            "
                        >

                            {/* SUBCATEGORÍA */}

                            <div>

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-2
                                    "
                                >
                                    Subcategoría *
                                </label>


                                <select
                                    value={idSubcategoria}
                                    onChange={(e) =>
                                        setIdSubcategoria(
                                            e.target.value
                                        )
                                    }
                                    disabled={
                                        cargandoCategorias ||
                                        guardando
                                    }
                                    className="
                                        w-full
                                        rounded
                                        border
                                        border-[#D6D6CF]
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        bg-white
                                        focus:outline-none
                                        focus:ring-1
                                        focus:ring-[#6B705C]
                                    "
                                >

                                    <option value="">
                                        {cargandoCategorias
                                            ? "Cargando subcategorías..."
                                            : "Selecciona una subcategoría"}
                                    </option>


                                    {subcategorias.map(
                                        (subcategoria) => (

                                            <option
                                                key={
                                                    subcategoria.idSubcategoria
                                                }
                                                value={
                                                    subcategoria.idSubcategoria
                                                }
                                            >
                                                {
                                                    subcategoria.categoria
                                                }
                                                {" — "}
                                                {
                                                    subcategoria.nombre
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* NOMBRE */}

                            <div>

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-2
                                    "
                                >
                                    Nombre *
                                </label>


                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) =>
                                        setNombre(
                                            e.target.value
                                        )
                                    }
                                    disabled={guardando}
                                    placeholder="Nombre del producto"
                                    className="
                                        w-full
                                        rounded
                                        border
                                        border-[#D6D6CF]
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        focus:outline-none
                                        focus:ring-1
                                        focus:ring-[#6B705C]
                                    "
                                />

                            </div>


                            {/* MARCA */}

                            <div>

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-2
                                    "
                                >
                                    Marca
                                </label>


                                <input
                                    type="text"
                                    value={marca}
                                    onChange={(e) =>
                                        setMarca(
                                            e.target.value
                                        )
                                    }
                                    disabled={guardando}
                                    placeholder="Marca del producto"
                                    className="
                                        w-full
                                        rounded
                                        border
                                        border-[#D6D6CF]
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        focus:outline-none
                                        focus:ring-1
                                        focus:ring-[#6B705C]
                                    "
                                />

                            </div>


                            {/* DESCRIPCIÓN CORTA */}

                            <div>

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-2
                                    "
                                >
                                    Descripción corta
                                </label>


                                <input
                                    type="text"
                                    value={descripcionCorta}
                                    onChange={(e) =>
                                        setDescripcionCorta(
                                            e.target.value
                                        )
                                    }
                                    disabled={guardando}
                                    placeholder="Descripción breve"
                                    className="
                                        w-full
                                        rounded
                                        border
                                        border-[#D6D6CF]
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        focus:outline-none
                                        focus:ring-1
                                        focus:ring-[#6B705C]
                                    "
                                />

                            </div>


                            {/* DESCRIPCIÓN */}

                            <div
                                className="
                                    md:col-span-2
                                "
                            >

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-2
                                    "
                                >
                                    Descripción
                                </label>


                                <textarea
                                    value={descripcion}
                                    onChange={(e) =>
                                        setDescripcion(
                                            e.target.value
                                        )
                                    }
                                    disabled={guardando}
                                    rows={4}
                                    placeholder="Descripción completa del producto"
                                    className="
                                        w-full
                                        rounded
                                        border
                                        border-[#D6D6CF]
                                        px-3
                                        py-2.5
                                        text-sm
                                        text-gray-700
                                        resize-y
                                        focus:outline-none
                                        focus:ring-1
                                        focus:ring-[#6B705C]
                                    "
                                />

                            </div>

                        </div>


                        {/* ==================================================
                            ESTADOS
                        =================================================== */}

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-6
                                mt-5
                            "
                        >

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-gray-700
                                    cursor-pointer
                                "
                            >

                                <input
                                    type="checkbox"
                                    checked={destacado}
                                    onChange={(e) =>
                                        setDestacado(
                                            e.target.checked
                                        )
                                    }
                                    disabled={guardando}
                                    className="
                                        w-4
                                        h-4
                                        accent-[#6B705C]
                                    "
                                />

                                Producto destacado

                            </label>


                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-gray-700
                                    cursor-pointer
                                "
                            >

                                <input
                                    type="checkbox"
                                    checked={publicado}
                                    onChange={(e) =>
                                        setPublicado(
                                            e.target.checked
                                        )
                                    }
                                    disabled={guardando}
                                    className="
                                        w-4
                                        h-4
                                        accent-[#6B705C]
                                    "
                                />

                                Publicado

                            </label>

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-gray-700
                                    cursor-pointer
                                "
                            >

                                <input
                                    type="checkbox"
                                    checked={activo}
                                    onChange={(e) =>
                                        setActivo(
                                            e.target.checked
                                        )
                                    }
                                    //disabled={guardando}
                                    disabled={true}
                                    className="
                                        w-4
                                        h-4
                                        accent-[#6B705C]
                                    "
                                />

                                Activo

                            </label>

                        </div>

                    </section>


                    {/* ==================================================
                        ESPECIFICACIONES
                    =================================================== */}

                    <section
                        className="
                            mt-8
                            pt-6
                            border-t
                            border-[#D6D6CF]
                        "
                    >

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

                            <div>

                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        text-[#3E4234]
                                    "
                                >
                                    Especificaciones
                                </h3>


                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Información adicional del producto.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={agregarEspecificacion}
                                disabled={guardando}
                                className="
                                    px-3
                                    py-2
                                    text-sm
                                    rounded
                                    border
                                    border-[#6B705C]
                                    text-[#6B705C]
                                    hover:bg-[#E7E7E5]
                                    transition-colors
                                "
                            >
                                + Agregar especificación
                            </button>

                        </div>


                        {especificaciones.length === 0 ? (

                            <div
                                className="
                                    border
                                    border-dashed
                                    border-[#D6D6CF]
                                    rounded
                                    px-4
                                    py-6
                                    text-center
                                    text-sm
                                    text-gray-500
                                "
                            >
                                No hay especificaciones agregadas.
                            </div>

                        ) : (

                            <div
                                className="
                                    space-y-3
                                "
                            >

                                {especificaciones.map(
                                    (
                                        especificacion,
                                        indice
                                    ) => (

                                        <div
                                            key={indice}
                                            className="
                                                grid
                                                grid-cols-1
                                                md:grid-cols-[1fr_1fr_auto]
                                                gap-3
                                                items-end
                                                bg-[#F8F8F7]
                                                border
                                                border-[#D6D6CF]
                                                rounded
                                                p-4
                                            "
                                        >

                                            <div>

                                                <label
                                                    className="
                                                        block
                                                        text-xs
                                                        text-gray-500
                                                        mb-1
                                                    "
                                                >
                                                    Nombre
                                                </label>


                                                <input
                                                    type="text"
                                                    value={
                                                        especificacion.nombre
                                                    }
                                                    onChange={(e) =>
                                                        actualizarEspecificacion(
                                                            indice,
                                                            "nombre",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    placeholder="Ej. Material"
                                                    className="
                                                        w-full
                                                        rounded
                                                        border
                                                        border-[#D6D6CF]
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-1
                                                        focus:ring-[#6B705C]
                                                    "
                                                />

                                            </div>


                                            <div>

                                                <label
                                                    className="
                                                        block
                                                        text-xs
                                                        text-gray-500
                                                        mb-1
                                                    "
                                                >
                                                    Valor
                                                </label>


                                                <input
                                                    type="text"
                                                    value={
                                                        especificacion.valor
                                                    }
                                                    onChange={(e) =>
                                                        actualizarEspecificacion(
                                                            indice,
                                                            "valor",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    placeholder="Ej. Acero inoxidable"
                                                    className="
                                                        w-full
                                                        rounded
                                                        border
                                                        border-[#D6D6CF]
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-1
                                                        focus:ring-[#6B705C]
                                                    "
                                                />

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    eliminarEspecificacion(
                                                        indice
                                                    )
                                                }
                                                disabled={
                                                    guardando
                                                }
                                                className="
                                                    px-3
                                                    py-2
                                                    text-sm
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

                                    )
                                )}

                            </div>

                        )}

                    </section>


                    {/* ==================================================
                        IMÁGENES
                    =================================================== */}

                    <section
                        className="
                            mt-8
                            pt-6
                            border-t
                            border-[#D6D6CF]
                        "
                    >

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

                            <div>

                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        text-[#3E4234]
                                    "
                                >
                                    Imágenes
                                </h3>


                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Agrega las rutas de las imágenes del producto.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={agregarImagen}
                                disabled={guardando}
                                className="
                                    px-3
                                    py-2
                                    text-sm
                                    rounded
                                    border
                                    border-[#6B705C]
                                    text-[#6B705C]
                                    hover:bg-[#E7E7E5]
                                    transition-colors
                                "
                            >
                                + Agregar imagen
                            </button>

                        </div>


                        {imagenes.length === 0 ? (

                            <div
                                className="
                                    border
                                    border-dashed
                                    border-[#D6D6CF]
                                    rounded
                                    px-4
                                    py-6
                                    text-center
                                    text-sm
                                    text-gray-500
                                "
                            >
                                No hay imágenes agregadas.
                            </div>

                        ) : (

                            <div
                                className="
                                    space-y-3
                                "
                            >

                                {imagenes.map(
                                    (
                                        imagen,
                                        indice
                                    ) => (

                                        <div
                                            key={indice}
                                            className="
                                                flex
                                                flex-col
                                                sm:flex-row
                                                gap-3
                                                items-end
                                                bg-[#F8F8F7]
                                                border
                                                border-[#D6D6CF]
                                                rounded
                                                p-4
                                            "
                                        >

                                            <div
                                                className="
                                                    flex-1
                                                    w-full
                                                "
                                            >

                                                <label
                                                    className="
        block
        text-xs
        text-gray-500
        mb-1
    "
                                                >
                                                    Imagen
                                                </label>

                                                <div
                                                    className="
        flex
        items-end
        gap-8
    "
                                                >

                                                    <input
                                                        id={`imagen-${indice}`}
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        className="hidden"
                                                        onChange={(e) => {

                                                            const archivo =
                                                                e.target.files?.[0];

                                                            if (!archivo) {
                                                                return;
                                                            }

                                                            setImagenes(
                                                                imagenes.map(
                                                                    (item, index) => {

                                                                        if (index !== indice) {
                                                                            return item;
                                                                        }

                                                                        return {
                                                                            ...item,
                                                                            archivo,
                                                                        };

                                                                    }
                                                                )
                                                            );

                                                        }}
                                                        disabled={guardando}
                                                    />

                                                    <div
                                                        className="
        min-w-22
        min-h-22
        px-3
        rounded
        border
        border-[#D6D6CF]
        bg-white
        flex
        items-center
        justify-center
    "
                                                    >
                                                        {imagen.archivo ? (
                                                            <span>
                                                                {imagen.archivo.name}
                                                            </span>
                                                        ) : imagen.idImagen && imagen.imagen ? (
                                                            <img
                                                                src={imagen.imagen}
                                                                alt={`Imagen ${indice + 1}`}
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
                                                            <span
                                                                    className="
                                                                        whitespace-nowrap
                                                                        text-sm
                                                                        text-gray-600
                                                                        "
                                                            >
                                                                Ninguna imagen seleccionada
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `imagen-${indice}`
                                                        )
                                                        ?.click()
                                                }
                                                disabled={guardando}
                                                className="
            px-3
            py-2
            text-sm
            rounded
            border
            border-[#6B705C]
            text-[#6B705C]
            hover:bg-[#E7E7E5]
            transition-colors
        "
                                            >
                                                Examinar
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    eliminarImagen(
                                                        indice
                                                    )
                                                }
                                                disabled={
                                                    guardando
                                                }
                                                className="
                                                    px-3
                                                    py-2
                                                    text-sm
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

                                    )
                                )}

                            </div>

                        )}

                    </section>


                    {/* ==================================================
                        VARIANTES
                    =================================================== */}

                    <section
                        className="
                            mt-8
                            pt-6
                            border-t
                            border-[#D6D6CF]
                        "
                    >

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

                            <div>

                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        text-[#3E4234]
                                    "
                                >
                                    Variantes
                                </h3>


                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Cada producto debe tener al menos una variante.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={agregarVariante}
                                disabled={guardando}
                                className="
                                    px-3
                                    py-2
                                    text-sm
                                    rounded
                                    border
                                    border-[#6B705C]
                                    text-[#6B705C]
                                    hover:bg-[#E7E7E5]
                                    transition-colors
                                "
                            >
                                + Agregar variante
                            </button>

                        </div>


                        <div
                            className="
                                space-y-5
                            "
                        >

                            {variantes.map(
                                (
                                    variante,
                                    indiceVariante
                                ) => (

                                    <div
                                        key={indiceVariante}
                                        className="
                                            bg-[#F8F8F7]
                                            border
                                            border-[#D6D6CF]
                                            rounded-lg
                                            p-5
                                        "
                                    >

                                        {/* ENCABEZADO VARIANTE */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                mb-5
                                            "
                                        >

                                            <h4
                                                className="
                                                    font-semibold
                                                    text-[#3E4234]
                                                "
                                            >
                                                Variante{" "}
                                                {indiceVariante + 1}
                                            </h4>


                                            {variantes.length > 1 && (

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        eliminarVariante(
                                                            indiceVariante
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    className="
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        rounded
                                                        border
                                                        border-red-300
                                                        text-red-600
                                                        hover:bg-red-50
                                                        transition-colors
                                                    "
                                                >
                                                    Eliminar variante
                                                </button>

                                            )}

                                        </div>


                                        {/* DATOS VARIANTE */}

                                        <div
                                            className="
                                                grid
                                                grid-cols-1
                                                md:grid-cols-2
                                                lg:grid-cols-4
                                                gap-4
                                            "
                                        >

                                            {/* SKU */}

                                            <div>

                                                <label
                                                    className="
                                                        block
                                                        text-xs
                                                        text-gray-500
                                                        mb-1
                                                    "
                                                >
                                                    SKU *
                                                </label>


                                                <input
                                                    type="text"
                                                    value={
                                                        variante.sku
                                                    }
                                                    onChange={(e) =>
                                                        actualizarVariante(
                                                            indiceVariante,
                                                            "sku",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    placeholder="SKU-001"
                                                    className="
                                                        w-full
                                                        rounded
                                                        border
                                                        border-[#D6D6CF]
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-1
                                                        focus:ring-[#6B705C]
                                                    "
                                                />

                                            </div>


                                            {/* CÓDIGO DE BARRAS */}

                                            <div>

                                                <label
                                                    className="
                                                        block
                                                        text-xs
                                                        text-gray-500
                                                        mb-1
                                                    "
                                                >
                                                    Código de barras
                                                </label>


                                                <input
                                                    type="text"
                                                    value={
                                                        variante.codigoBarras
                                                    }
                                                    onChange={(e) =>
                                                        actualizarVariante(
                                                            indiceVariante,
                                                            "codigoBarras",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    placeholder="Código de barras"
                                                    className="
                                                        w-full
                                                        rounded
                                                        border
                                                        border-[#D6D6CF]
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-1
                                                        focus:ring-[#6B705C]
                                                    "
                                                />

                                            </div>


                                            {/* PRECIO NORMAL */}

                                            <div>

                                                <label
                                                    className="
                                                        block
                                                        text-xs
                                                        text-gray-500
                                                        mb-1
                                                    "
                                                >
                                                    Precio normal *
                                                </label>


                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={
                                                        variante.precioNormal
                                                    }
                                                    onChange={(e) =>
                                                        actualizarVariante(
                                                            indiceVariante,
                                                            "precioNormal",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    placeholder="0.00"
                                                    className="
                                                        w-full
                                                        rounded
                                                        border
                                                        border-[#D6D6CF]
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-1
                                                        focus:ring-[#6B705C]
                                                    "
                                                />

                                            </div>


                                            {/* PRECIO OFERTA */}

                                            <div>

                                                <label
                                                    className="
                                                        block
                                                        text-xs
                                                        text-gray-500
                                                        mb-1
                                                    "
                                                >
                                                    Precio oferta
                                                </label>


                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={
                                                        variante.precioOferta
                                                    }
                                                    onChange={(e) =>
                                                        actualizarVariante(
                                                            indiceVariante,
                                                            "precioOferta",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    placeholder="Opcional"
                                                    className="
                                                        w-full
                                                        rounded
                                                        border
                                                        border-[#D6D6CF]
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-1
                                                        focus:ring-[#6B705C]
                                                    "
                                                />

                                            </div>

                                        </div>


                                        {/* ACTIVO DE LA VARIANTE */}

                                        <div
                                            className="
                                                mt-4
                                                flex
                                                items-center
                                            "
                                        >

                                            <label
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-[#3E4234]
                                                    cursor-pointer
                                                "
                                            >

                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        variante.activo
                                                    }
                                                    onChange={(e) =>
                                                        actualizarActivoVariante(
                                                            indiceVariante,
                                                            e.target.checked
                                                        )
                                                    }
                                                    disabled={
                                                        guardando
                                                    }
                                                    className="
                                                        w-4
                                                        h-4
                                                        rounded
                                                        border-[#D6D6CF]
                                                        accent-[#6B705C]
                                                        focus:ring-[#6B705C]
                                                    "
                                                />

                                                Activo

                                            </label>

                                        </div>


                                        {/* ==================================================
                                            VALORES DE VARIANTE
                                        =================================================== */}

                                        <div
                                            className="
                                                mt-5
                                                pt-5
                                                border-t
                                                border-[#D6D6CF]
                                            "
                                        >

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

                                                <div>

                                                    <h5
                                                        className="
                                                            text-sm
                                                            font-semibold
                                                            text-[#3E4234]
                                                        "
                                                    >
                                                        Valores de variante
                                                    </h5>

                                                    <p
                                                        className="
                                                            text-xs
                                                            text-gray-500
                                                            mt-1
                                                        "
                                                    >
                                                        Agrega los valores que tendrá esta variante.
                                                    </p>

                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        agregarValorVariante(
                                                            indiceVariante
                                                        )
                                                    }
                                                    disabled={guardando}
                                                    className="
                                                        px-3
                                                        py-2
                                                        text-xs
                                                        rounded
                                                        border
                                                        border-[#6B705C]
                                                        text-[#6B705C]
                                                        hover:bg-[#E7E7E5]
                                                        transition-colors
                                                    "
                                                >
                                                    + Agregar valor
                                                </button>

                                            </div>


                                            {variante.valores.length === 0 ? (

                                                <div
                                                    className="
                                                        border
                                                        border-dashed
                                                        border-[#D6D6CF]
                                                        rounded
                                                        px-4
                                                        py-5
                                                        text-center
                                                        text-xs
                                                        text-gray-500
                                                    "
                                                >
                                                    No hay valores agregados a esta variante.
                                                </div>

                                            ) : (

                                                <div
                                                    className="
                                                        space-y-3
                                                    "
                                                >

                                                    {variante.valores.map(
                                                        (
                                                            valorVariante,
                                                            indiceValor
                                                        ) => (

                                                            <div
                                                                key={indiceValor}
                                                                className="
                                                                    grid
                                                                    grid-cols-1
                                                                    md:grid-cols-[1fr_1fr_auto]
                                                                    gap-3
                                                                    items-end
                                                                    bg-white
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    p-3
                                                                "
                                                            >

                                                                <div>

                                                                    <label
                                                                        className="
                                                                            block
                                                                            text-xs
                                                                            text-gray-500
                                                                            mb-1
                                                                        "
                                                                    >
                                                                        Tipo de variante *
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            valorVariante.tipoVariante
                                                                        }
                                                                        onChange={(e) =>
                                                                            actualizarValorVariante(
                                                                                indiceVariante,
                                                                                indiceValor,
                                                                                "tipoVariante",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        disabled={guardando}
                                                                        placeholder="Ej. Color"
                                                                        className="
                                                                            w-full
                                                                            rounded
                                                                            border
                                                                            border-[#D6D6CF]
                                                                            px-3
                                                                            py-2
                                                                            text-sm
                                                                            bg-white
                                                                            text-gray-700
                                                                            focus:outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[#6B705C]
                                                                        "
                                                                    />

                                                                </div>


                                                                <div>

                                                                    <label
                                                                        className="
                                                                            block
                                                                            text-xs
                                                                            text-gray-500
                                                                            mb-1
                                                                        "
                                                                    >
                                                                        Valor *
                                                                    </label>

                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            valorVariante.valor
                                                                        }
                                                                        onChange={(e) =>
                                                                            actualizarValorVariante(
                                                                                indiceVariante,
                                                                                indiceValor,
                                                                                "valor",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        disabled={guardando}
                                                                        placeholder="Ej. Natural"
                                                                        className="
                                                                            w-full
                                                                            rounded
                                                                            border
                                                                            border-[#D6D6CF]
                                                                            px-3
                                                                            py-2
                                                                            text-sm
                                                                            bg-white
                                                                            text-gray-700
                                                                            focus:outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[#6B705C]
                                                                        "
                                                                    />

                                                                </div>


                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        eliminarValorVariante(
                                                                            indiceVariante,
                                                                            indiceValor
                                                                        )
                                                                    }
                                                                    disabled={guardando}
                                                                    className="
                                                                        px-3
                                                                        py-2
                                                                        text-sm
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

                                                        )
                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </section>

                </div>


                {/* ==================================================
                    PIE DEL MODAL
                =================================================== */}

                <div
                    className="
                        sticky
                        bottom-0
                        bg-white
                        px-6
                        py-4
                        border-t
                        border-[#D6D6CF]
                        flex
                        flex-col-reverse
                        sm:flex-row
                        sm:justify-end
                        gap-3
                    "
                >

                    <button
                        type="button"
                        onClick={cerrarModal}
                        disabled={guardando}
                        className="
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            rounded
                            border
                            border-[#D6D6CF]
                            text-gray-700
                            hover:bg-[#F1F1EF]
                            transition-colors
                        "
                    >
                        Cancelar
                    </button>


                    <button
                        type="button"
                        onClick={actualizarProducto}
                        disabled={guardando}
                        className="
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            rounded
                            bg-[#6B705C]
                            text-white
                            hover:bg-[#5B604E]
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            transition-colors
                        "
                    >
                        {guardando
                            ? "Actualizando..."
                            : "Actualizar producto"}
                    </button>

                </div>

            </div>

        </div>

    );

}