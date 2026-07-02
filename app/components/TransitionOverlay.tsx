"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TransitionOverlay() {
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const [displayPath, setDisplayPath] = useState(pathname);

    useEffect(() => {
        // cuando cambia la ruta → activamos cortina
        setShow(true);

        // mantenemos la ruta anterior visible debajo
        const timeout1 = setTimeout(() => {
            setDisplayPath(pathname);
        }, 200);

        // ocultamos la cortina después de que la nueva página ya esté montada
        const timeout2 = setTimeout(() => {
            setShow(false);
        }, 600);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, [pathname]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.35,
                        ease: "easeInOut",
                    }}
                />
            )}
        </AnimatePresence>
    );
}