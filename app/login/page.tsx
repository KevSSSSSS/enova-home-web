"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import BotonRegresar from "../components/BotonRegresar";

export default function LoginPage() {
    const router = useRouter();
    const { iniciarSesion, autenticado, } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
    if (autenticado) {
        router.replace("/");
        }
    }, [autenticado, router]);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setCargando(true);

    try {
        /*
         * 1. Login
         */
        const respuestaLogin = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const datosLogin = await respuestaLogin.json();

        console.log("DATOS COMPLETOS DEL LOGIN:", datosLogin);
        console.log("USUARIO RECIBIDO:", datosLogin.usuario);

        /*
         * 2. Verificar login
         */
        if (!respuestaLogin.ok || !datosLogin.success) {
            setError(datosLogin.response || "Error al iniciar sesión");
            return;
        }

        /*
         * 3. Obtener ID del usuario
         */
        const idUsuario = datosLogin.usuario.idUsuario;

        /*
         * 4. Obtener permisos
         */
        const respuestaPermisos = await fetch(
            `${API_URL}/usuarios/${idUsuario}/permisos`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        const datosPermisos = await respuestaPermisos.json();

        /*
         * 5. Verificar permisos
         */
        if (!respuestaPermisos.ok || !datosPermisos.success) {
            setError(
                datosPermisos.response ||
                "No fue posible obtener los permisos del usuario"
            );
            return;
        }

        /*
         * Guardar sesión
        const sesion = {
            usuario: datosLogin.usuario,
            permisos: datosPermisos.permisos,
        };

        localStorage.setItem("sesion", JSON.stringify(sesion));
        */

        /*
         * 6. Guardar usuario en AuthContext
         */
        iniciarSesion(datosLogin.usuario);

        /*
         * 7. Regresar al Home
         */
        router.push("/");

    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        setError(
            "No fue posible conectar con el servidor. Inténtalo nuevamente."
        );
    } finally {
        setCargando(false);
    }
};

    return (
        <main className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-6 py-12">
            <div className="relative w-full max-w-md">

                {/* Botón regresar */}
                <BotonRegresar />

                {/* Título */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-[var(--font-playfair)] text-[#3E4234]">
                        Iniciar sesión
                    </h1>

                    <p className="mt-3 text-[#6B705C]">
                        Ingresa a tu cuenta de eNova Home
                    </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="bg-[#E7E7E5] rounded-lg p-8 shadow-sm">

                    {/* Correo */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Correo electrónico
                        </label>

                        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="correo@ejemplo.com" required disabled={cargando}
                            className="w-full px-4 py-3 border border-[#D6D6CF] rounded-md bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"/>
                    </div>

                    {/* Contraseña */}
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#3E4234]">
                            Contraseña
                        </label>

                        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ingresa tu contraseña" required disabled={cargando}
                        className="w-full px-4 py-3 border border-[#D6D6CF] rounded-md bg-white text-[#3E4234] outline-none focus:border-[#6B705C]"/>
                    </div>

                    {/* Mensaje de error */}
                    {error && (
                        <div className="mb-5 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Botón */}
                    <button type="submit" disabled={cargando}
                    className="w-full h-[52px] bg-[#3E4234] text-white rounded uppercase tracking-wide hover:bg-[#6B705C] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                        {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
                    </button>

                    {/* Registro */}
                    <div className="mt-6 text-center text-sm text-[#6B705C]">
                        <span>¿No tienes una cuenta? </span>
                        <Link href="/registro" className="font-semibold text-[#3E4234] hover:text-[#6B705C]">
                            Regístrate
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}