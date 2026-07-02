"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./Loader";

export default function LoaderProvider() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && <Loader />}
        </AnimatePresence>
    );
}