"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface Context {
    transition: (href: string) => void;
    isActive: boolean;
}

const PageTransitionContext = createContext<Context | null>(null);

export function PageTransitionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    const transition = async (href: string) => {
        setIsActive(true);

        // tiempo de entrada cortina
        await new Promise((r) => setTimeout(r, 350));

        router.push(href);

        // tiempo de salida cortina
        setTimeout(() => {
            setIsActive(false);
        }, 450);
    };

    return (
        <PageTransitionContext.Provider value={{ transition, isActive }}>
            {children}
        </PageTransitionContext.Provider>
    );
}

export const usePageTransition = () => {
    const ctx = useContext(PageTransitionContext);
    if (!ctx) throw new Error("Missing provider");
    return ctx;
};