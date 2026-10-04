"use client";

import { useState } from "react";

export default function SidebarCliente() {

    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    return (
        <>
            {/* =====================================================
                BOTÓN PARA ABRIR SIDEBAR EN MÓVIL
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
                FONDO PARA CERRAR EL SIDEBAR
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
                SIDEBAR
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
                        Mi cuenta
                    </span>

                </div>


                {/* =================================================
                    OPCIONES
                ================================================== */}

                <nav className="py-4">

                    {/* Central de vendedores */}
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
                            Central de vendedores
                        </span>
                    </button>


                    {/* Compras */}
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
                            <path d="M5 8h14l-1 11H6L5 8z" />
                            <path d="M9 8V6a3 3 0 016 0v2" />
                        </svg>

                        <span className="text-[13px]">
                            Compras
                        </span>
                    </button>


                    {/* Preguntas */}
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
                            <path d="M4 5h16v11H8l-4 4V5z" />
                        </svg>

                        <span className="text-[13px]">
                            Preguntas
                        </span>
                    </button>


                    {/* Opiniones */}
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
                            <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z" />
                        </svg>

                        <span className="text-[13px]">
                            Opiniones
                        </span>
                    </button>


                    {/* Favoritos */}
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
                            <path d="M20.8 8.8c0 5.5-8.8 11-8.8 11S3.2 14.3 3.2 8.8A4.8 4.8 0 018 4c1.7 0 3.2.9 4 2.2C12.8 4.9 14.3 4 16 4a4.8 4.8 0 014.8 4.8z" />
                        </svg>

                        <span className="text-[13px]">
                            Favoritos
                        </span>
                    </button>


                    {/* Tiendas */}
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
                            <circle cx="12" cy="7" r="3" />
                            <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
                            <path d="M4 4h4" />
                        </svg>

                        <span className="text-[13px]">
                            Tiendas que sigo
                        </span>
                    </button>


                    {/* Vehículos */}
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
                            <path d="M5 16l1.5-6h11L19 16" />
                            <path d="M3 16h18v4H3z" />
                            <circle cx="7" cy="20" r="1.5" />
                            <circle cx="17" cy="20" r="1.5" />
                        </svg>

                        <span className="text-[13px]">
                            Vehículos de interés
                        </span>
                    </button>


                    {/* Inmuebles */}
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
                            <path d="M3 11l9-7 9 7" />
                            <path d="M5 10v10h14V10" />
                            <path d="M9 20v-6h6v6" />
                        </svg>

                        <span className="text-[13px]">
                            Inmuebles de interés
                        </span>
                    </button>


                    {/* Búsquedas */}
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
                            <circle cx="10.5" cy="10.5" r="6.5" />
                            <path d="M16 16l5 5" />
                        </svg>

                        <span className="text-[13px]">
                            Búsquedas guardadas
                        </span>
                    </button>


                    {/* Créditos */}
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
                            <path d="M12 8v8" />
                            <path d="M9 11h6" />
                        </svg>

                        <span className="text-[13px]">
                            Créditos
                        </span>
                    </button>


                    {/* Suscripciones */}
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
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                        </svg>

                        <span className="text-[13px]">
                            Suscripciones
                        </span>
                    </button>


                    {/* Facturación */}
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
                            <rect
                                x="5"
                                y="3"
                                width="14"
                                height="18"
                                rx="2"
                            />
                            <path d="M8 8h8" />
                            <path d="M8 12h8" />
                            <path d="M8 16h5" />
                        </svg>

                        <span className="text-[13px]">
                            Facturación
                        </span>
                    </button>


                    {/* =================================================
                        MI PERFIL — ACTIVO
                    ================================================== */}

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