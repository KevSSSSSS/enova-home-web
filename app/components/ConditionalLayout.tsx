"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalLayoutProps {
    children: ReactNode;
}

export default function ConditionalLayout({
    children,
}: ConditionalLayoutProps) {
    const pathname = usePathname();

    const esLogin = pathname === "/login";
    const esRegistro = pathname === "/registro";

    return (
        <div className={esLogin || esRegistro ? "" : "pt-20"}>
            {children}
        </div>
        
    );
}