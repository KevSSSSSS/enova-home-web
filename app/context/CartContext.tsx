"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
}

interface CartContextType {
    items: CartItem[];
    cantidadTotal: number;
    total: number;

    agregarAlCarrito: (producto: CartItem) => void;
    eliminarDelCarrito: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const agregarAlCarrito = (producto: CartItem) => {
        setItems((prev) => {
            const existe = prev.find((item) => item.id === producto.id);

            if (existe) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? {
                            ...item,
                            cantidad: item.cantidad + producto.cantidad,
                        }
                        : item
                );
            }

            return [...prev, producto];
        });
    };

    const eliminarDelCarrito = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const cantidadTotal = items.reduce(
        (acc, item) => acc + item.cantidad,
        0
    );

    const total = items.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                cantidadTotal,
                total,
                agregarAlCarrito,
                eliminarDelCarrito,
            }}
        >
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