
import ProductoDetalle from "@/app/components/ProductoDetalle";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

interface ProductoAPI {
    id_producto: number;
    nombre: string;
    descripcion?: string | null;
    descripcion_corta?: string | null;
    subcategoria?: {
        nombre: string;
        categoria?: {
            nombre: string;
        };
    };
    especificaciones?: {
        nombre: string;
        valor: string;
        orden: number;
    }[];
    imagenes?: {
        idImagen: number;
    }[];
    variantes?: {
        idVariante: number;
        sku: string;
        codigoBarras: string | null;
        precioNormal: number;
        precioOferta: number | null;
        activo: boolean;
        valores: {
            idValorVariante: number;
            valor: string;
            tipoVariante: {
                idTipoVariante: number;
                nombre: string;
            };
        }[];
    }[];
}

interface RespuestaAPI {
    success: boolean;
    producto?: ProductoAPI;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function ProductoPage({ params }: Props) {
    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id) || !API_URL) {
        notFound();
    }

    try {
        const respuesta = await fetch(
            `${API_URL}/catalogo/productos/${id}/completo`,
            {
                cache: "no-store",
            }
        );

        if (!respuesta.ok) {
            notFound();
        }

        const data: RespuestaAPI = await respuesta.json();

        if (!data.success || !data.producto) {
            notFound();
        }

        const productoAPI = data.producto;

        const imagenes = (productoAPI.imagenes ?? []).map(
            (imagen) => `${API_URL}/imagenes-productos/${imagen.idImagen}`
        );

        const variantePrincipal = (productoAPI.variantes ?? []).find(
            (variante) => variante.activo
        );

        const precio = variantePrincipal
            ? Number(
                variantePrincipal.precioOferta ??
                variantePrincipal.precioNormal
            )
            : 0;

        const producto = {
            id: productoAPI.id_producto,
            nombre: productoAPI.nombre,
            categoria: productoAPI.subcategoria?.nombre ?? "",
            precio,
            imagenPrincipal: imagenes[0] ?? "",
            imagenes,
            descripcion:
                productoAPI.descripcion ??
                productoAPI.descripcion_corta ??
                "",
            especificaciones: (productoAPI.especificaciones ?? [])
                .sort((a, b) => a.orden - b.orden)
                .map((especificacion) => ({
                    nombre: especificacion.nombre,
                    valor: especificacion.valor,
                })),
            variantes: productoAPI.variantes ?? [],
        };

        return <ProductoDetalle producto={producto} />;

    } catch (error) {
        console.error("Error al obtener el producto:", error);
        notFound();
    }
}
