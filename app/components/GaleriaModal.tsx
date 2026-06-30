"use client";

import { useEffect } from "react";

interface Props {
    imagenes: string[];
    indiceActual: number;
    onCerrar: () => void;
    onAnterior: () => void;
    onSiguiente: () => void;
}

export default function GaleriaModal({
    imagenes,
    indiceActual,
    onCerrar,
    onAnterior,
    onSiguiente,
}: Props) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCerrar();
            if (e.key === "ArrowLeft") onAnterior();
            if (e.key === "ArrowRight") onSiguiente();
        };

        window.addEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [onCerrar, onAnterior, onSiguiente]);

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-fade"
            onClick={onCerrar}
        >
            {/* Botón cerrar */}
            <button onClick={onCerrar}
            className="absolute top-6 right-8 text-white text-5xl hover:scale-110 transition cursor-pointer">
                ×
            </button>

            {/* Flecha izquierda */}
            <button onClick={(e) => {e.stopPropagation(); onAnterior();}}
            className="absolute left-6 text-white text-6xl hover:scale-110 transition cursor-pointer select-none">
                ‹
            </button>

            {/* Imagen */}
            <img src={imagenes[indiceActual]} alt=""onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[88vh] rounded-xl shadow-2xl object-contain animate-zoom"/>

            {/* Flecha derecha */}
            <button onClick={(e) => {e.stopPropagation(); onSiguiente();}}
            className="absolute right-6 text-white text-6xl hover:scale-110 transition cursor-pointer select-none">
                ›
            </button>

            {/* Indicador */}
            <div className="absolute bottom-8 text-white text-sm tracking-widest">
                {indiceActual + 1} / {imagenes.length}
            </div>
        </div>
    );
}