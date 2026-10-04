import { NextRequest, NextResponse } from "next/server";

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
};