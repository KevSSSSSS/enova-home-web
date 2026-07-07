"use client";

import { useRouter } from "next/navigation";

export default function BotonRegresar() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} aria-label="Regresar"
            className="
                        absolute
                        top-0
                        -left-20

                        w-12
                        h-12

                        rounded-full

                        bg-[#3E4234]/30
                        border
                        border-[#6B705C]/20

                        backdrop-blur-md

                        flex
                        items-center
                        justify-center

                        opacity-40

                        transition-all
                        duration-300
                        ease-out

                        hover:opacity-100
                        hover:bg-[#3E4234]/90
                        hover:border-[#6B705C]/60
                        hover:shadow-lg

                        hover:scale-[1.03]
                        active:scale-95

                        cursor-pointer

                        group
                        "
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.2}
                className="
                            w-6
                            h-6
                            text-white/80
                            transition-all
                            duration-300
                            group-hover:text-white
                            group-hover:-translate-x-0.5
                            "
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>
    );
}