"use client";

import { useCart } from "../context/CartContext";

interface Props {
    abierto: boolean;
}

export default function CartDropdown({ abierto }: Props) {
    const { items, total, eliminarDelCarrito, actualizarCantidad } = useCart();

    if (!abierto) return null;

    return (
        <div className="absolute top-full -right-2 mt-4 w-[calc(100vw-2rem)] max-w-[380px] bg-white rounded-lg shadow-2xl border border-gray-200 z-[100]">
            {/* Flecha */}
            <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

            {/* Lista */}
            <div className="max-h-[420px] overflow-y-auto">
                {items.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                        Tu carrito está vacío
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="flex gap-4 px-5 py-4 border-b">
                            <img src={item.imagen} alt={item.nombre} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1">
                                <p className="font-medium text-[#3E4234]">
                                    {item.nombre}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-sm text-gray-500">Cantidad:</span>

                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button
                                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                            disabled={item.cantidad <= 1}
                                            className="w-8 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                                            aria-label={`Disminuir cantidad de ${item.nombre}`}
                                        >
                                            −
                                        </button>

                                        <span className="w-8 text-center text-sm">
                                            {item.cantidad}
                                        </span>

                                        <button
                                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                            className="w-8 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                            aria-label={`Aumentar cantidad de ${item.nombre}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <p className="mt-2 text-[#6B705C] font-semibold">
                                    {(item.precio * item.cantidad).toLocaleString("es-MX", {
                                        style: "currency",
                                        currency: "MXN",
                                    })}
                                </p>
                            </div>
                            <button onClick={() => eliminarDelCarrito(item.id)}
                                className="text-gray-400 hover:text-red-500 text-3xl leading-none transition cursor-pointer">
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Encabezado */}
            <div className="flex justify-between items-center px-5 py-4 border-t">
                <span className="font-medium">
                    {items.length} producto(s)
                </span>

                <span className="font-semibold text-lg">
                    Total:{" "}
                    {total.toLocaleString("es-MX", {
                        style: "currency",
                        currency: "MXN",
                    })}
                </span>
            </div>

            {/* Botón */}
            {/**<div className="p-4">
                <button className="w-full h-12 rounded-md bg-[#6B705C] text-white hover:bg-[#3E4234] transition">
                    Ver carrito
                </button>
            </div>**/}
        </div>
    );
}