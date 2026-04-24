import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Toaster } from 'sonner';



const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ARM Solutions - Herramientas de Negocio Sencillas para Pequeñas Empresas',
  description: 'Tu caja de herramientas para el negocio: Punto de Venta, facturas, cotizaciones, control de gastos y más. Herramientas sencillas y accesibles diseñadas para pequeñas empresas, tiendas locales y emprendedores.',
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}
) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className="bg-background"
    >
      <body
        className="font-sans antialiased"
      >
        <Toaster richColors closeButton position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
