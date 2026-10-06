"use client";

import { useEffect, useState } from "react";
import SidebarAdministrador from "../components/SidebarAdministrador";

/*
 * ============================================================
 * INTERFACES
 * ============================================================
 */

interface Permiso {
    idPermiso: number;
    nombrePermiso: string;
    modulo: string;
    accion: string;
    descripcion: string | null;
    activo: boolean;
}

interface Rol {
    idRol: number;
    nombreRol: string;
    descripcion: string | null;
    activo: boolean;
    permisos: Permiso[];
}


/*
 * ============================================================
 * COMPONENTE
 * ============================================================
 */

export default function CrudRolesPermisosPage() {

    const API_URL =
        process.env.NEXT_PUBLIC_API_URL;


    /*
     * ========================================================
     * ESTADOS
     * ========================================================
     */

    const [roles, setRoles] =
        useState<Rol[]>([]);

    const [permisos, setPermisos] =
        useState<Permiso[]>([]);

    const [cargando, setCargando] =
        useState(true);

    const [procesando, setProcesando] =
        useState(false);

    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");


    /*
     * ========================================================
     * MODAL CREAR
     * ========================================================
     */

    const [modalCrearRol, setModalCrearRol] =
        useState(false);

    const [nombreRolNuevo, setNombreRolNuevo] =
        useState("");

    const [descripcionRolNueva, setDescripcionRolNueva] =
        useState("");


    /*
     * ========================================================
     * MODAL EDITAR
     * ========================================================
     */

    const [rolEditar, setRolEditar] =
        useState<Rol | null>(null);

    const [nombreRolEditar, setNombreRolEditar] =
        useState("");

    const [descripcionRolEditar, setDescripcionRolEditar] =
        useState("");

    const [activoRolEditar, setActivoRolEditar] =
        useState(true);


    /*
     * ========================================================
     * MODAL ELIMINAR
     * ========================================================
     */

    const [rolEliminar, setRolEliminar] =
        useState<Rol | null>(null);


    /*
     * ========================================================
     * MODAL PERMISOS
     * ========================================================
     */

    const [rolPermisos, setRolPermisos] =
        useState<Rol | null>(null);


    /*
     * ========================================================
     * NORMALIZAR PERMISO
     * ========================================================
     */

    const normalizarPermiso = (
        permiso: any
    ): Permiso => {

        return {
            idPermiso:
                permiso.idPermiso ??
                permiso.id_permiso,

            nombrePermiso:
                permiso.nombrePermiso ??
                permiso.nombre_permiso,

            modulo:
                permiso.modulo ?? "",

            accion:
                permiso.accion ?? "",

            descripcion:
                permiso.descripcion ??
                permiso.descripcion_permiso ??
                null,

            activo:
                permiso.activo ??
                permiso.permiso_activo ??
                true,
        };
    };


    /*
     * ========================================================
     * NORMALIZAR ROL
     * ========================================================
     */

    const normalizarRol = (
        rol: any
    ): Rol => {

        return {
            idRol:
                rol.idRol ??
                rol.id_rol,

            nombreRol:
                rol.nombreRol ??
                rol.nombre_rol,

            descripcion:
                rol.descripcion ??
                rol.descripcion_rol ??
                null,

            activo:
                rol.activo ??
                rol.rol_activo ??
                true,

            permisos:
                Array.isArray(rol.permisos)
                    ? rol.permisos.map(
                        normalizarPermiso
                    )
                    : [],
        };
    };


    /*
     * ========================================================
     * MENSAJE
     * ========================================================
     */

    const mostrarMensaje = (
        texto: string
    ) => {

        setMensaje(texto);

        setTimeout(() => {
            setMensaje("");
        }, 2500);
    };


    /*
     * ========================================================
     * OBTENER ROLES
     * ========================================================
     */

    const obtenerRoles = async () => {

        const respuesta =
            await fetch(
                `${API_URL}/roles`
            );

        const datos =
            await respuesta.json();

        if (
            !respuesta.ok ||
            !datos.success
        ) {

            throw new Error(
                datos.response ||
                "No se pudieron obtener los roles"
            );
        }

        /*
         * El endpoint GET /roles devuelve la información
         * básica de los roles, pero puede no incluir los
         * permisos asignados a cada uno.
         *
         * Por eso obtenemos el detalle de cada rol mediante
         * GET /roles/:idRol para recuperar sus permisos.
         */
        const rolesBase: Rol[] =
            Array.isArray(datos.roles)
                ? datos.roles.map(
                    normalizarRol
                )
                : [];

        const rolesCompletos =
            await Promise.all(
                rolesBase.map(
                    async (rol) => {

                        try {

                            const respuestaDetalle =
                                await fetch(
                                    `${API_URL}/roles/${rol.idRol}`
                                );

                            const datosDetalle =
                                await respuestaDetalle.json();

                            if (
                                respuestaDetalle.ok &&
                                datosDetalle.success &&
                                datosDetalle.rol
                            ) {

                                return normalizarRol(
                                    datosDetalle.rol
                                );
                            }

                        } catch (error) {

                            console.error(
                                `Error al obtener permisos del rol ${rol.idRol}:`,
                                error
                            );
                        }

                        /*
                         * Si por alguna razón no se puede
                         * obtener el detalle, conservamos
                         * el rol que ya obtuvimos.
                         */
                        return rol;
                    }
                )
            );

        setRoles(
            rolesCompletos
                .filter((rol) => rol.activo)
                .sort(
                    (a, b) =>
                        a.idRol - b.idRol
                )
        );
    };


    /*
     * ========================================================
     * OBTENER PERMISOS
     * ========================================================
     */

    const obtenerPermisos = async () => {

        const respuesta =
            await fetch(
                `${API_URL}/permisos`
            );

        const datos =
            await respuesta.json();

        if (
            !respuesta.ok ||
            !datos.success
        ) {

            throw new Error(
                datos.response ||
                "No se pudieron obtener los permisos"
            );
        }

        setPermisos(
            Array.isArray(datos.permisos)
                ? datos.permisos.map(
                    normalizarPermiso
                )
                : []
        );
    };


    /*
     * ========================================================
     * CARGAR DATOS
     * ========================================================
     */

    const cargarDatos = async () => {

        try {

            setCargando(true);
            setError("");

            await Promise.all([
                obtenerRoles(),
                obtenerPermisos(),
            ]);

        } catch (error) {

            console.error(
                "Error al cargar Roles y Permisos:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No fue posible cargar la información"
            );

        } finally {

            setCargando(false);
        }
    };


    /*
     * ========================================================
     * CARGA INICIAL
     * ========================================================
     */

    useEffect(() => {

        cargarDatos();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API_URL]);


    /*
     * ========================================================
     * CREAR ROL
     * ========================================================
     */

    const crearRol = async () => {

        if (
            nombreRolNuevo.trim() === ""
        ) {

            setError(
                "El nombre del rol es obligatorio."
            );

            return;
        }

        try {

            setProcesando(true);
            setError("");

            const respuesta =
                await fetch(
                    `${API_URL}/roles`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            nombreRol:
                                nombreRolNuevo.trim(),

                            descripcion:
                                descripcionRolNueva.trim(),
                        }),
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
                    "No fue posible crear el rol"
                );
            }

            setModalCrearRol(false);

            setNombreRolNuevo("");
            setDescripcionRolNueva("");

            await obtenerRoles();

            mostrarMensaje(
                "Rol creado correctamente."
            );

        } catch (error) {

            console.error(
                "Error al crear rol:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No fue posible crear el rol"
            );

        } finally {

            setProcesando(false);
        }
    };


    /*
     * ========================================================
     * ABRIR EDITAR
     * ========================================================
     */

    const abrirEditarRol = (
        rol: Rol
    ) => {

        setRolEditar(rol);

        setNombreRolEditar(
            rol.nombreRol
        );

        setDescripcionRolEditar(
            rol.descripcion || ""
        );

        setActivoRolEditar(
            rol.activo
        );
    };


    /*
     * ========================================================
     * ACTUALIZAR ROL
     * ========================================================
     */

    const actualizarRol = async () => {

        if (!rolEditar) {
            return;
        }

        if (
            nombreRolEditar.trim() === ""
        ) {

            setError(
                "El nombre del rol es obligatorio."
            );

            return;
        }

        try {

            setProcesando(true);
            setError("");

            const respuesta =
                await fetch(
                    `${API_URL}/roles/${rolEditar.idRol}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            nombreRol:
                                nombreRolEditar.trim(),

                            descripcion:
                                descripcionRolEditar.trim(),

                            activo:
                                activoRolEditar,
                        }),
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
                    "No fue posible actualizar el rol"
                );
            }

            setRolEditar(null);

            await obtenerRoles();

            mostrarMensaje(
                "Rol actualizado correctamente."
            );

        } catch (error) {

            console.error(
                "Error al actualizar rol:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No fue posible actualizar el rol"
            );

        } finally {

            setProcesando(false);
        }
    };


    /*
     * ========================================================
     * ELIMINAR ROL
     * ========================================================
     */

    const eliminarRol = async () => {

        if (!rolEliminar) {
            return;
        }

        try {

            setProcesando(true);
            setError("");

            const respuesta =
                await fetch(
                    `${API_URL}/roles/${rolEliminar.idRol}`,
                    {
                        method: "DELETE",
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
                    "No fue posible eliminar el rol"
                );
            }

            setRolEliminar(null);

            await obtenerRoles();

            mostrarMensaje(
                "Rol eliminado correctamente."
            );

        } catch (error) {

            console.error(
                "Error al eliminar rol:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No fue posible eliminar el rol"
            );

        } finally {

            setProcesando(false);
        }
    };


    /*
     * ========================================================
     * OBTENER ROL INDIVIDUAL
     * ========================================================
     */

    const obtenerRolIndividual = async (
        idRol: number
    ): Promise<Rol> => {

        const respuesta =
            await fetch(
                `${API_URL}/roles/${idRol}`
            );

        const datos =
            await respuesta.json();

        if (
            !respuesta.ok ||
            !datos.success
        ) {

            throw new Error(
                datos.response ||
                "No se pudo obtener el rol"
            );
        }

        return normalizarRol(
            datos.rol
        );
    };


    /*
     * ========================================================
     * VERIFICAR PERMISO
     * ========================================================
     */

    const rolTienePermiso = (
        rol: Rol,
        idPermiso: number
    ) => {

        return rol.permisos.some(
            (permiso) =>
                permiso.idPermiso ===
                idPermiso
        );
    };


    /*
     * ========================================================
     * ASIGNAR PERMISO
     * ========================================================
     */

    const asignarPermiso = async (
        rol: Rol,
        permiso: Permiso
    ) => {

        try {

            setProcesando(true);
            setError("");

            const respuesta =
                await fetch(
                    `${API_URL}/roles/${rol.idRol}/permisos`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            idPermiso:
                                permiso.idPermiso,
                        }),
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
                    "No fue posible asignar el permiso"
                );
            }

            await obtenerRoles();

            const rolActualizado =
                await obtenerRolIndividual(
                    rol.idRol
                );

            setRolPermisos(
                rolActualizado
            );

            mostrarMensaje(
                "Permiso asignado correctamente."
            );

        } catch (error) {

            console.error(
                "Error al asignar permiso:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No fue posible asignar el permiso"
            );

        } finally {

            setProcesando(false);
        }
    };


    /*
     * ========================================================
     * QUITAR PERMISO
     * ========================================================
     */

    const quitarPermiso = async (
        rol: Rol,
        permiso: Permiso
    ) => {

        try {

            setProcesando(true);
            setError("");

            const respuesta =
                await fetch(
                    `${API_URL}/roles/${rol.idRol}/permisos/${permiso.idPermiso}`,
                    {
                        method: "DELETE",
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
                    "No fue posible quitar el permiso"
                );
            }

            await obtenerRoles();

            const rolActualizado =
                await obtenerRolIndividual(
                    rol.idRol
                );

            setRolPermisos(
                rolActualizado
            );

            mostrarMensaje(
                "Permiso removido correctamente."
            );

        } catch (error) {

            console.error(
                "Error al quitar permiso:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "No fue posible quitar el permiso"
            );

        } finally {

            setProcesando(false);
        }
    };


    /*
     * ========================================================
     * RENDER
     * ========================================================
     */

    return (

        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-8 sm:pb-12">

            <div className="flex flex-col md:flex-row gap-8 md:gap-0">

                <SidebarAdministrador />


                <div className="flex-1 min-w-0 w-full">

                    <div className="w-full max-w-7xl mx-auto">

                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Roles y Permisos
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Administración de roles y permisos.
                            </p>
                        </div>

                        {mensaje && (
                            <div className="mb-5 px-4 py-3 rounded bg-[#E7E7E5] text-[#3E4234] text-sm">
                                {mensaje}
                            </div>
                        )}

                        {error && (
                            <div className="mb-5 px-4 py-3 rounded bg-red-50 text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {cargando ? (
                            <div className="bg-white rounded-lg shadow-md border border-[#D6D6CF] p-6">
                                <p className="text-gray-600">
                                    Cargando información...
                                </p>
                            </div>

                        ) : (

                            <section className="bg-white rounded-lg shadow-md border border-[#D6D6CF] overflow-hidden">

                                <div className="bg-[#E7E7E5] px-6 py-5 border-b border-[#D6D6CF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                    <div>
                                        <h2 className="text-xl font-semibold text-[#3E4234]">
                                            Roles y Permisos
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Administración de roles y los permisos que posee cada uno.
                                        </p>
                                    </div>

                                    <button type="button" onClick={() => setModalCrearRol(true)}
                                    className="bg-[#6B705C] hover:bg-[#5C614E] transition text-white uppercase tracking-wider text-sm px-5 py-2.5 rounded">
                                        + Nuevo Rol
                                    </button>

                                </div>


                                <div className="p-6">

                                    <div className="overflow-x-auto">

                                        <table className="w-full text-sm">

                                            <thead>

                                                <tr className="border-b border-[#D6D6CF]">

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        ID
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Rol
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234]">
                                                        Descripción
                                                    </th>

                                                    <th className="text-left px-4 py-3 font-semibold text-[#3E4234] min-w-[280px]">
                                                        Permisos
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

                                                {roles.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                                            No existen roles registrados.
                                                        </td>
                                                    </tr>

                                                ) : (

                                                    roles.map(
                                                        (rol) => (<tr key={rol.idRol} className="border-b border-[#E5E5E5] hover:bg-[#F8F8F7] align-top">
                                                                <td className="px-4 py-4 text-gray-700">
                                                                    {rol.idRol}
                                                                </td>

                                                                <td className="px-4 py-4 text-[#3E4234]">
                                                                    <span className="font-medium">
                                                                        {rol.nombreRol}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4 text-gray-700 min-w-[200px]">
                                                                    {rol.descripcion || "Sin descripción"}
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    {rol.permisos.length === 0 ? (
                                                                        <span className="text-gray-500">
                                                                            Sin permisos
                                                                        </span>

                                                                    ) : (

                                                                        <div className="flex flex-wrap gap-1.5">
                                                                            {rol.permisos.map(
                                                                                (permiso) => (
                                                                                    <span key={permiso.idPermiso} title={`${permiso.modulo} - ${permiso.accion}`}
                                                                                        className="inline-flex px-2 py-1 rounded bg-[#E7E7E5] text-[#3E4234] text-xs">
                                                                                        {permiso.nombrePermiso}
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <span className={rol.activo ? "text-[#6B705C] font-medium" : "text-gray-500 font-medium"}>
                                                                        {rol.activo ? "Activo" : "Inactivo"}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <div className="flex flex-col gap-2 min-w-[120px]">
                                                                        <button type="button" onClick={() => setRolPermisos(rol)}
                                                                        className="bg-[#6B705C] hover:bg-[#5C614E] transition text-white text-xs px-3 py-2 rounded">
                                                                            Permisos
                                                                        </button>

                                                                        <button type="button" onClick={() => abrirEditarRol(rol)}
                                                                        className="border border-[#6B705C] text-[#3E4234] hover:bg-[#F1F1EF] transition text-xs px-3 py-2 rounded">
                                                                            Editar
                                                                        </button>

                                                                        <button type="button" onClick={() => setRolEliminar(rol)}
                                                                        className="border border-red-300 text-red-600 hover:bg-red-50 transition text-xs px-3 py-2 rounded">
                                                                            Eliminar
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </section>
                        )}

                    </div>

                </div>

            </div>


            {/* ============================================================
                MODAL — CREAR ROL
            ============================================================ */}

            {modalCrearRol && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

                    <div className="bg-white w-full max-w-lg rounded-lg shadow-xl">

                        <div className="px-6 py-5 border-b border-[#D6D6CF]">

                            <h2 className="text-xl font-semibold text-[#3E4234]">
                                Nuevo Rol
                            </h2>

                        </div>

                        <div className="p-6 space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                    Nombre del Rol
                                </label>

                                <input type="text" value={nombreRolNuevo} onChange={(e) => setNombreRolNuevo(e.target.value)}
                                className="w-full border border-[#D6D6CF] px-3 py-2 rounded outline-none focus:border-[#6B705C]"/>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                    Descripción
                                </label>

                                <textarea rows={4} value={descripcionRolNueva} onChange={(e) => setDescripcionRolNueva(e.target.value)}
                                className="w-full border border-[#D6D6CF] px-3 py-2 rounded outline-none resize-none focus:border-[#6B705C]"/>
                            </div>

                        </div>

                        <div className="px-6 py-4 border-t border-[#D6D6CF] flex justify-end gap-3">

                            <button type="button" onClick={() => {setModalCrearRol(false); setError("");}} className="border border-[#D6D6CF] text-[#3E4234] px-4 py-2 rounded">
                                Cancelar
                            </button>

                            <button type="button" disabled={procesando} onClick={crearRol} className="bg-[#6B705C] hover:bg-[#5C614E] disabled:opacity-50 text-white px-4 py-2 rounded">
                                {procesando ? "Guardando..." : "Guardar"}
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* ============================================================
                MODAL — EDITAR ROL
            ============================================================ */}

            {rolEditar && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

                    <div className="bg-white w-full max-w-lg rounded-lg shadow-xl">

                        <div className="px-6 py-5 border-b border-[#D6D6CF]">

                            <h2 className="text-xl font-semibold text-[#3E4234]">
                                Editar Rol
                            </h2>

                        </div>

                        <div className="p-6 space-y-5">

                            <div>

                                <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                    Nombre del Rol
                                </label>

                                <input type="text" value={nombreRolEditar} onChange={(e) => setNombreRolEditar(e.target.value)}
                                className="w-full border border-[#D6D6CF] px-3 py-2 rounded outline-none focus:border-[#6B705C]"/>

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-[#3E4234] mb-2">
                                    Descripción
                                </label>

                                <textarea rows={4} value={descripcionRolEditar} onChange={(e) => setDescripcionRolEditar(e.target.value)}
                                className="w-full border border-[#D6D6CF] px-3 py-2 rounded outline-none resize-none focus:border-[#6B705C]"/>

                            </div>

                            <label className="flex items-center gap-2 text-sm text-[#3E4234]">

                                <input type="checkbox" checked={activoRolEditar} onChange={(e) => setActivoRolEditar(e.target.checked)} disabled={true}/>

                                Rol activo

                            </label>

                        </div>


                        <div className="px-6 py-4 border-t border-[#D6D6CF] flex justify-end gap-3">

                            <button type="button" onClick={() => {setRolEditar(null); setError(""); }} className="border border-[#D6D6CF] text-[#3E4234] px-4 py-2 rounded">
                                Cancelar
                            </button>

                            <button type="button" disabled={procesando} onClick={actualizarRol} className="bg-[#6B705C] hover:bg-[#5C614E] disabled:opacity-50 text-white px-4 py-2 rounded">
                                {procesando ? "Actualizando..." : "Actualizar"}
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* ============================================================
                MODAL — ELIMINAR ROL
            ============================================================ */}

            {rolEliminar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

                    <div className="bg-white w-full max-w-md rounded-lg shadow-xl">

                        <div className="px-6 py-5 border-b border-[#D6D6CF]">

                            <h2 className="text-xl font-semibold text-[#3E4234]">
                                Eliminar Rol
                            </h2>

                        </div>


                        <div className="p-6">

                            <p className="text-gray-700">
                                ¿Deseas eliminar el rol{" "}
                                <span className="font-semibold text-[#3E4234]">
                                    {rolEliminar.nombreRol}
                                </span>
                                ?
                            </p>

                        </div>

                        <div className="px-6 py-4 border-t border-[#D6D6CF] flex justify-end gap-3">

                            <button type="button" onClick={() => {setRolEliminar(null); setError("");}} className="border border-[#D6D6CF] text-[#3E4234] px-4 py-2 rounded">
                                Cancelar
                            </button>

                            <button type="button" disabled={procesando} onClick={eliminarRol} className="border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 px-4 py-2 rounded">
                                {procesando ? "Eliminando..." : "Eliminar"}
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* ============================================================
                MODAL — PERMISOS DEL ROL
            ============================================================ */}

            {rolPermisos && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                    flex
                    items-center
                    justify-center
                    bg-black/40
                    px-4
                ">

                    <div className="
                        bg-white
                        w-full
                        max-w-3xl
                        max-h-[90vh]
                        overflow-y-auto
                        rounded-lg
                        shadow-xl
                    ">

                        <div className="
                            px-6
                            py-5
                            border-b
                            border-[#D6D6CF]
                        ">

                            <h2 className="
                                text-xl
                                font-semibold
                                text-[#3E4234]
                            ">
                                Permisos del Rol
                            </h2>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-600
                            ">
                                {rolPermisos.nombreRol}
                            </p>

                        </div>


                        <div className="
                            p-6
                            space-y-3
                        ">

                            {permisos.length === 0 ? (

                                <p className="
                                    text-gray-500
                                    text-sm
                                ">
                                    No existen permisos registrados.
                                </p>

                            ) : (

                                permisos.map(
                                    (permiso) => {

                                        const asignado =
                                            rolTienePermiso(
                                                rolPermisos,
                                                permiso.idPermiso
                                            );

                                        return (

                                            <div
                                                key={permiso.idPermiso}
                                                className="
                                                    border
                                                    border-[#D6D6CF]
                                                    rounded
                                                    p-4
                                                    flex
                                                    flex-col
                                                    sm:flex-row
                                                    sm:items-center
                                                    sm:justify-between
                                                    gap-4
                                                "
                                            >

                                                <div>

                                                    <p className="
                                                        font-medium
                                                        text-[#3E4234]
                                                    ">
                                                        {permiso.nombrePermiso}
                                                    </p>

                                                    <p className="
                                                        mt-1
                                                        text-xs
                                                        text-gray-500
                                                    ">
                                                        {permiso.modulo}
                                                        {" · "}
                                                        {permiso.accion}
                                                    </p>

                                                    {permiso.descripcion && (

                                                        <p className="
                                                            mt-1
                                                            text-xs
                                                            text-gray-500
                                                        ">
                                                            {permiso.descripcion}
                                                        </p>

                                                    )}

                                                </div>


                                                <button
                                                    type="button"
                                                    disabled={procesando}
                                                    onClick={() =>
                                                        asignado
                                                            ? quitarPermiso(
                                                                rolPermisos,
                                                                permiso
                                                            )
                                                            : asignarPermiso(
                                                                rolPermisos,
                                                                permiso
                                                            )
                                                    }
                                                    className={
                                                        asignado
                                                            ? `
                                                                border
                                                                border-red-300
                                                                text-red-600
                                                                hover:bg-red-50
                                                                disabled:opacity-50
                                                                px-3
                                                                py-2
                                                                rounded
                                                                text-xs
                                                            `
                                                            : `
                                                                bg-[#6B705C]
                                                                hover:bg-[#5C614E]
                                                                text-white
                                                                disabled:opacity-50
                                                                px-3
                                                                py-2
                                                                rounded
                                                                text-xs
                                                            `
                                                    }
                                                >
                                                    {asignado
                                                        ? "Quitar"
                                                        : "Asignar"}
                                                </button>

                                            </div>
                                        );
                                    }
                                )
                            )}

                        </div>


                        <div className="
                            px-6
                            py-4
                            border-t
                            border-[#D6D6CF]
                            flex
                            justify-end
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    setRolPermisos(null)
                                }
                                className="
                                    border
                                    border-[#D6D6CF]
                                    text-[#3E4234]
                                    px-4
                                    py-2
                                    rounded
                                "
                            >
                                Cerrar
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}
