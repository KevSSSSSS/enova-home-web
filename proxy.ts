/*import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const tokenSesion = request.cookies.get("sesion")?.value;

    if (!tokenSesion) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/perfil"],
};*/


import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    /*
     * La sesión se valida en el backend mediante la cookie
     * enviada en las peticiones a Render.
     *
     * No debemos bloquear /perfil comprobando una cookie
     * que puede no estar disponible en el dominio de Netlify.
     */

    return NextResponse.next();
}

export const config = {
    matcher: ["/perfil"],
};
