"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SidebarAdministrador() {

    const router = useRouter();

    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    return (
        <>
            {/* =====================================================
                BOTÓN SIDEBAR — MÓVIL
            ====================================================== */}

            <button
                type="button"
                onClick={() => setSidebarAbierto(true)}
                className="
                    fixed
                    top-[168px]
                    left-4
                    z-40
                    flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    bg-white
                    border
                    border-[#D6D6CF]
                    rounded-md
                    shadow-sm
                    text-[#3E4234]
                    md:hidden
                "
                aria-label="Abrir menú"
            >
                <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                </svg>
            </button>


            {/* =====================================================
                OVERLAY — MÓVIL
            ====================================================== */}

            {sidebarAbierto && (
                <button
                    type="button"
                    onClick={() => setSidebarAbierto(false)}
                    className="
                        fixed
                        top-[152px]
                        bottom-0
                        left-0
                        right-0
                        z-40
                        bg-black/20
                        md:hidden
                    "
                    aria-label="Cerrar menú"
                />
            )}


            {/* =====================================================
                SIDEBAR ADMINISTRADOR
            ====================================================== */}

            <aside
                className={`
                    fixed
                    top-[152px]
                    left-0
                    z-50
                    h-[calc(100vh-152px)]
                    w-[240px]
                    shrink-0
                    bg-white
                    border
                    border-[#D6D6CF]
                    overflow-y-auto
                    transition-transform
                    duration-300
                    ease-in-out

                    md:sticky
                    md:top-[128px]
                    md:h-[calc(100vh-128px)]
                    md:z-0
                    md:translate-x-0

                    ${sidebarAbierto
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >

                {/* Encabezado */}
                <div
                    className="
                        flex
                        items-center
                        gap-4
                        h-[70px]
                        px-5
                        border-b
                        border-[#E5E5E5]
                    "
                >

                    {/* Hamburguesa */}
                    <button
                        type="button"
                        onClick={() => setSidebarAbierto(false)}
                        className="
                            text-[#666666]
                            hover:text-[#3E4234]
                            transition-colors
                        "
                        aria-label="Cerrar menú"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M4 7h16" />
                            <path d="M4 12h16" />
                            <path d="M4 17h16" />
                        </svg>
                    </button>

                    <span
                        className="
                            text-[15px]
                            font-semibold
                            text-[#222222]
                        "
                    >
                        Administración
                    </span>

                </div>


                {/* =================================================
                    OPCIONES ADMINISTRATIVAS
                ================================================== */}

                <nav className="py-4">

                    {/* Panel principal 
                    <button
                        type="button"
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <rect x="4" y="4" width="6" height="6" />
                            <rect x="14" y="4" width="6" height="6" />
                            <rect x="4" y="14" width="6" height="6" />
                            <rect x="14" y="14" width="6" height="6" />
                        </svg>

                        <span className="text-[13px]">
                            Panel principal
                        </span>
                    </button> */}


                    {/* Usuarios */}
                    <button
                        type="button"
                        onClick={() => router.push("/usuarios")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <circle cx="9" cy="8" r="3" />
                            <path d="M3.5 20c.6-3.5 2.5-5.5 5.5-5.5s4.9 2 5.5 5.5" />
                            <circle cx="17" cy="9" r="2.5" />
                            <path d="M15 15c2.5.2 4.2 1.8 4.8 5" />
                        </svg>

                        <span className="text-[13px]">
                            Usuarios
                        </span>
                    </button>


                    {/* Clientes */}
                    <button
                        type="button"
                        onClick={() => router.push("/clientes")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
                        </svg>

                        <span className="text-[13px]">
                            Clientes
                        </span>
                    </button>


                    {/* Administradores
                    <button
                        type="button"
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M12 3l2 2h3v3l2 2-2 2v3h-3l-2 2-2-2H7v-3l-2-2 2-2V5h3l2-2z" />
                            <circle cx="12" cy="10" r="2.5" />
                            <path d="M7 20c.7-2.5 2.3-3.8 5-3.8s4.3 1.3 5 3.8" />
                        </svg>

                        <span className="text-[13px]">
                            Administradores
                        </span>
                    </button> */}


                    {/* Roles y Permisos*/}
                    <button
                        type="button"
                        onClick={() => router.push("/crud_roles_permisos")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
                            <path d="M9 12l2 2 4-4" />
                        </svg>

                        <span className="text-[13px]">
                            Roles y Permisos
                        </span>
                    </button>

                    {/* Productos */}
                    <button
                        type="button"
                        onClick={() => router.push("/crud_productos")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M4 7l8-4 8 4-8 4-8-4z" />
                            <path d="M4 7v10l8 4 8-4V7" />
                            <path d="M12 11v10" />
                        </svg>

                        <span className="text-[13px]">
                            Productos
                        </span>
                    </button>

                    {/* Productos Relacionados */}
                    <button
                        type="button"
                        onClick={() => router.push("/crud_productosRelacionados")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M4 7l8-4 8 4-8 4-8-4z" />
                            <path d="M4 7v10l8 4 8-4V7" />
                            <path d="M12 11v10" />
                        </svg>

                        <span className="text-[13px]">
                            Productos Relacionados
                        </span>
                    </button>


                    {/* Categorías */}
                    <button
                        type="button"
                        onClick={() => router.push("/crud_categorias")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M4 5h6l2 2h8v12H4V5z" />
                            <path d="M4 10h16" />
                        </svg>

                        <span className="text-[13px]">
                            Categorías y Subcategorías
                        </span>
                    </button>


                    {/* Pedidos */}
                    <button
                        type="button"
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M5 4h14v16H5z" />
                            <path d="M8 8h8" />
                            <path d="M8 12h8" />
                            <path d="M8 16h5" />
                        </svg>

                        <span className="text-[13px]">
                            Pedidos
                        </span>
                    </button>


                    {/* Sesiones
                    <button
                        type="button"
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <circle cx="12" cy="12" r="8" />
                            <path d="M12 8v4l3 2" />
                        </svg>

                        <span className="text-[13px]">
                            Sesiones
                        </span>
                    </button> */}

                    {/* Facturación */}
                    <button
                        type="button"
                        onClick={() => router.push("/formulario_facturacion")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <rect x="5" y="4" width="14" height="16" rx="2" />
                            <path d="M8 8h8" />
                            <path d="M8 12h8" />
                            <path d="M8 16h5" />
                        </svg>

                        <span className="text-[13px]">
                            Facturación
                        </span>
                    </button>

                    {/* Reportes */}
                    <button
                        type="button"
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M5 19V5" />
                            <path d="M5 18h15" />
                            <path d="M8 15l3-4 3 2 4-6" />
                        </svg>

                        <span className="text-[13px]">
                            Reportes
                        </span>
                    </button>


                    {/* Configuración
                    <button
                        type="button"
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#666666]
                            hover:bg-[#F5F5F5]
                            transition-colors
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V20h-2.6v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H4v-2.6h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 001.9.3 1.7 1.7 0 001-1.6V4h2.6v.1a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 00-.3 1.9 1.7 1.7 0 001.6 1h.1v2.6h-.1a1.7 1.7 0 00-1.6 1z" />
                        </svg>

                        <span className="text-[13px]">
                            Configuración
                        </span>
                    </button> */}


                    {/* =================================================
                        MI PERFIL — ACTIVO
                    ================================================== */}

                    <button
                        type="button"
                        onClick={() => router.push("/perfil")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-3.5
                            text-left
                            text-[#6B705C]
                            bg-[#F1F1EF]
                            font-medium
                        "
                    >
                        <svg
                            className="w-6 h-6 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
                        </svg>

                        <span className="text-[13px]">
                            Mi perfil
                        </span>
                    </button>

                </nav>

            </aside>
        </>
    );
}