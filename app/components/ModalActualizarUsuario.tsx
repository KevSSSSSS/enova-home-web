"use client";

import { useEffect, useState } from "react";

interface Rol {
    idRol: number;
    nombreRol: string;
}

interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string | null;
    email: string;
    telefono: string | null;
    activo: boolean;
    roles: Rol[];
}

interface ModalActualizarUsuarioProps {
    usuario: Usuario;
    roles: Rol[];
    onCerrar: () => void;
    onActualizado: () => void;
}

/*
 * Validar nombres y apellidos
 */
const validarNombreCompleto = (valor: string): boolean => {
    const textoLimpio = valor.trim().replace(/\s+/g, " ");

    if (!textoLimpio) {
        return false;
    }

    const formatoValido =
        /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

    if (!formatoValido.test(textoLimpio)) {
        return false;
    }

    const particulasPermitidas = [
        "de",
        "la",
        "y",
        "van",
        "von",
        "da",
        "do",
        "dos",
        "di",
        "el"
    ];

    const palabras = textoLimpio.split(/[ '-]/);

    return palabras.every((palabra) =>
        palabra.length >= 3 ||
        particulasPermitidas.includes(
            palabra.toLowerCase()
        )
    );
};

export default function ModalActualizarUsuario({
    usuario,
    roles,
    onCerrar,
    onActualizado,
}: ModalActualizarUsuarioProps) {

    const [usuarioEditar, setUsuarioEditar] =
        useState<Usuario>(usuario);

    const [rolesSeleccionados, setRolesSeleccionados] =
        useState<number[]>(
            usuario.roles.map((rol) => rol.idRol)
        );

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        setUsuarioEditar(usuario);

        setRolesSeleccionados(
            usuario.roles.map((rol) => rol.idRol)
        );

        setMensaje("");
        setError("");
    }, [usuario]);

    const actualizarUsuario = async () => {

            /*
     * Validar nombre
     */
    if (!validarNombreCompleto(usuarioEditar.nombre)) {
        setError("El nombre no es válido. Cada palabra debe tener al menos 3 letras.");
        return;
    }

    /*
     * Validar apellido paterno
     */
    if (!validarNombreCompleto(usuarioEditar.apellido_paterno)) {
        setError("El apellido paterno no es válido. Cada palabra debe tener al menos 3 letras.");
        return;
    }

    /*
     * Validar apellido materno si fue proporcionado
     */
    if (
        usuarioEditar.apellido_materno &&
        !validarNombreCompleto(usuarioEditar.apellido_materno)
    ) {
        setError("El apellido materno no es válido. Cada palabra debe tener al menos 3 letras.");
        return;
    }

    /*
     * Validar teléfono si fue proporcionado
     */
    if (
        usuarioEditar.telefono &&
        !/^\d{10}$/.test(usuarioEditar.telefono.trim())
    ) {
        setError("El teléfono debe contener exactamente 10 dígitos.");
        return;
    }


    try {
        setError("");
        setMensaje("");
        setCargando(true);

        const respuesta = await fetch(
            `${API_URL}/usuarios/${usuarioEditar.id_usuario}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: usuarioEditar.nombre,
                    apellidoPaterno: usuarioEditar.apellido_paterno,
                    apellidoMaterno: usuarioEditar.apellido_materno,
                    email: usuarioEditar.email,
                    telefono: usuarioEditar.telefono,
                    activo: usuarioEditar.activo,
                    roles: rolesSeleccionados,
                }),
            }
        );

        const datos = await respuesta.json();

if (!respuesta.ok || !datos.success) {
    setError(
        datos.mensaje ||
        datos.response ||
        "No fue posible actualizar el usuario"
    );
    return;
}

        /*
         * Avisar a usuarios/page.tsx que la actualización
         * terminó correctamente.
         */
        onActualizado();

        /*
         * Mostrar mensaje de éxito
         */
        setMensaje(
            "Usuario actualizado correctamente."
        );

        /*
         * Cerrar el modal después del mensaje
         */
        setTimeout(() => {
            onCerrar();
        }, 1500);

    } catch (error) {

        console.error(
            "Error al actualizar usuario:",
            error
        );

        setError(
            "No fue posible conectar con el servidor."
        );

    } finally {

        setCargando(false);

    }
};

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

        {/* Contenedor */}
        <div
            className="
                w-full
                max-w-2xl
                max-h-[90vh]
                overflow-y-auto
                bg-white
                rounded-xl
                shadow-2xl
                border
                border-[#D6D6CF]
            "
        >

            {/* Encabezado */}
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
                "
            >

                <div>
                    <h2 className="text-xl font-semibold text-[#3E4234]">
                        Actualizar usuario
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        ID: {usuarioEditar.id_usuario}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCerrar}
                    className="
                        w-9
                        h-9
                        flex
                        items-center
                        justify-center
                        rounded-full
                        text-[#3E4234]
                        hover:bg-white
                        transition-colors
                        cursor-pointer
                    "
                >
                    ✕
                </button>

            </div>

            {/* Formulario */}
            <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Nombre */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Nombre
                        </label>

                        <input
                            type="text"
                            value={usuarioEditar.nombre}
                            onChange={(event) =>
                                setUsuarioEditar({
                                    ...usuarioEditar,
                                    nombre: event.target.value
                                })
                            }
                            className="w-full px-4 py-3 rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"
                        />
                    </div>

                    {/* Apellido paterno */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Apellido paterno
                        </label>

                        <input
                            type="text"
                            value={usuarioEditar.apellido_paterno}
                            onChange={(event) =>
                                setUsuarioEditar({
                                    ...usuarioEditar,
                                    apellido_paterno: event.target.value
                                })
                            }
                            className="w-full px-4 py-3 rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"
                        />
                    </div>

                    {/* Apellido materno */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Apellido materno
                        </label>

                        <input
                            type="text"
                            value={usuarioEditar.apellido_materno || ""}
                            onChange={(event) =>
                                setUsuarioEditar({
                                    ...usuarioEditar,
                                    apellido_materno: event.target.value
                                })
                            }
                            className="w-full px-4 py-3 rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"
                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={usuarioEditar.email}
                            onChange={(event) =>
                                setUsuarioEditar({
                                    ...usuarioEditar,
                                    email: event.target.value
                                })
                            }
                            className="w-full px-4 py-3 rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Teléfono
                        </label>

                        <input
                            type="tel"
                            value={usuarioEditar.telefono || ""}
                            onChange={(event) =>
                                setUsuarioEditar({
                                    ...usuarioEditar,
                                    telefono: event.target.value
                                })
                            }
                            className="w-full px-4 py-3 rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"
                        />
                    </div>

                    {/* Estado */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Estado
                        </label>

                        <select
                            value={usuarioEditar.activo ? "activo" : "inactivo"}
                            onChange={(event) =>
                                setUsuarioEditar({
                                    ...usuarioEditar,
                                    activo: event.target.value === "activo"
                                })
                            }
                            className="w-full px-4 py-3 rounded-md border border-[#D6D6CF] bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>

                    {/* Roles */}
                    <div className="md:col-span-2">

                        <label className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Roles
                        </label>

                        <div className="w-full rounded-md border border-[#D6D6CF] bg-white p-3 space-y-2">

                            {roles.map((rol) => (
                                <label
                                    key={rol.idRol}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2
                                        rounded-md
                                        cursor-pointer
                                        hover:bg-[#E7E7E5]
                                        transition-colors
                                    "
                                >

                                    <input
                                        type="checkbox"
                                        checked={rolesSeleccionados.includes(rol.idRol)}
                                        onChange={(event) => {

                                            if (event.target.checked) {

                                                setRolesSeleccionados((rolesActuales) => [
                                                    ...rolesActuales,
                                                    rol.idRol
                                                ]);

                                            } else {

                                                setRolesSeleccionados((rolesActuales) =>
                                                    rolesActuales.filter(
                                                        (idRol) => idRol !== rol.idRol
                                                    )
                                                );

                                            }

                                        }}
                                        className="w-4 h-4 accent-[#6B705C] cursor-pointer"
                                    />

                                    <span className="text-sm text-[#3E4234]">
                                        {rol.nombreRol}
                                    </span>

                                </label>
                            ))}

                        </div>

                    </div>

                </div>

                {/* Mensajes */}
                {error && (
                    <div className="mt-5 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {mensaje && (
                    <div className="mt-5 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {mensaje}
                    </div>
                )}

                {/* Botones */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">

                    <button
                        type="button"
                        onClick={onCerrar}
                        className="px-5 py-2.5 rounded-md border border-[#D6D6CF] text-[#3E4234] hover:bg-[#F1F1EF] transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={actualizarUsuario}
                        disabled={cargando}
                        className="px-5 py-2.5 rounded-md bg-[#6B705C] text-white hover:bg-[#5B604E] transition-colors cursor-pointer disabled:opacity-60"
                    >
                        Guardar cambios
                    </button>

                </div>

            </div>

        </div>

    </div>
);
}