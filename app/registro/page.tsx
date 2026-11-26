"use client";

import { Playfair_Display } from "next/font/google";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BotonRegresar from "../components/BotonRegresar";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function RegistroPage() {

    const router = useRouter();

    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    // Datos de la dirección inicial
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

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    /*
     * Limpiar mensajes
     */
    const limpiarMensajes = () => {
        setError("");
        setMensaje("");
    };

    /*
     * Registrar usuario
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        limpiarMensajes();

        /*
         * Validar contraseñas
         */
        if (password !== confirmarPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }



        setCargando(true);

        try {

            /*
             * Registrar usuario
             */

            const respuesta = await fetch(
                `${API_URL}/registro-cliente`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre.trim(),
                        apellidoPaterno: apellidoPaterno.trim(),
                        apellidoMaterno: apellidoMaterno.trim() || null,
                        email: email.trim().toLowerCase(),
                        password,
                        telefono: telefono.trim() || null,

                        direccion: {
                            nombreReceptor: nombreReceptor.trim(),
                            telefono: telefonoDireccion.trim() || null,
                            calle: calle.trim(),
                            numeroExterior: numeroExterior.trim(),
                            numeroInterior: numeroInterior.trim() || null,
                            colonia: colonia.trim(),
                            codigoPostal: codigoPostal.trim(),
                            municipio: municipio.trim(),
                            estado: estado.trim(),
                            pais: pais.trim(),
                            referencias: referencias.trim() || null,
                        },
                    }),
                }
            );


            const datos = await respuesta.json();

            /*
             * Comprobar respuesta
             */
            if (!respuesta.ok || !datos.success) {

                setError(
                    datos.response ||
                    "No fue posible crear la cuenta"
                );

                return;
            }

            /*
             * Mostrar mensaje
             */
            setMensaje(
                "Cuenta creada correctamente. Redirigiendo al login..."
            );

            /*
             * Ir al login
             */
            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (error) {

            console.error(
                "Error durante el registro:",
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
     * =========================================================
     * FORMULARIO DE REGISTRO
     * =========================================================
     */

    return (
        <main className="min-h-screen bg-[#FFFFFF] text-[#3E4234]">
            <section className="relative w-full">
                <div className="relative w-full max-w-2xl mx-auto">
                </div>

                {/*
                 * Espacio superior.
                 *
                 * Este espacio evita que el Navbar fijo
                 * se coloque encima del formulario.
                 */}
                <div
                    className="
                        flex justify-center
                        px-4
                        sm:px-6
                        lg:px-8
                        pt-[110px]
                        sm:pt-[120px]
                        md:pt-[125px]
                        lg:pt-24
                        xl:pt-28
                        pb-10
                        sm:pb-12
                        lg:pb-20
                    "
                >

                    <div className="relative w-full max-w-2xl">

                        <BotonRegresar />

                        {/* Tarjeta */}
                        <div
                            className="
                                bg-white
                                rounded-2xl
                                shadow-xl
                                p-5
                                sm:p-6
                                md:p-10
                            "
                        >

                            {/* Encabezado */}
                            <div className="flex items-center gap-4 mb-6">

                                <img
                                    src="/Images/ramita.png"
                                    alt="Decoración ramita"
                                    className="w-10 sm:w-12 h-10 sm:h-12 -scale-x-100"
                                />

                                <div>

                                    <h1 className="text-2xl md:text-3xl text-[#3E4234]">
                                        Registro de cliente
                                    </h1>

                                    <div className="flex items-center gap-2 mt-3">

                                        <hr className="w-16 border-t-2 border-[#6B705C]" />

                                        <span className="w-2 h-2 rounded-full bg-[#6B705C]" />

                                    </div>

                                </div>

                            </div>

                            {/* Descripción */}
                            <p className="text-[#6B705C] mb-8">
                                Completa los datos para crear tu cuenta.
                            </p>

                            {/* Formulario */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Nombre */}
                                <input
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(event) =>
                                        setNombre(event.target.value)
                                    }
                                    required
                                    disabled={cargando}
                                    autoComplete="given-name"
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-[#D6D6CF]
                                        bg-white
                                        text-[#3E4234]
                                        px-4
                                        py-3
                                        outline-none
                                        placeholder:text-[#8A8A82]
                                        focus:border-[#6B705C]
                                        disabled:bg-gray-100
                                    "
                                />

                                {/* Apellido paterno */}
                                <input
                                    id="apellidoPaterno"
                                    type="text"
                                    placeholder="Apellido paterno"
                                    value={apellidoPaterno}
                                    onChange={(event) =>
                                        setApellidoPaterno(event.target.value)
                                    }
                                    required
                                    disabled={cargando}
                                    autoComplete="family-name"
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-[#D6D6CF]
                                        bg-white
                                        text-[#3E4234]
                                        px-4
                                        py-3
                                        outline-none
                                        placeholder:text-[#8A8A82]
                                        focus:border-[#6B705C]
                                        disabled:bg-gray-100
                                    "
                                />

                                {/* Apellido materno */}
                                <input
                                    id="apellidoMaterno"
                                    type="text"
                                    placeholder="Apellido materno"
                                    value={apellidoMaterno}
                                    onChange={(event) =>
                                        setApellidoMaterno(event.target.value)
                                    }
                                    disabled={cargando}
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-[#D6D6CF]
                                        bg-white
                                        text-[#3E4234]
                                        px-4
                                        py-3
                                        outline-none
                                        placeholder:text-[#8A8A82]
                                        focus:border-[#6B705C]
                                        disabled:bg-gray-100
                                    "
                                />

                                {/* Correo */}
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                    disabled={cargando}
                                    autoComplete="email"
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-[#D6D6CF]
                                        bg-white
                                        text-[#3E4234]
                                        px-4
                                        py-3
                                        outline-none
                                        placeholder:text-[#8A8A82]
                                        focus:border-[#6B705C]
                                        disabled:bg-gray-100
                                    "
                                />

                                {/* Teléfono */}
                                <input
                                    id="telefono"
                                    type="tel"
                                    placeholder="Teléfono"
                                    value={telefono}
                                    onChange={(event) =>
                                        setTelefono(event.target.value)
                                    }
                                    disabled={cargando}
                                    autoComplete="tel"
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-[#D6D6CF]
                                        bg-white
                                        text-[#3E4234]
                                        px-4
                                        py-3
                                        outline-none
                                        placeholder:text-[#8A8A82]
                                        focus:border-[#6B705C]
                                        disabled:bg-gray-100
                                    "
                                />


                                {/* Dirección inicial */}
                                <div className="pt-4 space-y-5">

                                    <h2 className="text-lg font-semibold text-[#3E4234]">
                                        Dirección de entrega
                                    </h2>

                                    {/* Nombre del receptor */}
                                    <input
                                        id="nombreReceptor"
                                        type="text"
                                        placeholder="Nombre del receptor"
                                        value={nombreReceptor}
                                        onChange={(event) =>
                                            setNombreReceptor(event.target.value)
                                        }
                                        required
                                        disabled={cargando}
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Teléfono de la dirección */}
                                    <input
                                        id="telefonoDireccion"
                                        type="tel"
                                        placeholder="Teléfono de contacto (opcional)"
                                        value={telefonoDireccion}
                                        onChange={(event) =>
                                            setTelefonoDireccion(event.target.value)
                                        }
                                        disabled={cargando}
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Calle */}
                                    <input
                                        id="calle"
                                        type="text"
                                        placeholder="Calle"
                                        value={calle}
                                        onChange={(event) =>
                                            setCalle(event.target.value)
                                        }
                                        required
                                        disabled={cargando}
                                        autoComplete="street-address"
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Número exterior */}
                                    <input
                                        id="numeroExterior"
                                        type="text"
                                        placeholder="Número exterior"
                                        value={numeroExterior}
                                        onChange={(event) =>
                                            setNumeroExterior(event.target.value)
                                        }
                                        required
                                        disabled={cargando}
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Número interior */}
                                    <input
                                        id="numeroInterior"
                                        type="text"
                                        placeholder="Número interior (opcional)"
                                        value={numeroInterior}
                                        onChange={(event) =>
                                            setNumeroInterior(event.target.value)
                                        }
                                        disabled={cargando}
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Colonia */}
                                    <input
                                        id="colonia"
                                        type="text"
                                        placeholder="Colonia"
                                        value={colonia}
                                        onChange={(event) =>
                                            setColonia(event.target.value)
                                        }
                                        required
                                        disabled={cargando}
                                        autoComplete="address-level3"
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Código postal */}
                                    <input
                                        id="codigoPostal"
                                        type="text"
                                        placeholder="Código postal"
                                        value={codigoPostal}
                                        onChange={(event) =>
                                            setCodigoPostal(event.target.value)
                                        }
                                        required
                                        disabled={cargando}
                                        autoComplete="postal-code"
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Municipio */}
                                    <input
                                        id="municipio"
                                        type="text"
                                        placeholder="Municipio"
                                        value={municipio}
                                        onChange={(event) =>
                                            setMunicipio(event.target.value)
                                        }
                                        required
                                        disabled={cargando}
                                        autoComplete="address-level2"
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Estado */}
                                    <input
                                        id="estado"
                                        type="text"
                                        placeholder="Estado"
                                        value={estado}
                                        onChange={(event) =>
                                            setEstado(event.target.value)
                                        }
                                        required
                                        disabled={cargando}
                                        autoComplete="address-level1"
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* País */}
                                    <input
                                        id="pais"
                                        type="text"
                                        placeholder="País"
                                        value={pais}
                                        onChange={(event) =>
                                            setPais(event.target.value)
                                        }
                                        disabled={cargando}
                                        autoComplete="country-name"
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100"
                                    />

                                    {/* Referencias */}
                                    <textarea
                                        id="referencias"
                                        placeholder="Referencias adicionales (opcional)"
                                        value={referencias}
                                        onChange={(event) =>
                                            setReferencias(event.target.value)
                                        }
                                        disabled={cargando}
                                        rows={3}
                                        className="w-full rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] px-4 py-3 outline-none placeholder:text-[#8A8A82] focus:border-[#6B705C] disabled:bg-gray-100 resize-y"
                                    />

                                </div>


                                {/* Contraseña */}
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                    disabled={cargando}
                                    autoComplete="new-password"
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-[#D6D6CF]
                                        bg-white
                                        text-[#3E4234]
                                        px-4
                                        py-3
                                        outline-none
                                        placeholder:text-[#8A8A82]
                                        focus:border-[#6B705C]
                                        disabled:bg-gray-100
                                    "
                                />

                                {/* Confirmar contraseña */}
                                <input
                                    id="confirmarPassword"
                                    type="password"
                                    placeholder="Confirmar contraseña"
                                    value={confirmarPassword}
                                    onChange={(event) =>
                                        setConfirmarPassword(event.target.value)
                                    }
                                    required
                                    disabled={cargando}
                                    autoComplete="new-password"
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-[#D6D6CF]
                                        bg-white
                                        text-[#3E4234]
                                        px-4
                                        py-3
                                        outline-none
                                        placeholder:text-[#8A8A82]
                                        focus:border-[#6B705C]
                                        disabled:bg-gray-100
                                    "
                                />

                                {/* Error */}
                                {error && (
                                    <div
                                        className="
                                            rounded-md
                                            border
                                            border-red-300
                                            bg-red-50
                                            px-4
                                            py-3
                                            text-sm
                                            text-red-700
                                        "
                                    >
                                        {error}
                                    </div>
                                )}

                                {/* Éxito */}
                                {mensaje && (
                                    <div
                                        className="
                                            rounded-md
                                            border
                                            border-green-300
                                            bg-green-50
                                            px-4
                                            py-3
                                            text-sm
                                            text-green-700
                                        "
                                    >
                                        {mensaje}
                                    </div>
                                )}

                                {/* Botones */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                                    <button
                                        type="submit"
                                        disabled={cargando}
                                        className="
                                            w-full
                                            sm:w-auto
                                            bg-[#6B705C]
                                            hover:bg-[#5C614E]
                                            transition
                                            text-white
                                            uppercase
                                            tracking-wider
                                            px-8
                                            h-[50px]
                                            rounded-md
                                            cursor-pointer
                                            disabled:opacity-60
                                            disabled:cursor-not-allowed
                                        "
                                    >
                                        {cargando
                                            ? "Creando cuenta..."
                                            : "Crear cuenta"}
                                    </button>

                                </div>

                            </form>

                            {/* Regresar al login */}
                            <div className="text-center mt-8 text-sm text-[#6B705C]">

                                <span>
                                    ¿Ya tienes una cuenta?{" "}
                                </span>

                                <Link
                                    href="/login"
                                    className="
                                        font-semibold
                                        text-[#3E4234]
                                        hover:text-[#6B705C]
                                        transition-colors
                                    "
                                >
                                    Inicia sesión
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}