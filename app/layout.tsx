import type { Metadata } from "next";
import "./globals.css"; // Asegúrate de que Tailwind esté configurado aquí

export const metadata: Metadata = {
  title: "Ruleta Personalizable",
  description: "Aplicación de ruleta moderna creada con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50 text-gray-900">
        {/* El children aquí será lo que pongas en page.tsx */}
        {children}
      </body>
    </html>
  );
}