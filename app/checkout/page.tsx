
"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Direccion {
    id_direccion: number;
    id_cliente: number;
    nombre_receptor: string;
    telefono: string;
    calle: string;
    numero_exterior: string;
    numero_interior: string | null;
    colonia: string;
    codigo_postal: string;
    municipio: string;
    estado: string;
    pais: string;
    referencias: string | null;
    principal: boolean;
    activo: boolean;
}

interface RespuestaDirecciones {
    response: string;
    success: boolean;
    cantidad: number;
    direcciones: Direccion[];
}

interface NuevaDireccion {
    nombreReceptor: string;
    telefono: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    colonia: string;
    codigoPostal: string;
    municipio: string;
    estado: string;
    pais: string;
    referencias: string;
    principal: boolean;
}

const formularioInicial: NuevaDireccion = {
    nombreReceptor: "",
    telefono: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    colonia: "",
    codigoPostal: "",
    municipio: "",
    estado: "",
    pais: "México",
    referencias: "",
    principal: false,
};

interface MetodoPago {
    id_metodo_pago: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

interface RespuestaMetodosPago {
    response: string;
    success: boolean;
    cantidad: number;
    metodosPago: MetodoPago[];
}

interface PedidoCheckout {
    id_pedido: number;
    id_cliente: number;
    id_direccion: number;
    numero_pedido: string;
    estado: string;
    subtotal: string;
    descuento: string;
    costo_envio: string;
    total: string;
    fecha_pedido: string;
}

interface RespuestaCheckout {
    success: boolean;
    response: string;
    data: {
        pedido: PedidoCheckout;
        pago: {
            id_pago: number;
            id_pedido: number;
            id_metodo_pago: number;
            monto: string;
            estado: string;
        };
        detalles: {
            idVariante: number;
            idProducto: number;
            sku: string;
            nombre: string;
            cantidad: number;
            precioUnitario: number;
            subtotal: number;
        }[];
    };
}

export default function CheckoutPage() {

    const { items, total, vaciarCarrito } = useCart();


    const [direcciones, setDirecciones] = useState<Direccion[]>([]);
    const [direccionSeleccionada, setDireccionSeleccionada] =
        useState<number | null>(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevaDireccion, setNuevaDireccion] =
        useState<NuevaDireccion>(formularioInicial);

    const [cargandoDirecciones, setCargandoDirecciones] = useState(true);
    const [guardandoDireccion, setGuardandoDireccion] = useState(false);
    const [errorDirecciones, setErrorDirecciones] = useState("");
    const [errorFormulario, setErrorFormulario] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] =
        useState<number | null>(null);

    const [cargandoMetodosPago, setCargandoMetodosPago] = useState(true);
    const [errorMetodosPago, setErrorMetodosPago] = useState("");

    // Estados para finalizar el pedido.
    const [finalizandoPedido, setFinalizandoPedido] = useState(false);
    const [errorCheckout, setErrorCheckout] = useState("");
    const [pedidoConfirmado, setPedidoConfirmado] =
        useState<RespuestaCheckout["data"] | null>(null);

    const [mostrarModalPedido, setMostrarModalPedido] = useState(false);

    const [direccionPedido, setDireccionPedido] =
        useState<Direccion | null>(null);

    const [metodoPagoPedido, setMetodoPagoPedido] =
        useState<MetodoPago | null>(null);

    // Preparar los artículos para enviar al backend.
    const obtenerItemsCheckout = () => {
        return items.map((item) => ({
            idVariante: item.idVariante,
            cantidad: item.cantidad,
        }));
    };

