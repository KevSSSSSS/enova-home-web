import { productos } from "@/app/data/productos";
import ProductoDetalle from "@/app/components/ProductoDetalle";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductoPage({ params }: Props) {
    const { id } = await params;

    const producto = productos.find(
        (p) => p.id === Number(id)
    );

    if (!producto) {
        notFound();
    }

    return <ProductoDetalle producto={producto} />;
}