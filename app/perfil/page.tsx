"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
/*import SidebarCliente from "../components/SidebarCliente";*/
import SidebarAdministrador from "../components/SidebarAdministrador";

export default function PerfilPage() {

    const router = useRouter();

    const {
        usuario,
        rol,
        autenticado,
    } = useAuth();

    /*
     * Mientras AuthContext carga la información
     * almacenada en localStorage.
     */
    if (!autenticado || !usuario) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#3E4234]">
                        No hay una sesión activa
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Inicia sesión para consultar tu perfil.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-4 sm:px-6 pt-32 pb-8 sm:pb-12">

            <div className="flex flex-col md:flex-row  gap-8 md:gap-0">

                {/* =====================================================
                    SIDEBAR
                ====================================================== */}

                {/*<SidebarCliente />*/}
                <SidebarAdministrador />

                {/* =====================================================
                    CONTENIDO ORIGINAL
                ====================================================== */}

                <div className="flex-1 min-w-0 w-full">

                    <div className="w-full max-w-3xl mx-auto">

                        {/* Título */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-[#3E4234]">
                                Mi Cuenta
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Información de tu cuenta.
                            </p>
                        </div>

                        {/* Información del usuario */}
                        <div className="bg-white rounded-lg shadow-md border border-[#D6D6CF] overflow-hidden">

                            {/* Encabezado */}
                            <div className="bg-[#E7E7E5] px-6 py-5 border-b border-[#D6D6CF]">
                                <h2 className="text-xl font-semibold text-[#3E4234]">
                                    Información personal
                                </h2>
                            </div>

                            {/* Datos */}
                            <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-5">

                                {/* Nombre */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Nombre
                                    </p>

                                    <p className="mt-1 text-base text-[#3E4234]">
                                        {usuario.nombre}
                                    </p>
                                </div>

                                {/* Apellido paterno */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Apellido paterno
                                    </p>

                                    <p className="mt-1 text-base text-[#3E4234]">
                                        {usuario.apellidoPaterno}
                                    </p>
                                </div>

                                {/* Apellido materno */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Apellido materno
                                    </p>

                                    <p className="mt-1 text-base text-[#3E4234]">
                                        {usuario.apellidoMaterno || "No proporcionado"}
                                    </p>
                                </div>


                                {/* Correo */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Correo electrónico
                                    </p>

                                    <p className="mt-1 text-base text-[#3E4234]">
                                        {usuario.email}
                                    </p>
                                </div>


                                {/* Estado 2FA */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Autenticación de dos factores
                                    </p>

                                    <p className="mt-1 text-base text-[#3E4234]">
                                        {usuario.usa2FA
                                            ? "Activada"
                                            : "Desactivada"}
                                    </p>
                                </div>

                                {/* Rol */}
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Rol
                                    </p>

                                    <p className="mt-1 text-base font-semibold text-[#6B705C]">
                                        {rol?.nombre_rol || "Sin rol asignado"}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}