    // Generar comprobante del pedido en PDF.
    const generarPDFPedido = () => {
        if (!pedidoConfirmado || !direccionPedido || !metodoPagoPedido) {
            return;
        }

        const documento = new jsPDF();

        const colorPrincipal: [number, number, number] = [62, 66, 52];
        const colorSecundario: [number, number, number] = [107, 112, 92];

        const pedido = pedidoConfirmado.pedido;
        const pago = pedidoConfirmado.pago;
        const direccion = direccionPedido;

        // Encabezado.
        documento.setTextColor(...colorPrincipal);
        documento.setFont("helvetica", "bold");
        documento.setFontSize(22);
        documento.text("eNova Home", 14, 20);

        documento.setFontSize(10);
        documento.setFont("helvetica", "normal");
        documento.text("COMPROBANTE DE PEDIDO", 14, 27);

        documento.setDrawColor(...colorSecundario);
        documento.line(14, 32, 196, 32);

        // Información del pedido.
        documento.setFont("helvetica", "bold");
        documento.setFontSize(11);
        documento.text("Información del pedido", 14, 42);

        documento.setFont("helvetica", "normal");
        documento.setFontSize(9);

        documento.text(`Número de pedido: ${pedido.numero_pedido}`, 14, 50);
        documento.text(
            `Fecha: ${new Date(pedido.fecha_pedido).toLocaleString("es-MX")}`,
            14,
            56
        );
        documento.text(`Estado: ${pedido.estado}`, 14, 62);

        // Dirección de entrega.
        documento.setFont("helvetica", "bold");
        documento.setFontSize(11);
        documento.text("Dirección de entrega", 14, 74);

        documento.setFont("helvetica", "normal");
        documento.setFontSize(9);

        const lineasDireccion = [
            `Receptor: ${direccion.nombre_receptor}`,
            `Teléfono: ${direccion.telefono}`,
            `Calle: ${direccion.calle} #${direccion.numero_exterior}`,
            direccion.numero_interior
                ? `Interior: ${direccion.numero_interior}`
                : "",
            `Colonia: ${direccion.colonia}`,
            `Código postal: ${direccion.codigo_postal}`,
            `Municipio: ${direccion.municipio}`,
            `Estado: ${direccion.estado}`,
            `País: ${direccion.pais}`,
        ].filter(Boolean);

        let posicionY = 82;

        lineasDireccion.forEach((linea) => {
            documento.text(linea, 14, posicionY);
            posicionY += 6;
        });

        // Método de pago.
        posicionY += 4;

        documento.setFont("helvetica", "bold");
        documento.setFontSize(11);
        documento.text("Información del pago", 14, posicionY);

        posicionY += 8;

        documento.setFont("helvetica", "normal");
        documento.setFontSize(9);

        documento.text(`Método: ${metodoPagoPedido.nombre}`, 14, posicionY);
        documento.text(`Estado del pago: ${pago.estado}`, 14, posicionY + 6);

        // Tabla de productos.
        autoTable(documento, {
            startY: posicionY + 13,
            head: [["Producto", "SKU", "Cantidad", "Precio unitario", "Importe"]],
            body: pedidoConfirmado.detalles.map((item) => [
                item.nombre,
                item.sku,
                String(item.cantidad),
                `$${item.precioUnitario.toFixed(2)}`,
                `$${item.subtotal.toFixed(2)}`,
            ]),
            theme: "grid",
            headStyles: {
                fillColor: colorPrincipal,
                textColor: [255, 255, 255],
                fontSize: 8,
            },
            styles: {
                fontSize: 8,
                cellPadding: 3,
            },
        });

        // Resumen financiero.
        const posicionResumen =
            (documento as jsPDF & {
                lastAutoTable: { finalY: number };
            }).lastAutoTable.finalY + 12;

        documento.setFont("helvetica", "normal");
        documento.setFontSize(10);

        documento.text(
            `Subtotal: $${Number(pedido.subtotal).toFixed(2)}`,
            140,
            posicionResumen
        );

        documento.text(
            `Descuento: $${Number(pedido.descuento).toFixed(2)}`,
            140,
            posicionResumen + 7
        );

        documento.text(
            `Envío: $${Number(pedido.costo_envio).toFixed(2)}`,
            140,
            posicionResumen + 14
        );

        documento.setFont("helvetica", "bold");
        documento.setFontSize(12);

        documento.text(
            `TOTAL: $${Number(pedido.total).toFixed(2)}`,
            140,
            posicionResumen + 25
        );

        // Pie de página.
        const paginas = documento.getNumberOfPages();

        for (let pagina = 1; pagina <= paginas; pagina++) {
            documento.setPage(pagina);

            documento.setFont("helvetica", "normal");
            documento.setFontSize(8);
            documento.setTextColor(120, 120, 120);

            documento.text(
                "Gracias por tu compra. eNova Home.",
                105,
                285,
                { align: "center" }
            );
        }

        documento.save(`${pedido.numero_pedido}.pdf`);
    };

