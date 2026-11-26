"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function CarritoPage() {

const router = useRouter();
const { autenticado, cargando } = useAuth();

const realizarPedido = () => {
    if (cargando) return;

    if (autenticado) {
        router.push("/checkout");
    } else {
        router.push("/login?redirect=/checkout");
    }
};

    const {
        items,
        total,
        vaciarCarrito,
        actualizarCantidad,
        eliminarDelCarrito
    } = useCart();

    return (
        <main className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-semibold text-[#3E4234] mb-8">
                Mi carrito
            </h1>

            {items.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="text-gray-500 text-lg mb-6">
                        Tu carrito está vacío
                    </p>

                    <Link
                        href="/catalogo"
                        className="inline-flex px-6 py-3 bg-[#6B705C] text-white rounded-md hover:bg-[#3E4234] transition"
                    >
                        Seguir comprando
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">

                    {items.map((item) => (
                        <div
                            key={item.idVariante}
                            className="flex gap-5 items-center border-b border-gray-200 pb-6"
                        >
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <button
                                onClick={() => eliminarDelCarrito(item.idVariante)}
                                className="text-gray-400 hover:text-red-500 text-2xl leading-none transition cursor-pointer"
                                aria-label={`Eliminar ${item.nombre} del carrito`}
                            >
                                ×
                            </button>

                            <div className="flex-1">
                                <h2 className="font-medium text-[#3E4234]">
                                    {item.nombre}
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    SKU: {item.sku}
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                    Precio unitario: {item.precio.toLocaleString("es-MX", {
                                        style: "currency",
                                        currency: "MXN",
                                    })}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-3">

                                <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                        onClick={() => actualizarCantidad(item.idVariante, item.cantidad - 1)}
                                        disabled={item.cantidad <= 1}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                                        aria-label={`Disminuir cantidad de ${item.nombre}`}
                                    >
                                        −
                                    </button>

                                    <span className="w-10 text-center text-sm">
                                        {item.cantidad}
                                    </span>

                                    <button
                                        onClick={() => actualizarCantidad(item.idVariante, item.cantidad + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                        aria-label={`Aumentar cantidad de ${item.nombre}`}
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="font-semibold text-[#6B705C]">
                                    {(item.precio * item.cantidad).toLocaleString("es-MX", {
                                        style: "currency",
                                        currency: "MXN",
                                    })}
                                </p>

                            </div>
                        </div>
                    ))}

                    <div className="mt-8 ml-auto max-w-md border-t border-gray-200 pt-6">

                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">Subtotal:</span>

                            <span className="font-medium">
                                {total.toLocaleString("es-MX", {
                                    style: "currency",
                                    currency: "MXN",
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between py-2">
                            <span className="text-gray-600">Costo de envío:</span>

                            <span className="font-medium text-green-700">
                                Gratis
                            </span>
                        </div>

                        <div className="flex justify-between border-t border-gray-200 mt-4 pt-4">
                            <span className="text-lg font-semibold text-[#3E4234]">
                                Total:
                            </span>

                            <span className="text-xl font-semibold text-[#6B705C]">
                                {total.toLocaleString("es-MX", {
                                    style: "currency",
                                    currency: "MXN",
                                })}
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">

                            <Link
                                href="/catalogo"
                                className="px-6 py-3 border border-[#6B705C] text-[#6B705C] rounded-md hover:bg-gray-50 transition"
                            >
                                Seguir comprando
                            </Link>

                            <button
                                onClick={vaciarCarrito}
                                className="px-6 py-3 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition"
                            >
                                Eliminar carrito
                            </button>

                            <button
                                onClick={realizarPedido}
                                disabled={cargando}
                                className="w-full py-4 bg-[#6B705C] text-white text-lg font-semibold rounded-md hover:bg-[#3E4234] transition cursor-pointer"
                            >
                                Realizar pedido
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}