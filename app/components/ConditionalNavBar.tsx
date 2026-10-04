"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function ConditionalNavBar() {
    const pathname = usePathname();

    const ocultarNavbar = pathname === "/login" || pathname === "/registro";

    if (ocultarNavbar) {
        return null;
    }

    return <NavBar />;
}