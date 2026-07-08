"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageTitle(title?: string) {
    const pathname = usePathname();

    useEffect(() => {
        document.title = title
            ? `eNova Home - ${title}`
            : "eNova Home";
    }, [title, pathname]);
}