    // Finalizar pedido y enviarlo al backend.
    const finalizarPedido = async () => {
        setErrorCheckout("");

        if (direccionSeleccionada === null) {
            setErrorCheckout("Selecciona una dirección de entrega.");
            return;
        }

        if (metodoPagoSeleccionado === null) {
            setErrorCheckout("Selecciona un método de pago.");
            return;
        }

        if (items.length === 0) {
            setErrorCheckout("El carrito está vacío.");
            return;
        }

        setFinalizandoPedido(true);

        try {
            const respuesta = await fetch(`${API_URL}/checkout/pedidos`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_direccion: direccionSeleccionada,
                    id_metodo_pago: metodoPagoSeleccionado,
                    items: obtenerItemsCheckout(),
                }),
            });

            const datos: RespuestaCheckout = await respuesta.json();

            if (!respuesta.ok || !datos.success) {
                throw new Error(
                    datos.response || "No fue posible finalizar el pedido."
                );
            }

            setDireccionPedido(
                direcciones.find(
                    (direccion) => direccion.id_direccion === direccionSeleccionada
                ) ?? null
            );

            setMetodoPagoPedido(
                metodosPago.find(
                    (metodo) => metodo.id_metodo_pago === metodoPagoSeleccionado
                ) ?? null
            );

            setPedidoConfirmado(datos.data);
            setMostrarModalPedido(true);
            vaciarCarrito();

        } catch (error) {
            setErrorCheckout(
                error instanceof Error
                    ? error.message
                    : "Ocurrió un error al finalizar el pedido."
            );
        } finally {
            setFinalizandoPedido(false);
        }
    };

    useEffect(() => {
        const obtenerDirecciones = async () => {
            try {
                const respuesta = await fetch(
                    `${API_URL}/clientes/mis-direcciones`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const datos: RespuestaDirecciones = await respuesta.json();

                if (!respuesta.ok || !datos.success) {
                    throw new Error(
                        datos.response || "No fue posible obtener las direcciones"
                    );
                }

                setDirecciones(datos.direcciones);

                const direccionPrincipal = datos.direcciones.find(
                    (direccion) => direccion.principal
                );

                if (direccionPrincipal) {
                    setDireccionSeleccionada(
                        direccionPrincipal.id_direccion
                    );
                } else if (datos.direcciones.length > 0) {
                    setDireccionSeleccionada(
                        datos.direcciones[0].id_direccion
                    );
                }

            } catch (error) {
                console.error("Error al obtener las direcciones:", error);

                setErrorDirecciones(
                    error instanceof Error
                        ? error.message
                        : "Error al cargar las direcciones"
                );
            } finally {
                setCargandoDirecciones(false);
            }
        };

        obtenerDirecciones();
    }, []);

    useEffect(() => {
        const obtenerMetodosPago = async () => {
            try {
                const respuesta = await fetch(
                    `${API_URL}/metodos-pago`,
                    {
                        method: "GET",
                    }
                );

                const datos: RespuestaMetodosPago = await respuesta.json();

                if (!respuesta.ok || !datos.success) {
                    throw new Error(
                        datos.response || "No fue posible obtener los métodos de pago"
                    );
                }

                /*const metodosDisponibles = datos.metodosPago.filter(
                    (metodo) =>
                        metodo.nombre === "Contra entrega" ||
                        metodo.nombre === "Transferencia Bancaria"
                );
                setMetodosPago(metodosDisponibles);*/
                setMetodosPago(datos.metodosPago);

            } catch (error) {
                console.error("Error al obtener los métodos de pago:", error);

                setErrorMetodosPago(
                    error instanceof Error
                        ? error.message
                        : "Error al cargar los métodos de pago"
                );
            } finally {
                setCargandoMetodosPago(false);
            }
        };

        obtenerMetodosPago();
    }, []);

    useEffect(() => {
        if (direcciones.length >= 3) {
            setMostrarFormulario(false);
        }
    }, [direcciones.length]);

    const actualizarCampo = (
        campo: keyof NuevaDireccion,
        valor: string | boolean
    ) => {
        setNuevaDireccion((anterior) => ({
            ...anterior,
            [campo]: valor,
        }));
    };

    const guardarDireccion = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setErrorFormulario("");
        setMensajeExito("");

        setGuardandoDireccion(true);

        try {
            const respuesta = await fetch(
                `${API_URL}/clientes/mis-direcciones/checkout`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(nuevaDireccion),
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.success) {
                throw new Error(
                    datos.response || "No fue posible registrar la dirección"
                );
            }

            const direccionCreada: Direccion = datos.direccion;

            setDirecciones((anteriores) => {
                if (direccionCreada.principal) {
                    return [
                        ...anteriores.map((direccion) => ({
                            ...direccion,
                            principal: false,
                        })),
                        direccionCreada,
                    ];
                }

                return [...anteriores, direccionCreada];
            });

            setDireccionSeleccionada(direccionCreada.id_direccion);

            setNuevaDireccion(formularioInicial);
            setMostrarFormulario(false);
            setMensajeExito("Dirección registrada correctamente.");

        } catch (error) {
            console.error("Error al registrar la dirección:", error);

            setErrorFormulario(
                error instanceof Error
                    ? error.message
                    : "Error al registrar la dirección"
            );
        } finally {
            setGuardandoDireccion(false);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-6 pt-32 pb-10">

            <h1 className="text-3xl font-semibold text-[#3E4234] mb-8">
                Finalizar pedido
            </h1>

            <section>
                <h2 className="text-xl font-semibold text-[#3E4234] mb-4">
                    Dirección de entrega
                </h2>

                {cargandoDirecciones ? (
                    <p>Cargando direcciones...</p>
                ) : errorDirecciones ? (
                    <p className="text-red-600">{errorDirecciones}</p>
                ) : direcciones.length === 0 ? (
                    <p>No tienes direcciones registradas.</p>
                ) : (
                    <div className="space-y-4">
                        {direcciones.map((direccion) => (
                            <label
                                key={direccion.id_direccion}
                                className="flex gap-3 p-4 border border-gray-300 rounded-md cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="direccion"
                                    value={direccion.id_direccion}
                                    checked={
                                        direccionSeleccionada ===
                                        direccion.id_direccion
                                    }
                                    onChange={() =>
                                        setDireccionSeleccionada(
                                            direccion.id_direccion
                                        )
                                    }
                                    className="mt-1"
                                />

                                <div>
                                    <p className="font-semibold text-[#3E4234]">
                                        {direccion.nombre_receptor}
                                        {direccion.principal && (
                                            <span className="ml-2 text-sm font-normal">
                                                (Principal)
                                            </span>
                                        )}
                                    </p>

                                    <p>
                                        {direccion.calle} #{direccion.numero_exterior}
                                    </p>

                                    {direccion.numero_interior && (
                                        <p>Interior: {direccion.numero_interior}</p>
                                    )}

                                    <p>
                                        {direccion.colonia}, C.P. {direccion.codigo_postal}
                                    </p>

                                    <p>
                                        {direccion.municipio}, {direccion.estado}
                                    </p>

                                    <p>{direccion.pais}</p>
                                    <p>Teléfono: {direccion.telefono}</p>

                                    {direccion.referencias && (
                                        <p>Referencias: {direccion.referencias}</p>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                )}
                {direcciones.length < 3 && (
                    <button
                        type="button"
                        onClick={() => {
                            setMostrarFormulario(!mostrarFormulario);
                            setErrorFormulario("");
                            setMensajeExito("");
                        }}
                        className="mt-5 text-[#6B705C] font-semibold hover:text-[#3E4234] transition cursor-pointer"
                    >
                        {mostrarFormulario
                            ? "Cancelar"
                            : "+ Agregar nueva dirección"}
                    </button>
                )}

                {mensajeExito && (
                    <p className="mt-3 text-green-700">
                        {mensajeExito}
                    </p>
                )}

                {mostrarFormulario && (
                    <form
                        onSubmit={guardarDireccion}
                        className="mt-6 border border-gray-300 rounded-md p-6 space-y-5"
                    >
                        <h3 className="text-lg font-semibold text-[#3E4234]">
                            Nueva dirección
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 font-medium">
                                    Nombre del receptor *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevaDireccion.nombreReceptor}
                                    onChange={(e) =>
                                        actualizarCampo("nombreReceptor", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={nuevaDireccion.telefono}
                                    onChange={(e) =>
                                        actualizarCampo("telefono", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Calle *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevaDireccion.calle}
                                    onChange={(e) =>
                                        actualizarCampo("calle", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Número exterior *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={nuevaDireccion.numeroExterior}
                                        onChange={(e) =>
                                            actualizarCampo("numeroExterior", e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium">
                                        Número interior
                                    </label>
                                    <input
                                        type="text"
                                        value={nuevaDireccion.numeroInterior}
                                        onChange={(e) =>
                                            actualizarCampo("numeroInterior", e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Colonia *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevaDireccion.colonia}
                                    onChange={(e) =>
                                        actualizarCampo("colonia", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Código postal *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevaDireccion.codigoPostal}
                                    onChange={(e) =>
                                        actualizarCampo("codigoPostal", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Municipio o alcaldía *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevaDireccion.municipio}
                                    onChange={(e) =>
                                        actualizarCampo("municipio", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Estado *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevaDireccion.estado}
                                    onChange={(e) =>
                                        actualizarCampo("estado", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    País *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={nuevaDireccion.pais}
                                    onChange={(e) =>
                                        actualizarCampo("pais", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Referencias
                                </label>
                                <input
                                    type="text"
                                    value={nuevaDireccion.referencias}
                                    onChange={(e) =>
                                        actualizarCampo("referencias", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={nuevaDireccion.principal}
                                onChange={(e) =>
                                    actualizarCampo("principal", e.target.checked)
                                }
                            />
                            Establecer como dirección principal
                        </label>

                        {errorFormulario && (
                            <p className="text-red-600">
                                {errorFormulario}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={guardandoDireccion}
                            className="px-6 py-3 bg-[#6B705C] text-white rounded-md hover:bg-[#3E4234] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {guardandoDireccion
                                ? "Guardando..."
                                : "Guardar dirección"}
                        </button>

                    </form>
                )}
            </section>

            <section className="mt-10">
                <h2 className="text-xl font-semibold text-[#3E4234] mb-4">
                    Método de pago
                </h2>

                {cargandoMetodosPago ? (
                    <p>Cargando métodos de pago...</p>
                ) : errorMetodosPago ? (
                    <p className="text-red-600">{errorMetodosPago}</p>
                ) : metodosPago.length === 0 ? (
                    <p>No hay métodos de pago disponibles.</p>
                ) : (
                    <div className="space-y-4">
                        {metodosPago.map((metodo) => (
                            <label
                                key={metodo.id_metodo_pago}
                                className="flex gap-3 p-4 border border-gray-300 rounded-md cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="metodoPago"
                                    value={metodo.id_metodo_pago}
                                    checked={
                                        metodoPagoSeleccionado ===
                                        metodo.id_metodo_pago
                                    }
                                    onChange={() =>
                                        setMetodoPagoSeleccionado(
                                            metodo.id_metodo_pago
                                        )
                                    }
                                    className="mt-1"
                                />

                                <div>
                                    <p className="font-semibold text-[#3E4234]">
                                        {metodo.nombre}
                                    </p>

                                    <p className="text-gray-600">
                                        {metodo.descripcion}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </section>

            {/* Resumen del pedido */}
            <section className="mt-10 border border-gray-300 rounded-md p-6">
                <h2 className="text-xl font-semibold text-[#3E4234] mb-6">
                    Resumen del pedido
                </h2>

                {items.length === 0 ? (
                    <p className="text-gray-600">
                        Tu carrito está vacío.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.idVariante}
                                className="flex justify-between items-center gap-4 border-b border-gray-200 pb-4"
                            >
                                <div>
                                    <p className="font-semibold text-[#3E4234]">
                                        {item.nombre}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        Cantidad: {item.cantidad}
                                    </p>
                                </div>

                                <p className="font-medium text-[#3E4234]">
                                    ${(item.precio * item.cantidad).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6 space-y-3">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Descuento</span>
                        <span>$0.00</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Envío</span>
                        <span>Gratis</span>
                    </div>

                    <div className="flex justify-between border-t border-gray-300 pt-4 text-lg font-semibold text-[#3E4234]">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

            </section>

            {/* Mensajes de checkout */}
            {errorCheckout && (
                <p className="mt-5 text-red-600">
                    {errorCheckout}
                </p>
            )}

            {pedidoConfirmado ? (
                <div className="mt-8 flex flex-wrap gap-4">
                    <button
                        type="button"
                        onClick={() => setMostrarModalPedido(true)}
                        className="px-8 py-3 bg-[#6B705C] text-white rounded-md hover:bg-[#3E4234] transition cursor-pointer"
                    >
                        Ver comprobante del pedido
                    </button>

                    <button
                        type="button"
                        onClick={() => window.location.assign("/")}
                        className="px-8 py-3 border border-[#6B705C] text-[#3E4234] rounded-md hover:bg-gray-100 transition cursor-pointer"
                    >
                        Volver al inicio
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={finalizarPedido}
                    disabled={
                        finalizandoPedido ||
                        items.length === 0 ||
                        cargandoDirecciones ||
                        cargandoMetodosPago ||
                        direcciones.length === 0 ||
                        metodosPago.length === 0
                    }
                    className="mt-8 px-8 py-3 bg-[#6B705C] text-white rounded-md hover:bg-[#3E4234] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {finalizandoPedido
                        ? "Procesando pedido..."
                        : "Confirmar pedido"}
                </button>
            )}

            {/* Modal de confirmación del pedido */}
            {mostrarModalPedido && pedidoConfirmado && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl p-6 md:p-8">

                        <button
                            type="button"
                            onClick={() => setMostrarModalPedido(false)}
                            className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-[#3E4234] cursor-pointer"
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>

                        <div className="text-center mb-6">
                            <div className="text-5xl text-green-600 mb-3">
                                ✓
                            </div>

                            <h2 className="text-2xl font-semibold text-[#3E4234]">
                                ¡Pedido generado correctamente!
                            </h2>

                            <p className="text-gray-600 mt-2">
                                Gracias por comprar en eNova Home.
                            </p>

                            <p className="text-sm text-gray-500 mt-4">
                                Número de pedido
                            </p>

                            <p className="text-xl font-bold text-[#3E4234]">
                                {pedidoConfirmado.pedido.numero_pedido}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-5 space-y-5">

                            {/* Datos del pedido */}
                            <section>
                                <h3 className="font-semibold text-[#3E4234] mb-2">
                                    Información del pedido
                                </h3>

                                <p>
                                    Fecha:{" "}
                                    {new Date(
                                        pedidoConfirmado.pedido.fecha_pedido
                                    ).toLocaleString("es-MX")}
                                </p>

                                <p>
                                    Estado: {pedidoConfirmado.pedido.estado}
                                </p>
                            </section>

                            {/* Dirección de entrega */}
                            {direccionPedido && (
                                <section>
                                    <h3 className="font-semibold text-[#3E4234] mb-2">
                                        Dirección de entrega
                                    </h3>

                                    <p>{direccionPedido.nombre_receptor}</p>
                                    <p>Teléfono: {direccionPedido.telefono}</p>
                                    <p>
                                        {direccionPedido.calle} #{direccionPedido.numero_exterior}
                                        {direccionPedido.numero_interior
                                            ? `, Interior ${direccionPedido.numero_interior}`
                                            : ""}
                                    </p>
                                    <p>
                                        {direccionPedido.colonia}, C.P.{" "}
                                        {direccionPedido.codigo_postal}
                                    </p>
                                    <p>
                                        {direccionPedido.municipio}, {direccionPedido.estado}
                                    </p>
                                    <p>{direccionPedido.pais}</p>
                                </section>
                            )}

                            {/* Método de pago */}
                            <section>
                                <h3 className="font-semibold text-[#3E4234] mb-2">
                                    Método de pago
                                </h3>

                                <p>
                                    {metodoPagoPedido?.nombre ?? "No disponible"}
                                </p>

                                <p>
                                    Estado del pago: {pedidoConfirmado.pago.estado}
                                </p>
                            </section>

                            {/* Productos */}
                            <section>
                                <h3 className="font-semibold text-[#3E4234] mb-3">
                                    Productos del pedido
                                </h3>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-300 text-left">
                                                <th className="py-2">Producto</th>
                                                <th className="py-2">SKU</th>
                                                <th className="py-2 text-center">Cant.</th>
                                                <th className="py-2 text-right">Importe</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {pedidoConfirmado.detalles.map((item) => (
                                                <tr
                                                    key={item.idVariante}
                                                    className="border-b border-gray-200"
                                                >
                                                    <td className="py-3 pr-2">
                                                        {item.nombre}
                                                    </td>

                                                    <td className="py-3 pr-2">
                                                        {item.sku}
                                                    </td>

                                                    <td className="py-3 text-center">
                                                        {item.cantidad}
                                                    </td>

                                                    <td className="py-3 text-right whitespace-nowrap">
                                                        ${item.subtotal.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Resumen financiero */}
                            <section className="border-t border-gray-300 pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        ${Number(pedidoConfirmado.pedido.subtotal).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Descuento</span>
                                    <span>
                                        ${Number(pedidoConfirmado.pedido.descuento).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span>
                                        ${Number(pedidoConfirmado.pedido.costo_envio).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-lg font-bold text-[#3E4234] border-t border-gray-300 pt-3">
                                    <span>Total</span>
                                    <span>
                                        ${Number(pedidoConfirmado.pedido.total).toFixed(2)}
                                    </span>
                                </div>
                            </section>

                            <p className="text-sm text-amber-700 bg-amber-50 rounded-md p-3">
                                Tu pedido está registrado. El pago permanece pendiente de confirmación.
                            </p>

                            {/* Acciones */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={generarPDFPedido}
                                    className="flex-1 px-5 py-3 bg-[#6B705C] text-white rounded-md hover:bg-[#3E4234] transition cursor-pointer"
                                >
                                    Descargar comprobante PDF
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMostrarModalPedido(false)}
                                    className="flex-1 px-5 py-3 border border-[#6B705C] text-[#3E4234] rounded-md hover:bg-gray-100 transition cursor-pointer"
                                >
                                    Cerrar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}
