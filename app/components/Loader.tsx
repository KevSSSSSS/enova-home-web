"use client";

import { motion, Variants } from "framer-motion";

const dotVariants: Variants = {
    pulse: {
        scale: [1, 1.5, 1],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export default function Loader() {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 0.96,
                transition: {
                    duration: 0.35,
                    ease: "easeOut",
                },
            }}
        >
            <motion.div
                className="flex items-center gap-4"
                animate="pulse"
                transition={{
                    staggerChildren: -0.2,
                    staggerDirection: -1,
                }}
            >
                <motion.div
                    variants={dotVariants}
                    className="w-4 h-4 rounded-full bg-[#6B705C]"
                />

                <motion.div
                    variants={dotVariants}
                    className="w-4 h-4 rounded-full bg-[#6B705C]"
                />

                <motion.div
                    variants={dotVariants}
                    className="w-4 h-4 rounded-full bg-[#6B705C]"
                />
            </motion.div>
        </motion.div>
    );
}