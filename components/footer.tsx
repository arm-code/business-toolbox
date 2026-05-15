import Link from "next/link"
import { Box, Briefcase } from "lucide-react"

const footerLinks = {
    product: [
        { href: "/tools", label: "Herramientas" },
        { href: "/tools/pos", label: "Punto de Venta" },
        { href: "/tools/quotes", label: "Generador de Cotizaciones" },
        { href: "/tools/expenses", label: "Control de Gastos" },
        { href: "/pricing", label: "Precios" },
    ],
    resources: [
        { href: "#", label: "Centro de Ayuda" },
        { href: "#", label: "Blog" },
        { href: "#", label: "Guías" },
        { href: "#", label: "API" },
    ],
    company: [
        { href: "https://www.arm-solutions.com.mx/", label: "Acerca de" },
        { href: "#", label: "Contacto" },
        { href: "#", label: "Privacidad" },
        { href: "#", label: "Términos" },
    ],
}

export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                <Box className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-semibold">Business Toolbox</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Desarrollado por <Link className="underline text-primary" href="https://www.arm-solutions.com.mx/">ARM Solutions</Link>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Herramientas simples y asequibles diseñadas para pequeños negocios, tiendas locales y emprendedores.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Producto</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Recursos</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Empresa</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} ARM Solutions. Todos los derechos reservados.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Hecho con <span className="text-red-500">💜</span> para pequeños negocios
                    </p>
                </div>
            </div>
        </footer>
    )
}
