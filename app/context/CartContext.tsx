"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    id: number;
    idVariante: number;
    sku: string;
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
    actualizarCantidad: (id: number, cantidad: number) => void;
    ultimaActualizacionCarrito: number;
    vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [ultimaActualizacionCarrito, setUltimaActualizacionCarrito] = useState(0);
    const [carritoCargado, setCarritoCargado] = useState(false);

// Recuperar el carrito guardado al cargar la aplicación
useEffect(() => {
    try {
        const carritoGuardado = localStorage.getItem("enova-carrito");

        if (carritoGuardado) {
            const productosGuardados = JSON.parse(carritoGuardado);

            if (Array.isArray(productosGuardados)) {
                setItems(productosGuardados);
            }
        }
    } catch (error) {
        console.error("Error al recuperar el carrito:", error);
        localStorage.removeItem("enova-carrito");
    } finally {
        setCarritoCargado(true);
    }
}, []);

// Guardar automáticamente los cambios del carrito
useEffect(() => {
    if (!carritoCargado) return;

    localStorage.setItem("enova-carrito", JSON.stringify(items));
}, [items, carritoCargado]);

const agregarAlCarrito = (producto: CartItem) => {
    setItems((prev) => {
        //const existe = prev.find((item) => item.id === producto.id);
        const existe = prev.find(
            (item) => item.idVariante === producto.idVariante
        );

        if (existe) {
            return prev.map((item) =>
                //item.id === producto.id
                item.idVariante === producto.idVariante
                    ? {
                        ...item,
                        cantidad: item.cantidad + producto.cantidad,
                    }
                    : item
            );
        }

        return [...prev, producto];
    });

    setUltimaActualizacionCarrito((prev) => prev + 1);
};

    /*const eliminarDelCarrito = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };*/
    const eliminarDelCarrito = (idVariante: number) => {
    setItems((prev) =>
        prev.filter((item) => item.idVariante !== idVariante)
        );
    };

    const vaciarCarrito = () => {
        setItems([]);
    };

    /*const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) return;

    setItems((prev) =>
        prev.map((item) =>
            item.id === id
                ? { ...item, cantidad }
                : item
        )
    );
};*/
    const actualizarCantidad = (idVariante: number, cantidad: number) => {
    if (cantidad < 1) return;

    setItems((prev) =>
        prev.map((item) =>
            item.idVariante === idVariante
                ? { ...item, cantidad }
                : item
        )
    );
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
                vaciarCarrito,
                actualizarCantidad,
                ultimaActualizacionCarrito,
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