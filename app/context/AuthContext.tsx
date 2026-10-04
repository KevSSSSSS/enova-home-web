"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface Rol {
    id_rol: number;
    nombre_rol: string;
}

interface Usuario {
    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string | null;
    email: string;
    usa2FA: boolean;
    roles: Rol[];
}

interface AuthContextType {
    usuario: Usuario | null;
    rol: Rol | null;
    autenticado: boolean;
    iniciarSesion: (usuario: Usuario) => void;
    cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const respuesta = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/sesion`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const datos = await respuesta.json();

                if (!respuesta.ok || !datos.success) {
                    localStorage.removeItem("usuario");
                    setUsuario(null);
                    return;
                }

                setUsuario({
                    idUsuario: datos.usuario.id_usuario,
                    nombre: datos.usuario.nombre,
                    apellidoPaterno: datos.usuario.apellido_paterno,
                    apellidoMaterno: datos.usuario.apellido_materno,
                    email: datos.usuario.email,
                    usa2FA: datos.usuario.usa_2fa,
                    roles: datos.usuario.roles,
                });

            } catch (error) {
                console.error(
                    "Error al verificar la sesión:",
                    error
                );

                localStorage.removeItem("usuario");
                setUsuario(null);
            }
        };

        verificarSesion();
    }, []);

    const iniciarSesion = (usuario: Usuario) => {
        setUsuario(usuario);
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("sesion");
    };

    const rol = usuario?.roles?.[0] ?? null;

    return (
        <AuthContext.Provider
            value={{
                usuario,
                rol,
                autenticado: usuario !== null,
                iniciarSesion,
                cerrarSesion,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider"
        );
    }

    return context;
}