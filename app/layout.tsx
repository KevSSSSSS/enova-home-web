import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "eNova Home",
  description: "Sitio oficial eNova Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}