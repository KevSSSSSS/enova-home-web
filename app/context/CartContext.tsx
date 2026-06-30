"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
    cantidadTotal: number;
    agregarAlCarrito: (cantidad: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cantidadTotal, setCantidadTotal] = useState(0);

    const agregarAlCarrito = (cantidad: number) => {
        setCantidadTotal((prev) => prev + cantidad);
    };

    return (
        <CartContext.Provider value={{ cantidadTotal, agregarAlCarrito }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de CartProvider");
    }
    return context;
}