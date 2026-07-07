import CatalogoClient from "./CatalogoClient";

interface PageProps {
  searchParams: Promise<{
    categoria?: string;
  }>;
}

export default async function CatalogoPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  return (
    <CatalogoClient
      categoriaSeleccionada={params.categoria ?? "TODOS"}
      tieneCategoria={!!params.categoria}
    />
  );
}