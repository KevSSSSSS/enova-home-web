"use client";

import { useEffect, useRef, useState } from "react";

interface ImagePlaceholderProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ImagePlaceholder({
    src,
    alt,
    className = "",
}: ImagePlaceholderProps) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        setLoaded(false);

        const timer = setTimeout(() => {
            const img = imgRef.current;

            if (img?.complete && img.naturalWidth > 0) {
                setLoaded(true);
            }
        }, 450);

        return () => clearTimeout(timer);
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!loaded && (
                <div className="absolute inset-0 bg-[#E7E7E5] animate-pulse z-10" />
            )}

            <img ref={imgRef} src={src} alt={alt}
                onLoad={() => {setTimeout(() => { setLoaded(true);}, 700);}}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}/>
        </div>
    );
}