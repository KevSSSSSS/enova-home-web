"use client";

import { useState } from "react";

/*
 * ============================================================
 * PROPS DEL COMPONENTE
 * ============================================================
 */

interface ModalRegistrarClienteProps {

    onCerrar: () => void;

    onRegistrado: () => void;

}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function ModalRegistrarCliente({
    onCerrar,
    onRegistrado,
}: ModalRegistrarClienteProps) {


    /*
     * ========================================================
     * ESTADOS
     * ========================================================
     */

    const [cargando, setCargando] = useState(false);

    const [error, setError] = useState("");

    const [mensaje, setMensaje] = useState("");


    /*
     * ========================================================
     * DATOS DEL CLIENTE
     * ========================================================
     */

    const [nombre, setNombre] = useState("");

    const [apellidoPaterno, setApellidoPaterno] = useState("");

    const [apellidoMaterno, setApellidoMaterno] = useState("");

    const [email, setEmail] = useState("");

    const [telefono, setTelefono] = useState("");


    /*
     * ========================================================
     * DATOS DE LA DIRECCIÓN
     * ========================================================
     */

    const [nombreReceptor, setNombreReceptor] = useState("");

    const [telefonoDireccion, setTelefonoDireccion] = useState("");

    const [calle, setCalle] = useState("");

    const [numeroExterior, setNumeroExterior] = useState("");

    const [numeroInterior, setNumeroInterior] = useState("");

    const [colonia, setColonia] = useState("");

    const [codigoPostal, setCodigoPostal] = useState("");

    const [municipio, setMunicipio] = useState("");

    const [estado, setEstado] = useState("");

    const [pais, setPais] = useState("México");

    const [referencias, setReferencias] = useState("");


    /*
     * ========================================================
     * URL DEL BACKEND
     * ========================================================
     */

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const validarNombreCompleto = (valor: string): boolean => {
    const nombreNormalizado = valor.trim().replace(/\s+/g, " ");

    const formatoValido =
        /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

    if (!formatoValido.test(nombreNormalizado)) {
        return false;
    }

    const partes = nombreNormalizado.split(/[ '-]/);

    const particulasPermitidas = [
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

    return partes.every((parte) => {
        const parteNormalizada = parte.toLocaleLowerCase();

        return (
            [...parte].length >= 3 ||
            particulasPermitidas.includes(parteNormalizada)
        );
    });
};

    /*
     * ========================================================
     * REGISTRAR CLIENTE
     * ========================================================
     */

const registrarCliente = async (
    event: React.FormEvent<HTMLFormElement>
) => {
    event.preventDefault();

    setError("");
    setMensaje("");

    /*
     * ------------------------------------------------------------
     * 1. VALIDAR NOMBRE Y APELLIDOS
     * ------------------------------------------------------------
     */

    if (!validarNombreCompleto(nombre)) {
        setError(
            "El nombre debe contener palabras de al menos 3 letras y solo caracteres válidos."
        );
        return;
    }

    if (!validarNombreCompleto(apellidoPaterno)) {
        setError(
            "El apellido paterno debe contener palabras de al menos 3 letras y solo caracteres válidos."
        );
        return;
    }

    if (
        apellidoMaterno.trim() !== "" &&
        !validarNombreCompleto(apellidoMaterno)
    ) {
        setError(
            "El apellido materno debe contener palabras de al menos 3 letras y solo caracteres válidos."
        );
        return;
    }

    /*
     * ------------------------------------------------------------
     * 2. VALIDAR CORREO
     * ------------------------------------------------------------
     */

    const emailLimpio = email.trim();

    const formatoCorreoValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio);

    if (!formatoCorreoValido) {
        setError("Ingresa un correo electrónico válido");
        return;
    }

    /*
     * ------------------------------------------------------------
     * 3. VALIDAR TELÉFONO DEL CLIENTE
     * ------------------------------------------------------------
     */

    if (
        telefono.trim() !== "" &&
        !/^\d{10}$/.test(telefono.trim())
    ) {
        setError(
            "El teléfono debe contener exactamente 10 dígitos."
        );
        return;
    }

    /*
     * ------------------------------------------------------------
     * 4. VALIDAR DATOS DE LA DIRECCIÓN
     * ------------------------------------------------------------
     */

    if (!nombreReceptor.trim()) {
        setError("El nombre del receptor es obligatorio.");
        return;
    }

    if (!validarNombreCompleto(nombreReceptor)) {
        setError(
            "El nombre del receptor debe contener palabras de al menos 3 letras y solo caracteres válidos."
        );
        return;
    }

    if (!calle.trim()) {
        setError("La calle es obligatoria.");
        return;
    }

    if (!numeroExterior.trim()) {
        setError("El número exterior es obligatorio.");
        return;
    }

    if (!colonia.trim()) {
        setError("La colonia es obligatoria.");
        return;
    }

    if (!codigoPostal.trim()) {
        setError("El código postal es obligatorio.");
        return;
    }

    if (!municipio.trim()) {
        setError("El municipio es obligatorio.");
        return;
    }

    if (!estado.trim()) {
        setError("El estado es obligatorio.");
        return;
    }

    if (!pais.trim()) {
        setError("El país es obligatorio.");
        return;
    }

    /*
     * ------------------------------------------------------------
     * 5. VALIDAR TELÉFONO DE LA DIRECCIÓN
     * ------------------------------------------------------------
     */

    if (
        telefonoDireccion.trim() !== "" &&
        !/^\d{10}$/.test(telefonoDireccion.trim())
    ) {
        setError(
            "El teléfono de la dirección debe contener exactamente 10 dígitos."
        );
        return;
    }

    /*
     * ------------------------------------------------------------
     * 6. REGISTRAR CLIENTE
     * ------------------------------------------------------------
     */

    try {
        setCargando(true);

        const respuesta = await fetch(
            `${API_URL}/clientes/con-direccion`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    apellidoPaterno: apellidoPaterno.trim(),
                    apellidoMaterno:
                        apellidoMaterno.trim() || null,
                    email: emailLimpio.toLowerCase(),
                    telefono:
                        telefono.trim() || null,

                    direccion: {
                        nombreReceptor:
                            nombreReceptor.trim(),

                        telefono:
                            telefonoDireccion.trim() || null,

                        calle: calle.trim(),

                        numeroExterior:
                            numeroExterior.trim(),

                        numeroInterior:
                            numeroInterior.trim() || null,

                        colonia: colonia.trim(),

                        codigoPostal:
                            codigoPostal.trim(),

                        municipio:
                            municipio.trim(),

                        estado:
                            estado.trim(),

                        pais:
                            pais.trim(),

                        referencias:
                            referencias.trim() || null,
                    },
                }),
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok || !datos.success) {
            setError(
                datos.response ||
                    "No fue posible registrar el cliente"
            );
            return;
        }

        setMensaje(
            "Cliente registrado correctamente. Cerrando..."
        );

        onRegistrado();

        setTimeout(() => {
            onCerrar();
        }, 1500);
    } catch (error) {
        console.error(
            "Error durante el registro del cliente:",
            error
        );

        setError(
            "No fue posible conectar con el servidor. Inténtalo nuevamente."
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
                z-50
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
                    max-w-4xl
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

                    <h2 className="text-xl font-semibold text-[#3E4234]">
                        Registrar nuevo cliente
                    </h2>


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
                    FORMULARIO
                ================================================== */}

                <form
                    onSubmit={registrarCliente}
                    className="p-6"
                >

                    {/* =================================================
                        DATOS DEL CLIENTE
                    ================================================== */}

                    <div>

                        <h3 className="text-lg font-semibold text-[#3E4234] mb-4">
                            Datos del cliente
                        </h3>


                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            "
                        >

                            {/* NOMBRE */}

                            <div>

                                <label
                                    htmlFor="nombre"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Nombre
                                </label>

                                <input
                                    id="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) =>
                                        setNombre(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* APELLIDO PATERNO */}

                            <div>

                                <label
                                    htmlFor="apellidoPaterno"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Apellido paterno
                                </label>

                                <input
                                    id="apellidoPaterno"
                                    type="text"
                                    value={apellidoPaterno}
                                    onChange={(e) =>
                                        setApellidoPaterno(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* APELLIDO MATERNO */}

                            <div>

                                <label
                                    htmlFor="apellidoMaterno"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Apellido materno
                                </label>

                                <input
                                    id="apellidoMaterno"
                                    type="text"
                                    value={apellidoMaterno}
                                    onChange={(e) =>
                                        setApellidoMaterno(e.target.value)
                                    }
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* CORREO */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Correo electrónico
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* TELÉFONO */}

                            <div>

                                <label
                                    htmlFor="telefono"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Teléfono
                                </label>

                                <input
                                    id="telefono"
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) =>
                                        setTelefono(e.target.value)
                                    }
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        DIRECCIÓN
                    ================================================== */}

                    <div className="mt-8">

                        <h3 className="text-lg font-semibold text-[#3E4234] mb-4">
                            Primera dirección
                        </h3>


                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            "
                        >

                            {/* NOMBRE RECEPTOR */}

                            <div>

                                <label
                                    htmlFor="nombreReceptor"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Nombre del receptor
                                </label>

                                <input
                                    id="nombreReceptor"
                                    type="text"
                                    value={nombreReceptor}
                                    onChange={(e) =>
                                        setNombreReceptor(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* TELÉFONO */}

                            <div>

                                <label
                                    htmlFor="telefonoDireccion"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Teléfono
                                </label>

                                <input
                                    id="telefonoDireccion"
                                    type="tel"
                                    value={telefonoDireccion}
                                    onChange={(e) =>
                                        setTelefonoDireccion(e.target.value)
                                    }
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* CALLE */}

                            <div>

                                <label
                                    htmlFor="calle"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Calle
                                </label>

                                <input
                                    id="calle"
                                    type="text"
                                    value={calle}
                                    onChange={(e) =>
                                        setCalle(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* NÚMERO EXTERIOR */}

                            <div>

                                <label
                                    htmlFor="numeroExterior"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Número exterior
                                </label>

                                <input
                                    id="numeroExterior"
                                    type="text"
                                    value={numeroExterior}
                                    onChange={(e) =>
                                        setNumeroExterior(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* NÚMERO INTERIOR */}

                            <div>

                                <label
                                    htmlFor="numeroInterior"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Número interior
                                </label>

                                <input
                                    id="numeroInterior"
                                    type="text"
                                    value={numeroInterior}
                                    onChange={(e) =>
                                        setNumeroInterior(e.target.value)
                                    }
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* COLONIA */}

                            <div>

                                <label
                                    htmlFor="colonia"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Colonia
                                </label>

                                <input
                                    id="colonia"
                                    type="text"
                                    value={colonia}
                                    onChange={(e) =>
                                        setColonia(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* CÓDIGO POSTAL */}

                            <div>

                                <label
                                    htmlFor="codigoPostal"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Código postal
                                </label>

                                <input
                                    id="codigoPostal"
                                    type="text"
                                    value={codigoPostal}
                                    onChange={(e) =>
                                        setCodigoPostal(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* MUNICIPIO */}

                            <div>

                                <label
                                    htmlFor="municipio"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Municipio
                                </label>

                                <input
                                    id="municipio"
                                    type="text"
                                    value={municipio}
                                    onChange={(e) =>
                                        setMunicipio(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* ESTADO */}

                            <div>

                                <label
                                    htmlFor="estado"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Estado
                                </label>

                                <input
                                    id="estado"
                                    type="text"
                                    value={estado}
                                    onChange={(e) =>
                                        setEstado(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* PAÍS */}

                            <div>

                                <label
                                    htmlFor="pais"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    País
                                </label>

                                <input
                                    id="pais"
                                    type="text"
                                    value={pais}
                                    onChange={(e) =>
                                        setPais(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>


                            {/* REFERENCIAS */}

                            <div className="md:col-span-2">

                                <label
                                    htmlFor="referencias"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[#3E4234]
                                        mb-1
                                    "
                                >
                                    Referencias
                                </label>

                                <input
                                    id="referencias"
                                    type="text"
                                    value={referencias}
                                    onChange={(e) =>
                                        setReferencias(e.target.value)
                                    }
                                    className="
                                        w-full
                                        px-3
                                        py-2
                                        border
                                        border-[#D6D6CF]
                                        rounded
                                        outline-none
                                        focus:border-[#6B705C]
                                    "
                                />

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        MENSAJE DE ERROR
                    ================================================== */}

                    {error && (

                        <div
                            className="
                                mt-6
                                px-4
                                py-3
                                border
                                border-red-300
                                bg-red-50
                                rounded
                            "
                        >

                            <p className="text-sm text-red-600">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        MENSAJE DE ÉXITO
                    ================================================== */}

                    {mensaje && (

                        <div
                            className="
                                mt-6
                                px-4
                                py-3
                                border
                                border-green-300
                                bg-green-50
                                rounded
                            "
                        >

                            <p className="text-sm text-green-600">
                                {mensaje}
                            </p>

                        </div>

                    )}


                    {/* =================================================
                        BOTONES
                    ================================================== */}

                    <div
                        className="
                            mt-8
                            pt-5
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
                            type="submit"
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
                            {cargando
                                ? "Registrando..."
                                : "Registrar cliente"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}