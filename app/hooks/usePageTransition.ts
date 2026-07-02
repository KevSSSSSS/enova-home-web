"use client";

import { useRouter } from "next/navigation";

export function usePageTransition() {
    const router = useRouter();

    const navigate = async (href: string) => {
        // 1. activar overlay
        window.dispatchEvent(new Event("routeChangeStart"));

        // 2. esperar que aparezca la cortina
        await new Promise((r) => setTimeout(r, 350));

        // 3. cambiar ruta
        router.push(href);

        // 4. mantener cortina un poco
        setTimeout(() => {
            window.dispatchEvent(new Event("routeChangeComplete"));
        }, 200);
    };

    return { navigate };
}