"use client";

import { useEffect, useState } from "react";

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
 * PROPS
 * ============================================================
 */

interface ModalActualizarClienteProps {
    cliente: Cliente;
    onCerrar: () => void;
    onActualizado: () => void;
}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function ModalActualizarCliente({
    cliente,
    onCerrar,
    onActualizado,
}: ModalActualizarClienteProps) {

    /*
     * ========================================================
     * URL DEL BACKEND
     * ========================================================
     */

    const API_URL = process.env.NEXT_PUBLIC_API_URL;


    /*
     * ========================================================
     * DATOS DEL CLIENTE
     * ========================================================
     */

    const [clienteEditar, setClienteEditar] =
        useState<Cliente>(cliente);


    /*
     * ========================================================
     * DIRECCIONES
     * ========================================================
     */

    const [direcciones, setDirecciones] =
        useState<Direccion[]>(cliente.direcciones || []);

    const [direccionesEliminar, setDireccionesEliminar] =
        useState<number[]>([]);

    /*
     * ========================================================
     * ESTADOS
     * ========================================================
     */

    const [cargando, setCargando] = useState(false);

    const [cargandoDirecciones, setCargandoDirecciones] =
        useState(false);

    const [mensaje, setMensaje] = useState("");

    const [error, setError] = useState("");

    const validarNombreCompleto = (valor: string): boolean => {
    const palabrasPermitidas = [
        "de",
        "la",
        "el",
        "y",
        "da",
        "do",
        "di",
        "van",
        "von",
    ];

    const palabras = valor
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (palabras.length === 0) {
        return false;
    }

    return palabras.every((palabra) => {
        const palabraNormalizada = palabra.toLowerCase();

        if (palabrasPermitidas.includes(palabraNormalizada)) {
            return true;
        }

        return (
            palabra.length >= 3 &&
            /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/.test(palabra)
        );
    });
};


    /*
     * ========================================================
     * CARGAR CLIENTE CUANDO CAMBIA
     * ========================================================
     */

    useEffect(() => {

        setClienteEditar(cliente);

        setDirecciones(cliente.direcciones || []);

        setMensaje("");

        setError("");

    }, [cliente]);


    /*
     * ========================================================
     * OBTENER DIRECCIONES
     * ========================================================
     */

    useEffect(() => {

        const obtenerDirecciones = async () => {

            try {

                setCargandoDirecciones(true);
                setError("");

                const respuesta = await fetch(
                    `${API_URL}/clientes/${cliente.id_cliente}/direcciones`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const datos = await respuesta.json();

                if (!respuesta.ok || !datos.success) {
                    throw new Error(
                        datos.response ||
                        "No fue posible obtener las direcciones"
                    );
                }

                const direccionesConvertidas: Direccion[] =
                    (datos.direcciones || []).map(
                        (direccion: any) => ({
                            idDireccion: direccion.id_direccion,
                            nombreReceptor: direccion.nombre_receptor,
                            telefono: direccion.telefono,
                            calle: direccion.calle,
                            numeroExterior: direccion.numero_exterior,
                            numeroInterior: direccion.numero_interior,
                            colonia: direccion.colonia,
                            codigoPostal: direccion.codigo_postal,
                            municipio: direccion.municipio,
                            estado: direccion.estado,
                            pais: direccion.pais,
                            referencias: direccion.referencias,
                            principal: direccion.principal,
                            activo: direccion.activo,
                        })
                    );

                setDirecciones(direccionesConvertidas);

            } catch (error) {

                console.error(
                    "Error al obtener direcciones:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "No fue posible obtener las direcciones"
                );

            } finally {

                setCargandoDirecciones(false);

            }

        };

        obtenerDirecciones();

    }, [API_URL, cliente.id_cliente]);


    /*
     * ========================================================
     * CAMBIAR DATOS DEL CLIENTE
     * ========================================================
     */

    const actualizarCampoCliente = (
        campo:
            | "nombre"
            | "apellido_paterno"
            | "apellido_materno"
            | "email"
            | "telefono",
        valor: string
    ) => {

        setClienteEditar((actual) => ({
            ...actual,
            [campo]: valor,
        }));

    };


    /*
     * ========================================================
     * CAMBIAR DATOS DE UNA DIRECCIÓN
     * ========================================================
     */

    const actualizarDireccion = (
        idDireccion: number,
        campo:
            | "nombreReceptor"
            | "telefono"
            | "calle"
            | "numeroExterior"
            | "numeroInterior"
            | "colonia"
            | "codigoPostal"
            | "municipio"
            | "estado"
            | "pais"
            | "referencias",
        valor: string
    ) => {

        setDirecciones((actuales) =>
            actuales.map((direccion) =>
                direccion.idDireccion === idDireccion
                    ? {
                        ...direccion,
                        [campo]: valor,
                    }
                    : direccion
            )
        );

    };


    /*
     * ========================================================
     * CAMBIAR PRINCIPAL / ACTIVO
     * ========================================================
     */

    const actualizarBooleanoDireccion = (
        idDireccion: number,
        campo: "principal" | "activo",
        valor: boolean
    ) => {

        setDirecciones((actuales) =>
            actuales.map((direccion) =>
                direccion.idDireccion === idDireccion
                    ? {
                        ...direccion,
                        [campo]: valor,
                    }
                    : direccion
            )
        );

    };


    /*
     * ========================================================
     * AGREGAR NUEVA DIRECCIÓN
     * ========================================================
     */

    const agregarDireccion = () => {

    if (direcciones.length >= 3) {
        setError(
            "Un cliente puede tener un máximo de 3 direcciones."
        );
        return;
    }

    setError("");

    const nuevaDireccion: Direccion = {

            /*
             * ID temporal negativo.
             *
             * Las direcciones nuevas se identifican mediante
             * este ID hasta que el Backend les asigne uno real.
             */

            idDireccion: -Date.now(),

            nombreReceptor: "",

            telefono: "",

            calle: "",

            numeroExterior: "",

            numeroInterior: "",

            colonia: "",

            codigoPostal: "",

            municipio: "",

            estado: "",

            pais: "México",

            referencias: "",

            principal: direcciones.length === 0,

            activo: true,

        };


        setDirecciones((actuales) => [
            ...actuales,
            nuevaDireccion,
        ]);

    };

/*
 * ========================================================
 * ELIMINAR DIRECCIÓN
 * ========================================================
 */

const eliminarDireccion = (idDireccion: number) => {

    const confirmar = window.confirm(
        "¿Deseas eliminar esta dirección?"
    );

    /*
     * El usuario canceló.
     */
    if (!confirmar) {
        return;
    }

    /*
     * ----------------------------------------------------
     * DIRECCIÓN NUEVA
     * ----------------------------------------------------
     *
     * Todavía no existe en la base de datos.
     * Solamente se elimina del formulario.
     */
    if (idDireccion < 0) {

        setDirecciones((actuales) =>
            actuales.filter(
                (direccion) =>
                    direccion.idDireccion !== idDireccion
            )
        );

        return;
    }

    /*
     * ----------------------------------------------------
     * DIRECCIÓN EXISTENTE
     * ----------------------------------------------------
     *
     * Se guarda el ID para ejecutar el DELETE
     * cuando el usuario pulse "Guardar cambios".
     */
    setDireccionesEliminar((actuales) => {

        if (actuales.includes(idDireccion)) {
            return actuales;
        }

        return [
            ...actuales,
            idDireccion
        ];

    });

    /*
     * La quitamos inmediatamente de la interfaz.
     */
    setDirecciones((actuales) =>
        actuales.filter(
            (direccion) =>
                direccion.idDireccion !== idDireccion
        )
    );

};


    /*
     * ========================================================
     * ELIMINAR DEL FORMULARIO UNA DIRECCIÓN NUEVA
     * ========================================================
     *
     * Aquí solamente eliminamos direcciones que todavía no
     * existen en la base de datos.
     *
     */

    const quitarDireccionNueva = (
        idDireccion: number
    ) => {

        setDirecciones((actuales) =>
            actuales.filter(
                (direccion) =>
                    direccion.idDireccion !== idDireccion
            )
        );

    };


    /*
     * ========================================================
     * ACTUALIZAR CLIENTE Y DIRECCIONES
     * ========================================================
     */

const actualizarCliente = async () => {

    // ------------------------------------------------------------
    // VALIDACIONES DEL CLIENTE
    // ------------------------------------------------------------

    if (!validarNombreCompleto(clienteEditar.nombre)) {
        setError("El nombre del cliente no es válido.");
        return;
    }

    if (!validarNombreCompleto(clienteEditar.apellido_paterno)) {
        setError("El apellido paterno no es válido.");
        return;
    }

    if (
        clienteEditar.apellido_materno &&
        !validarNombreCompleto(clienteEditar.apellido_materno)
    ) {
        setError("El apellido materno no es válido.");
        return;
    }

    const correoValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            clienteEditar.email.trim()
        );

    if (!correoValido) {
        setError("El correo electrónico no es válido.");
        return;
    }

    if (
        clienteEditar.telefono &&
        !/^\d{10}$/.test(clienteEditar.telefono.trim())
    ) {
        setError(
            "El teléfono debe contener exactamente 10 dígitos."
        );
        return;
    }

    // ------------------------------------------------------------
    // VALIDACIONES DE LAS DIRECCIONES
    // ------------------------------------------------------------

    for (const direccion of direcciones) {

        if (!direccion.nombreReceptor.trim()) {
            setError("El nombre del receptor es obligatorio.");
            return;
        }

        if (!direccion.calle.trim()) {
            setError("La calle es obligatoria.");
            return;
        }

        if (!direccion.numeroExterior.trim()) {
            setError("El número exterior es obligatorio.");
            return;
        }

        if (!direccion.colonia.trim()) {
            setError("La colonia es obligatoria.");
            return;
        }

        if (!direccion.codigoPostal.trim()) {
            setError("El código postal es obligatorio.");
            return;
        }

        if (!direccion.municipio.trim()) {
            setError("El municipio es obligatorio.");
            return;
        }

        if (!direccion.estado.trim()) {
            setError("El estado es obligatorio.");
            return;
        }

        if (!direccion.pais.trim()) {
            setError("El país es obligatorio.");
            return;
        }

        if (
            direccion.telefono &&
            !/^\d{10}$/.test(direccion.telefono.trim())
        ) {
            setError(
                "El teléfono de la dirección debe contener exactamente 10 dígitos."
            );
            return;
        }
    }

    try {
        setError("");
        setMensaje("");
        setCargando(true);

            /*
             * ==================================================
             * 1. ACTUALIZAR DATOS DEL CLIENTE
             * ==================================================
             */

            const respuestaCliente = await fetch(
                `${API_URL}/clientes/${clienteEditar.id_cliente}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({

                        nombre:
                            clienteEditar.nombre,

                        apellidoPaterno:
                            clienteEditar.apellido_paterno,

                        apellidoMaterno:
                            clienteEditar.apellido_materno,

                        email:
                            clienteEditar.email,

                        telefono:
                            clienteEditar.telefono,

                        activo:
                            clienteEditar.activo,

                    }),
                }
            );


            const datosCliente =
                await respuestaCliente.json();


            if (
                !respuestaCliente.ok ||
                !datosCliente.success
            ) {

                setError(
                    datosCliente.response ||
                    "No fue posible actualizar el cliente"
                );

                return;

            }

            /*
 * ==================================================
 * ELIMINAR DIRECCIONES
 * ==================================================
 */

            for (const idDireccion of direccionesEliminar) {

                const respuestaEliminar = await fetch(
                    `${API_URL}/clientes/${clienteEditar.id_cliente}/direcciones/${idDireccion}`,
                    {
                        method: "DELETE",
                        credentials: "include",
                    }
                );

                const datosEliminar =
                    await respuestaEliminar.json();

                if (
                    !respuestaEliminar.ok ||
                    !datosEliminar.success
                ) {

                    setError(
                        datosEliminar.response ||
                        "No fue posible eliminar una dirección"
                    );

                    return;
                }

            }


            /*
             * ==================================================
             * 2. ACTUALIZAR / AGREGAR DIRECCIONES
             * ==================================================
             */

            for (const direccion of direcciones) {

                /*
                 * Dirección NUEVA
                 */

                if (direccion.idDireccion < 0) {

                    const respuestaDireccion =
                        await fetch(
                            `${API_URL}/clientes/${clienteEditar.id_cliente}/direcciones`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                },

                                credentials: "include",

                                body: JSON.stringify({

                                    nombreReceptor:
                                        direccion.nombreReceptor,

                                    telefono:
                                        direccion.telefono,

                                    calle:
                                        direccion.calle,

                                    numeroExterior:
                                        direccion.numeroExterior,

                                    numeroInterior:
                                        direccion.numeroInterior,

                                    colonia:
                                        direccion.colonia,

                                    codigoPostal:
                                        direccion.codigoPostal,

                                    municipio:
                                        direccion.municipio,

                                    estado:
                                        direccion.estado,

                                    pais:
                                        direccion.pais,

                                    referencias:
                                        direccion.referencias,

                                    principal:
                                        direccion.principal,

                                    activo:
                                        direccion.activo,

                                }),
                            }
                        );


                    const datosDireccion =
                        await respuestaDireccion.json();


                    if (
                        !respuestaDireccion.ok ||
                        !datosDireccion.success
                    ) {

                        setError(
                            datosDireccion.response ||
                            "No fue posible agregar una dirección"
                        );

                        return;

                    }

                }

                /*
                 * Dirección EXISTENTE
                 */

                else {

                    const respuestaDireccion =
                        await fetch(
                            `${API_URL}/clientes/${clienteEditar.id_cliente}/direcciones/${direccion.idDireccion}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                },

                                credentials: "include",

                                body: JSON.stringify({

                                    nombreReceptor:
                                        direccion.nombreReceptor,

                                    telefono:
                                        direccion.telefono,

                                    calle:
                                        direccion.calle,

                                    numeroExterior:
                                        direccion.numeroExterior,

                                    numeroInterior:
                                        direccion.numeroInterior,

                                    colonia:
                                        direccion.colonia,

                                    codigoPostal:
                                        direccion.codigoPostal,

                                    municipio:
                                        direccion.municipio,

                                    estado:
                                        direccion.estado,

                                    pais:
                                        direccion.pais,

                                    referencias:
                                        direccion.referencias,

                                    principal:
                                        direccion.principal,

                                    activo:
                                        direccion.activo,

                                }),
                            }
                        );


                    const datosDireccion =
                        await respuestaDireccion.json();


                    if (
                        !respuestaDireccion.ok ||
                        !datosDireccion.success
                    ) {

                        setError(
                            datosDireccion.response ||
                            "No fue posible actualizar una dirección"
                        );

                        return;

                    }

                }

            }


            /*
             * ==================================================
             * 3. AVISAR AL CRUD
             * ==================================================
             */

            setDireccionesEliminar([]);

            onActualizado();


            /*
             * ==================================================
             * 4. MENSAJE DE ÉXITO
             * ==================================================
             */

            setMensaje(
                "Cliente actualizado correctamente."
            );


            /*
             * ==================================================
             * 5. CERRAR MODAL
             * ==================================================
             */

            setTimeout(() => {

                onCerrar();

            }, 1500);


        } catch (error) {

            console.error(
                "Error al actualizar cliente:",
                error
            );

            setError(
                "No fue posible conectar con el servidor."
            );

        } finally {

            setCargando(false);

        }

    };


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
                flex
                items-center
                justify-center
                bg-black/50
                px-4
                py-6
            "
        >

            <div
                className="
                    w-full
                    max-w-5xl
                    max-h-[90vh]
                    overflow-y-auto
                    bg-white
                    rounded-xl
                    shadow-2xl
                    border
                    border-[#D6D6CF]
                "
            >

                {/* =================================================
                    ENCABEZADO
                ================================================== */}

                <div
                    className="
                        bg-[#E7E7E5]
                        px-6
                        py-5
                        border-b
                        border-[#D6D6CF]
                        flex
                        items-center
                        justify-between
                    "
                >

                    <div>

                        <h2 className="
                            text-xl
                            font-semibold
                            text-[#3E4234]
                        ">
                            Actualizar cliente
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            ID: {clienteEditar.id_cliente}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onCerrar}
                        disabled={cargando}
                        className="
                            text-gray-500
                            hover:text-[#3E4234]
                            text-2xl
                            leading-none
                            disabled:opacity-50
                        "
                    >
                        ×
                    </button>

                </div>


                {/* =================================================
                    CONTENIDO
                ================================================== */}

                <div className="p-6">


                    {/* =================================================
                        DATOS DEL CLIENTE
                    ================================================== */}

                    <h3 className="
                        text-lg
                        font-semibold
                        text-[#3E4234]
                        mb-4
                    ">
                        Datos del cliente
                    </h3>


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-5
                    ">


                        {/* NOMBRE */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#3E4234]
                                mb-1
                            ">
                                Nombre
                            </label>

                            <input
                                type="text"
                                value={
                                    clienteEditar.nombre
                                }
                                onChange={(e) =>
                                    actualizarCampoCliente(
                                        "nombre",
                                        e.target.value
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    outline-none
                                    focus:border-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* APELLIDO PATERNO */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#3E4234]
                                mb-1
                            ">
                                Apellido paterno
                            </label>

                            <input
                                type="text"
                                value={
                                    clienteEditar.apellido_paterno
                                }
                                onChange={(e) =>
                                    actualizarCampoCliente(
                                        "apellido_paterno",
                                        e.target.value
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    outline-none
                                    focus:border-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* APELLIDO MATERNO */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#3E4234]
                                mb-1
                            ">
                                Apellido materno
                            </label>

                            <input
                                type="text"
                                value={
                                    clienteEditar.apellido_materno || ""
                                }
                                onChange={(e) =>
                                    actualizarCampoCliente(
                                        "apellido_materno",
                                        e.target.value
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    outline-none
                                    focus:border-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#3E4234]
                                mb-1
                            ">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                value={
                                    clienteEditar.email
                                }
                                onChange={(e) =>
                                    actualizarCampoCliente(
                                        "email",
                                        e.target.value
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    outline-none
                                    focus:border-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* TELEFONO */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#3E4234]
                                mb-1
                            ">
                                Teléfono
                            </label>

                            <input
                                type="tel"
                                value={
                                    clienteEditar.telefono || ""
                                }
                                onChange={(e) =>
                                    actualizarCampoCliente(
                                        "telefono",
                                        e.target.value
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    outline-none
                                    focus:border-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            />

                        </div>


                        {/* ESTADO */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#3E4234]
                                mb-1
                            ">
                                Estado
                            </label>

                            <select
                                value={
                                    clienteEditar.activo
                                        ? "true"
                                        : "false"
                                }
                                onChange={(e) =>
                                    setClienteEditar(
                                        (actual) => ({
                                            ...actual,
                                            activo:
                                                e.target.value ===
                                                "true",
                                        })
                                    )
                                }
                                disabled={cargando}
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    outline-none
                                    focus:border-[#6B705C]
                                    disabled:bg-gray-100
                                "
                            >

                                <option value="true">
                                    Activo
                                </option>

                                <option value="false">
                                    Inactivo
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        FECHA DE REGISTRO
                    ================================================== */}

                    <div className="mt-6">

                        <h3 className="
                            text-lg
                            font-semibold
                            text-[#3E4234]
                            mb-4
                        ">
                            Información de registro
                        </h3>


                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-[#3E4234]
                                mb-1
                            ">
                                Fecha de registro
                            </label>

                            <input
                                type="text"
                                value={
                                    clienteEditar.fecha_registro
                                }
                                readOnly
                                className="
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    bg-gray-100
                                    text-gray-600
                                "
                            />

                        </div>

                    </div>


                    {/* =================================================
                        DIRECCIONES
                    ================================================== */}

                    <div className="mt-8">

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-3
                            mb-4
                        ">

                            <h3 className="
                                text-lg
                                font-semibold
                                text-[#3E4234]
                            ">
                                Direcciones
                            </h3>

                        {direcciones.length < 3 && (
                            <button
                                type="button"
                                onClick={agregarDireccion}
                                disabled={cargando}
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
                                    disabled:opacity-50
                                "
                            >
                                + Agregar dirección
                            </button>
                        )}
                        </div>


                        {cargandoDirecciones && (

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Cargando direcciones...
                            </p>

                        )}


                        {!cargandoDirecciones &&
                            direcciones.length === 0 && (

                                <div className="
                                    px-4
                                    py-4
                                    border
                                    border-[#D6D6CF]
                                    rounded
                                    bg-[#F7F7F5]
                                ">
                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">
                                        El cliente no tiene
                                        direcciones registradas.
                                    </p>
                                </div>

                            )}


                        {!cargandoDirecciones &&
                            direcciones.length > 0 && (

                                <div className="space-y-5">

                                    {direcciones.map(
                                        (direccion, indice) => {

                                            const esNueva =
                                                direccion.idDireccion < 0;

                                            return (

                                                <div
                                                    key={
                                                        direccion.idDireccion
                                                    }
                                                    className="
                                                        border
                                                        border-[#D6D6CF]
                                                        rounded-lg
                                                        p-5
                                                        bg-[#FAFAF9]
                                                    "
                                                >

                                                    {/* =====================================
                                                        ENCABEZADO DIRECCIÓN
                                                    ====================================== */}



                                                    <div className="flex items-center justify-between">

                                                        <h3 className="text-lg font-semibold text-[#3E4234]">
                                                            Dirección {indice + 1}
                                                        </h3>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                eliminarDireccion(
                                                                    direccion.idDireccion
                                                                )
                                                            }
                                                            className="
                                                                px-3
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
                                                            X
                                                        </button>

                                                    </div>


                                                    <div className="
                                                        grid
                                                        grid-cols-1
                                                        md:grid-cols-2
                                                        gap-4
                                                    ">


                                                        {/* NOMBRE RECEPTOR */}

                                                        <div className="md:col-span-2">

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Nombre del receptor
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.nombreReceptor
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "nombreReceptor",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* TELEFONO */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Teléfono
                                                            </label>

                                                            <input
                                                                type="tel"
                                                                value={
                                                                    direccion.telefono || ""
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "telefono",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* CALLE */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Calle
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.calle
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "calle",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* NUMERO EXTERIOR */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Número exterior
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.numeroExterior
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "numeroExterior",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* NUMERO INTERIOR */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Número interior
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.numeroInterior || ""
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "numeroInterior",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* COLONIA */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Colonia
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.colonia
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "colonia",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* CODIGO POSTAL */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Código postal
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.codigoPostal
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "codigoPostal",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* MUNICIPIO */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Municipio
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.municipio
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "municipio",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* ESTADO */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Estado
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.estado
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "estado",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* PAIS */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                País
                                                            </label>

                                                            <input
                                                                type="text"
                                                                value={
                                                                    direccion.pais
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "pais",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            />

                                                        </div>


                                                        {/* REFERENCIAS */}

                                                        <div className="md:col-span-2">

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Referencias
                                                            </label>

                                                            <textarea
                                                                value={
                                                                    direccion.referencias || ""
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarDireccion(
                                                                        direccion.idDireccion,
                                                                        "referencias",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                rows={3}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                    resize-none
                                                                "
                                                            />

                                                        </div>


                                                        {/* PRINCIPAL */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Dirección principal
                                                            </label>

                                                            <select
                                                                value={
                                                                    direccion.principal
                                                                        ? "true"
                                                                        : "false"
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarBooleanoDireccion(
                                                                        direccion.idDireccion,
                                                                        "principal",
                                                                        e.target.value === "true"
                                                                    )
                                                                }
                                                                disabled={cargando}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            >

                                                                <option value="true">
                                                                    Sí
                                                                </option>

                                                                <option value="false">
                                                                    No
                                                                </option>

                                                            </select>

                                                        </div>


                                                        {/* ACTIVO */}

                                                        <div>

                                                            <label className="
                                                                block
                                                                text-sm
                                                                font-medium
                                                                text-[#3E4234]
                                                                mb-1
                                                            ">
                                                                Estado
                                                            </label>

                                                            <select
                                                                value={
                                                                    direccion.activo
                                                                        ? "true"
                                                                        : "false"
                                                                }
                                                                onChange={(e) =>
                                                                    actualizarBooleanoDireccion(
                                                                        direccion.idDireccion,
                                                                        "activo",
                                                                        e.target.value === "true"
                                                                    )
                                                                }
                                                                //disabled={cargando}
                                                                disabled={true}
                                                                className="
                                                                    w-full
                                                                    px-3
                                                                    py-2
                                                                    border
                                                                    border-[#D6D6CF]
                                                                    rounded
                                                                    outline-none
                                                                    focus:border-[#6B705C]
                                                                    disabled:bg-gray-100
                                                                "
                                                            >

                                                                <option value="true">
                                                                    Activa
                                                                </option>

                                                                <option value="false">
                                                                    Inactiva
                                                                </option>

                                                            </select>

                                                        </div>

                                                    </div>

                                                </div>

                                            );

                                        }
                                    )}

                                </div>

                            )}

                    </div>


                    {/* =================================================
                        MENSAJE ERROR
                    ================================================== */}

                    {error && (

                        <div className="
                            mt-6
                            px-4
                            py-3
                            border
                            border-red-300
                            bg-red-50
                            rounded
                        ">

                            <p className="
                                text-sm
                                text-red-600
                            ">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        MENSAJE ÉXITO
                    ================================================== */}

                    {mensaje && (

                        <div className="
                            mt-6
                            px-4
                            py-3
                            border
                            border-green-300
                            bg-green-50
                            rounded
                        ">

                            <p className="
                                text-sm
                                text-green-600
                            ">
                                {mensaje}
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        BOTONES
                    ================================================== */}

                    <div className="
                        mt-8
                        pt-5
                        border-t
                        border-[#D6D6CF]
                        flex
                        flex-col-reverse
                        sm:flex-row
                        sm:justify-end
                        gap-3
                    ">

                        <button
                            type="button"
                            onClick={onCerrar}
                            disabled={cargando}
                            className="
                                px-4
                                py-2
                                text-sm
                                font-medium
                                rounded
                                border
                                border-[#D6D6CF]
                                text-[#3E4234]
                                hover:bg-[#F1F1EF]
                                transition-colors
                                disabled:opacity-50
                            "
                        >
                            Cancelar
                        </button>


                        <button
                            type="button"
                            onClick={actualizarCliente}
                            disabled={
                                cargando ||
                                cargandoDirecciones
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
                                disabled:opacity-50
                            "
                        >
                            {cargando
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}