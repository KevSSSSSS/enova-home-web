import Image from "next/image";

const NavBar = () => {
  return (
    <header className="px-6 py-6 flex items-start shadow-xl w-full bg-[#E7E7E5] shadow-[0_15px_35px_rgba(0,0,0,0.8)] relative z-50">
      {/* Logo */}
      <Image
        src="/Images/Logo-eNovaHome-.png"
        alt="Logo eNova Home"
        width={150}
        height={50}
        priority
        className="flex-shrink-0"
      />

      {/* Navegación más abajo */}
      <nav className="ml-auto flex gap-6 text-sm font-[var(--font-montserrat)] items-center mt-20">
        <a href="#" className="hover:text-[#6B705C]">Mesa & Comedor</a>
        <a href="#" className="hover:text-[#6B705C]">Cocina</a>
        <a href="#" className="hover:text-[#6B705C]">Baño</a>
        <a href="#" className="hover:text-[#6B705C]">Recámara</a>
        <a href="#" className="hover:text-[#6B705C]">Catálogo</a>
        <a href="#" className="hover:text-[#6B705C]">Nosotros</a>
        <a href="#" className="hover:text-[#6B705C]">Contacto</a>

        {/* Icono de búsqueda */}
        <a href=""><img src="/Images/search-icon.png" alt="Buscar" className="h-5 w-auto" /></a>

        {/* Icono de carrito */}
        <a href=""><img src="/Images/cart-icon.png" alt="Carrito" className="h-6 w-auto" /></a>
      </nav>
    </header>
  );
};

export default NavBar;

