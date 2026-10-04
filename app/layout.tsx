import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import ConditionalNavBar from "./components/ConditionalNavBar";
import { CartProvider } from "./context/CartContext";
import LoaderProvider from "./components/LoaderProvider";
import { AuthProvider } from "./context/AuthContext";
import { Suspense } from "react";
import ConditionalLayout from "./components/ConditionalLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "eNova Home - Inicio",
    template: "eNova Home - %s",
  },
  description: "Sitio oficial eNova Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <LoaderProvider />
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              {/* Header */}
              <ConditionalNavBar />
            </Suspense>

            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}