"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarAdministrador from "../components/SidebarAdministrador";
import ModalActualizarUsuario from "../components/ModalActualizarUsuario";
import ModalEliminarUsuario from "../components/ModalEliminarUsuario";

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
    usa_2fa: boolean;
    fecha_registro: string;
    ultimo_acceso: string | null;
    intentos_fallidos: number;
    bloqueado_hasta: string | null;
    fecha_actualizacion: string;
    roles: Rol[];
}

export default function UsuariosPage() {

    const router = useRouter();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [usuarioEditar, setUsuarioEditar] =
        useState<Usuario | null>(null);

    const [usuarioEliminar, setUsuarioEliminar] =
        useState<Usuario | null>(null);

    const [roles, setRoles] = useState<Rol[]>([]);

    const [mensaje, setMensaje] = useState("");

    const [busqueda, setBusqueda] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;


    const obtenerUsuarios = async (termino = "") => {
        try {
            setCargando(true);
            setError("");

            const url = termino.trim()
                ? `${API_URL}/usuarios/buscar?q=${encodeURIComponent(termino.trim())}`
                : `${API_URL}/usuarios`;

            const respuesta = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {
                throw new Error(
                    datos.response ||
                    "No se pudieron obtener los usuarios"
                );
            }

            setUsuarios(datos.usuarios);

        } catch (error) {
            console.error(
                "Error al obtener usuarios:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Error al obtener los usuarios"
            );

        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {

        const obtenerRoles = async () => {

            try {

                const respuesta = await fetch(
                    `${API_URL}/roles`
                );

                const datos = await respuesta.json();

                if (!respuesta.ok || !datos.success) {
                    throw new Error(
                        datos.response ||
                        "No se pudieron obtener los roles"
                    );
                }

                /*
                 * Excluir CLIENTE del formulario
                 * administrativo.
                 */
                const rolesAdministrativos = datos.roles.filter(
                    (rol: Rol) => rol.idRol !== 5
                );

                setRoles(rolesAdministrativos);

            } catch (error) {

                console.error(
                    "Error al obtener los roles:",
                    error
                );

            }
        };

        obtenerUsuarios();
        obtenerRoles();

    }, [API_URL]);

    return (
        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-8 sm:pb-12">

            <div className="flex flex-col md:flex-row gap-8 md:gap-0">

                {/* =====================================================
                    SIDEBAR
                ====================================================== */}

                <SidebarAdministrador />

                {/* =====================================================
                    CONTENIDO ORIGINAL
                ====================================================== */}

                <div className="flex-1 min-w-0 w-full">

                    <div className="w-full max-w-7xl mx-auto">

                        {/* Título */}
                        <div className="mb-8">

                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Usuarios
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Administración de usuarios.
                            </p>

                        </div>


                        {/* Contenedor */}
                        <div className="bg-white rounded-lg shadow-md border border-[#D6D6CF] overflow-hidden">


                            {/* Encabezado */}
                            <div className="bg-[#E7E7E5] px-6 py-5 border-b border-[#D6D6CF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    Lista de usuarios
                                </h2>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                                    {/* Buscador */}
                                    <input
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => {
                                            const termino = e.target.value;
                                            setBusqueda(termino);
                                            obtenerUsuarios(termino);
                                        }}
                                        placeholder="Buscar..."
                                        className="w-full sm:w-[264px] px-4 py-3 text-sm rounded border border-[#D6D6CF] bg-white text-[#3E4234] focus:outline-none focus:ring-2 focus:ring-[#6B705C]"
                                    />

                                    {/* Botón de búsqueda */}
                                    <button
                                        type="button"
                                        onClick={() => obtenerUsuarios(busqueda)}
                                        aria-label="Buscar usuarios"
                                        className="flex items-center justify-center text-[#6B705C] hover:text-[#3E4234] transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.35-4.35" />
                                        </svg>
                                    </button>

                                    {/* Nuevo usuario */}
                                    <button
                                        type="button"
                                        onClick={() => router.push("/registroUsuario")}
                                        className="px-4 py-3 text-sm font-medium rounded bg-[#6B705C] text-white hover:bg-[#5B604E] transition-colors whitespace-nowrap"
                                    >
                                        Nuevo usuario
                                    </button>

                                </div>

                            </div>

                            {/* Contenido */}
                            <div className="p-6">

                                {cargando && (
                                    <p className="text-gray-600">
                                        Cargando usuarios...
                                    </p>
                                )}

                                {!cargando && error && (
                                    <p className="text-red-600">
                                        {error}
                                    </p>
                                )}

                                {!cargando && !error && usuarios.length === 0 && (
                                    <p className="text-gray-600">
                                        {busqueda.trim()
                                            ? "No se encontraron usuarios con ese término."
                                            : "No hay usuarios registrados."}
                                    </p>
                                )}

                                {!cargando && !error && usuarios.length > 0 && (

                                    <div className="overflow-x-auto">

                                        <table className="w-full text-sm">

                                            <thead>

                                                <tr className="border-b border-[#D6D6CF]">

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        ID
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Nombre
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Correo
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Teléfono
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Rol
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Estado
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Acciones
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {usuarios.map((usuario) => (

                                                    <tr key={usuario.id_usuario}
                                                        className="border-b border-[#E5E5E5] hover:bg-[#F8F8F7]">

                                                        <td className="px-4 py-4 text-gray-700">
                                                            {usuario.id_usuario}
                                                        </td>

                                                        <td className="px-4 py-4 text-[#3E4234]">

                                                            <div className="font-medium">
                                                                {usuario.nombre}{" "}
                                                                {usuario.apellido_paterno}
                                                            </div>

                                                            {usuario.apellido_materno && (
                                                                <div className="text-xs text-gray-500">
                                                                    {usuario.apellido_materno}
                                                                </div>
                                                            )}

                                                        </td>

                                                        <td className="px-4 py-4 text-gray-700">
                                                            {usuario.email}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-700">
                                                            {usuario.telefono || "No proporcionado"}
                                                        </td>

                                                        <td className="px-4 py-4">

                                                            {usuario.roles.length > 0 ? (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {usuario.roles.map((rol) => (
                                                                        <span key={rol.idRol} className="px-2 py-1 text-xs rounded bg-[#E7E7E5] text-[#3E4234]">
                                                                            {rol.nombreRol}
                                                                        </span>
                                                                    ))}
                                                                </div>

                                                            ) : (
                                                                <span className="text-gray-500">
                                                                    Sin rol
                                                                </span>
                                                            )}

                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span className={usuario.activo ? "text-[#6B705C] font-medium" : "text-gray-500 font-medium"}>
                                                                {usuario.activo ? "Activo" : "Inactivo"}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4">

                                                            <div className="flex items-center gap-2">

                                                                {/* Ver 
                                                                <button
                                                                    type="button"
                                                                    className="
                                                                        px-3
                                                                        py-1.5
                                                                        text-xs
                                                                        font-medium
                                                                        rounded
                                                                        border
                                                                        border-[#D6D6CF]
                                                                        text-[#3E4234]
                                                                        hover:bg-[#F1F1EF]
                                                                        transition-colors
                                                                    "
                                                                >
                                                                    Ver
                                                                </button>

                                                                {/* Editar */}
                                                                <button type="button" onClick={() => { setUsuarioEditar(usuario); }}
                                                                    className="px-3 py-1.5 text-xs font-medium rounded bg-[#6B705C] text-white hover:bg-[#5B604E] transition-colors">
                                                                    Editar
                                                                </button>

                                                                {/* Eliminar */}
                                                                <button type="button" onClick={() => setUsuarioEliminar(usuario)}
                                                                    className="px-3 py-1.5 text-xs font-medium rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                                                                    Eliminar
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                ))}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
    MODAL ACTUALIZAR USUARIO
====================================================== */}

            {usuarioEditar && (
                <ModalActualizarUsuario
                    usuario={usuarioEditar}
                    roles={roles}
                    onCerrar={() => {
                        setUsuarioEditar(null);
                    }}
                    onActualizado={() => {
                        obtenerUsuarios();
                    }}
                />
            )}

            {/* =====================================================
    MODAL ELIMINAR USUARIO
====================================================== */}

            {usuarioEliminar && (
                <ModalEliminarUsuario
                    usuario={usuarioEliminar}
                    onCerrar={() => {
                        setUsuarioEliminar(null);
                    }}
                    onEliminado={() => {
                        setUsuarios((usuariosActuales) =>
                            usuariosActuales.filter(
                                (usuario) =>
                                    usuario.id_usuario !==
                                    usuarioEliminar.id_usuario
                            )
                        );

                        setMensaje("Usuario eliminado correctamente.");

                        setTimeout(() => {
                            setMensaje("");
                        }, 1500);
                    }}
                />
            )}

        </main>
    );
}