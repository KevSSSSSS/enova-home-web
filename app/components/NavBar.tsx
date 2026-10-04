"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDropdown from "./CartDropdown";
import { useRef, useEffect } from "react";

const NavBar = () => {
    const { cantidadTotal } = useCart();

    const { usuario, rol, autenticado, cerrarSesion, } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [usuarioMenuOpen, setUsuarioMenuOpen] = useState(false);

    /*
   * Indica que el componente ya se montó
   * en el navegador.
   *
   * Esto evita errores de hidratación cuando
   * AuthContext obtiene información del navegador.
   */
    const [mounted, setMounted] = useState(false);

    const cartDesktopRef = useRef<HTMLDivElement>(null);
    const cartMobileRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const usuarioDesktopRef = useRef<HTMLDivElement>(null);
    const usuarioMobileRef = useRef<HTMLDivElement>(null);

    /*
     * Detectar montaje en cliente
     */
    useEffect(() => { setMounted(true); }, []);

    const isActive = (categoria: string) =>
        pathname === "/catalogo" &&
        searchParams.get("categoria") === categoria;
    const isRouteActive = (ruta: string) => pathname === ruta;


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {

            const target = event.target as Node;

            const clickDentroDesktop =
                cartDesktopRef.current &&
                cartDesktopRef.current.contains(target);

            const clickDentroMobile =
                cartMobileRef.current &&
                cartMobileRef.current.contains(target);

            const clickDentroUsuarioDesktop =
                usuarioDesktopRef.current &&
                usuarioDesktopRef.current.contains(target);

            const clickDentroUsuarioMobile =
                usuarioMobileRef.current &&
                usuarioMobileRef.current.contains(target);

            /*
             * Cerrar carrito
             */
            if (!clickDentroDesktop && !clickDentroMobile) { setCartOpen(false); }

            /*
             * Cerrar menú de usuario
             */
            if (!clickDentroUsuarioDesktop && !clickDentroUsuarioMobile) { setUsuarioMenuOpen(false); }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCerrarSesion = async () => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
        } catch (error) {
            console.error(
                "Error al cerrar sesión:",
                error
            );
        } finally {
            /*
             * Limpiar sesión del frontend
             */
            cerrarSesion();

            setUsuarioMenuOpen(false);
            setMenuOpen(false);

            /*
             * Reemplazar la página actual por Home
             */
            router.replace("/");
        }
    };

    return (
        <header id="navbar" className="fixed top-0 left-0 w-full px-6 py-4 flex items-center bg-[#E7E7E5] shadow-xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-50">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
                <Image src="/Images/Logo-eNovaHome-.png" alt="Logo eNova Home" width={150} height={50} priority className="cursor-pointer" />
            </Link>

            {/* Contenedor móvil */}
            <div className="md:hidden ml-auto flex items-center gap-4 h-10">
                {/* Botón hamburguesa */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col justify-center gap-1">
                    <div className="relative w-6 h-6">
                        <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-[#3E4234] transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-2"}`} />
                        <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-[#3E4234] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-[#3E4234] transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-2"}`} />
                    </div>
                </button>

                {/* Carrito móvil */}
                <div className="relative" ref={cartMobileRef}>
                    <button onClick={() => setCartOpen(!cartOpen)}
                        className="relative cursor-pointer">
                        <img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto relative top-[4px]" />

                        {cantidadTotal > 0 && (
                            <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cantidadTotal}
                            </span>
                        )}
                    </button>

                    <CartDropdown abierto={cartOpen} />
                </div>
            </div>

            {/* Menú */}
            <nav className="hidden md:flex ml-auto flex-row gap-6 text-sm font-[var(--font-montserrat)] items-center mt-20">
                <Link href="/catalogo?categoria=MESACOMEDOR" className={isActive("MESACOMEDOR") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
                    Mesa & Comedor
                </Link>
                <Link href="/catalogo?categoria=COCINA" className={isActive("COCINA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
                    Cocina
                </Link>
                <Link href="/catalogo?categoria=BANO" className={isActive("BANO") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
                    Baño
                </Link>
                <Link href="/catalogo?categoria=RECAMARA" className={isActive("RECAMARA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}>
                    Recámara
                </Link>
                <Link href="/catalogo" className={isRouteActive("/catalogo") && !searchParams.get("categoria") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                    onClick={() => setMenuOpen(false)}>
                    Catálogo
                </Link>
                <Link href="/nosotros" className={isRouteActive("/nosotros") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                    onClick={() => setMenuOpen(false)}>
                    Nosotros
                </Link>
                <Link href="/contacto" className={isRouteActive("/contacto") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                    onClick={() => setMenuOpen(false)}>
                    Contacto
                </Link>

                {/* LOGIN / USUARIO */}
                {mounted && !autenticado && (
                    <Link href="/login" className={isRouteActive("/login") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                        onClick={() => setMenuOpen(false)}>
                        Iniciar sesión
                    </Link>
                )}

                {/* MENÚ DEL USUARIO DESKTOP */}
                {mounted && autenticado && usuario && (
                    <div ref={usuarioDesktopRef} className="relative">

                        {/* Botón usuario */}
                        <button type="button" onClick={() => setUsuarioMenuOpen(!usuarioMenuOpen)}
                            className="flex items-center gap-2 cursor-pointer text-left">

                            <div className="flex flex-col items-start leading-tight">
                                {/* Nombre */}
                                <span className="text-sm font-semibold text-[#3E4234]">
                                    {usuario.nombre}
                                </span>

                                {/* Apellidos */}
                                <span className="text-xs text-[#3E4234]">
                                    {usuario.apellidoPaterno}{" "}
                                    {/*{usuario.apellidoMaterno ?? ""}*/}
                                </span>

                                {/* Correo */}
                                <span className="text-xs text-[#6B705C]">
                                    {usuario.email}
                                </span>

                                {/* Rol 
                                {rol && (
                                    <span className="text-xs text-[#6B705C]">
                                        {rol.nombre_rol}
                                    </span>
                                )}*/}
                            </div>

                            {/* Flecha 
                            <span className={`text-[#3E4234] text-xs transition-transform duration-200 ${usuarioMenuOpen ? "rotate-180" : ""}`}>
                                ▼
                            </span>*/}
                        </button>


                        {/* Dropdown usuario */}
                        {usuarioMenuOpen && (
                            <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-md shadow-lg border border-[#D6D6CF] overflow-hidden z-[200]">

                                {/* Información */}
                                <div className="px-4 py-3 border-b border-[#D6D6CF]">

                                    {/* Nombre */}
                                    <p className="text-sm font-semibold text-[#3E4234]">
                                        {usuario.nombre}
                                    </p>

                                    {/* Apellidos */}
                                    <p className="text-xs text-[#3E4234] mt-1">
                                        {usuario.apellidoPaterno}{" "}
                                        {usuario.apellidoMaterno ?? ""}
                                    </p>

                                    {/* Correo */}
                                    <p className="text-xs text-[#6B705C] mt-1">
                                        {usuario.email}
                                    </p>

                                    {/* Rol */}
                                    {rol && (
                                        <p className="text-xs text-[#6B705C] mt-1">
                                            {rol.nombre_rol}
                                        </p>
                                    )}

                                </div>

                                {/* Mi perfil */}
                                <Link href="/perfil" className="block w-full text-left px-4 py-3 text-sm 
                                text-[#3E4234] hover:bg-[#E7E7E5] transition cursor-pointer"
                                    onClick={() => setUsuarioMenuOpen(false)}>
                                    Mi Cuenta
                                </Link>

                                {/* Cerrar sesión */}
                                <button type="button" onClick={handleCerrarSesion} className="w-full text-left px-4 py-3 text-sm
                                        text-[#3E4234] hover:bg-[#E7E7E5] transition cursor-pointer">
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Icono de búsqueda */}
                <div className="flex items-center flex-1">
                    {searchOpen && (
                        <input type="text" placeholder="Buscar..." className="flex-1 px-4 py-2.5 mr-2 border border-[#D6D6CF] rounded-md text-base" />
                    )}

                    <button onClick={() => setSearchOpen(!searchOpen)} className="cursor-pointer">
                        <img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto" />
                    </button>
                </div>

                {/* Icono de carrito */}
                <div className="relative z-[100]" ref={cartDesktopRef}>
                    <button onClick={() => setCartOpen(!cartOpen)} className="relative cursor-pointer">
                        <img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto" />

                        {cantidadTotal > 0 && (
                            <span className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cantidadTotal}
                            </span>
                        )}
                    </button>

                    <CartDropdown abierto={cartOpen} />
                </div>
            </nav>

            {/* Menú móvil desplegable */}
            {menuOpen && (
                <nav className="md:hidden absolute top-full left-0 w-full bg-[#E7E7E5] shadow-lg px-6 py-5 flex flex-col gap-4 z-50">
                    <Link href="/catalogo?categoria=MESACOMEDOR" className={isActive("MESACOMEDOR") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                        onClick={() => setMenuOpen(false)}>Mesa & Comedor</Link>
                    <Link href="/catalogo?categoria=COCINA" className={isActive("COCINA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                        onClick={() => setMenuOpen(false)}>
                        Cocina
                    </Link>
                    <Link href="/catalogo?categoria=BANO" className={isActive("BANO") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                        onClick={() => setMenuOpen(false)}>
                        Baño
                    </Link>
                    <Link href="/catalogo?categoria=RECAMARA" className={isActive("RECAMARA") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                        onClick={() => setMenuOpen(false)}>
                        Recámara
                    </Link>
                    <Link href="/catalogo" className={isRouteActive("/catalogo") && !searchParams.get("categoria")
                        ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"} onClick={() => setMenuOpen(false)}>
                        Catálogo
                    </Link>
                    <Link href="/nosotros" className={isRouteActive("/nosotros")
                        ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"} onClick={() => setMenuOpen(false)}>
                        Nosotros
                    </Link>
                    <Link href="/contacto" className={isRouteActive("/contacto")
                        ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"} onClick={() => setMenuOpen(false)}>
                        Contacto
                    </Link>

                    {/* LOGIN MÓVIL */}
                    {mounted && !autenticado && (
                        <Link href="/login" className={isRouteActive("/login") ? "text-[#6B705C] font-semibold" : "hover:text-[#6B705C]"}
                            onClick={() => setMenuOpen(false)}>
                            Iniciar sesión
                        </Link>
                    )}

                    {/* USUARIO MÓVIL */}
                    {mounted && autenticado && usuario && (
                        <div ref={usuarioMobileRef} className="relative pt-2 border-t border-[#D6D6CF]">
                            {/* Botón usuario */}
                            <button type="button" onClick={() => setUsuarioMenuOpen(!usuarioMenuOpen)}
                                className="w-full flex items-center justify-between cursor-pointer text-left">

                                <div className="flex flex-col items-start leading-tight">
                                    {/* Nombre */}
                                    <span className="text-sm font-semibold text-[#3E4234]">
                                        {usuario.nombre}
                                    </span>

                                    {/* Apellidos */}
                                    <span className="text-xs text-[#3E4234]">
                                        {usuario.apellidoPaterno}{" "}
                                        {usuario.apellidoMaterno ?? ""}
                                    </span>

                                    {/* Correo */}
                                    <span className="text-xs text-[#6B705C]">
                                        {usuario.email}
                                    </span>

                                    {/* Rol */}
                                    {rol && (
                                        <span className="text-xs text-[#6B705C]">
                                            {rol.nombre_rol}
                                        </span>
                                    )}
                                </div>

                                {/* Flecha */}
                                <span className={`text-[#3E4234] text-xs transition-transform duration-200 ${usuarioMenuOpen ? "rotate-180" : ""}`}>
                                    ▼
                                </span>
                            </button>


                            {/* Dropdown móvil */}
                            {usuarioMenuOpen && (
                                <div className="mt-3 bg-white rounded-md border border-[#D6D6CF] overflow-hidden">

                                    {/* Información */}
                                    <div className="px-4 py-3 border-b border-[#D6D6CF]">

                                        {/* Nombre */}
                                        <p className="text-sm font-semibold text-[#3E4234]">
                                            {usuario.nombre}
                                        </p>

                                        {/* Apellidos */}
                                        <p className="text-xs text-[#3E4234] mt-1">
                                            {usuario.apellidoPaterno}{" "}
                                            {usuario.apellidoMaterno ?? ""}
                                        </p>

                                        {/* Correo */}
                                        <p className="text-xs text-[#6B705C] mt-1">
                                            {usuario.email}
                                        </p>

                                        {/* Rol */}
                                        {rol && (
                                            <p className="text-xs text-[#6B705C] mt-1">
                                                {rol.nombre_rol}
                                            </p>
                                        )}

                                    </div>

                                    {/* Mi perfil */}
                                    <Link href="/perfil" className="block w-full text-left px-4 py-3 text-sm 
                                    text-[#3E4234] hover:bg-[#E7E7E5] transition cursor-pointer"
                                        onClick={() => { setUsuarioMenuOpen(false); setMenuOpen(false); }}>
                                        Mi Cuenta
                                    </Link>

                                    {/* Cerrar sesión */}
                                    <button type="button" onClick={handleCerrarSesion}
                                        className="w-full text-left px-4 py-3 text-sm text-[#3E4234] hover:bg-[#E7E7E5] transition cursor-pointer">
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center pt-2">
                        <div className="flex items-center flex-1">
                            {searchOpen && (
                                <input type="text" placeholder="Buscar..." className="flex-1 min-w-0 px-4 py-2 border border-[#D6D6CF] rounded-md text-base mr-3" />
                            )}

                            <button onClick={() => setSearchOpen(!searchOpen)} className="cursor-pointer">
                                <img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto" />
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default NavBar;