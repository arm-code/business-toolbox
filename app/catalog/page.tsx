import Link from "next/link";
import { Box, CreditCard, Receipt, FileStack, Calculator, ArrowLeft } from "lucide-react";

const tools = [
    {
        id: "sale-note",
        name: "Nota de Venta",
        description: "Crea notas de venta rápidas y profesionales para tus clientes.",
        icon: Receipt,
        color: "text-purple-600",
        bg: "bg-purple-100",
        href: "/tools/sale-note",
    },
    {
        id: "invoice-draft",
        name: "Borrador de Factura",
        description: "Prepara los datos para tus facturas antes de emitirlas oficialmente.",
        icon: FileStack,
        color: "text-blue-600",
        bg: "bg-blue-100",
        href: "#",
        disabled: true,
    },
    {
        id: "quote",
        name: "Cotización",
        description: "Genera presupuestos detallados en formato PDF.",
        icon: Calculator,
        color: "text-green-600",
        bg: "bg-green-100",
        href: "#",
        disabled: true,
    },
];

export default function Catalog() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background z-10">
                <Link className="flex items-center justify-center" href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Volver</span>
                </Link>
                <div className="ml-auto flex items-center gap-2">
                    <Box className="h-5 w-5 text-primary" />
                    <span className="font-bold tracking-tighter">Business Toolbox</span>
                </div>
            </header>

            <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Catálogo de Herramientas</h1>
                        <p className="text-muted-foreground mt-2">Selecciona la herramienta que necesitas para tu negocio hoy.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => (
                            <Link
                                key={tool.id}
                                href={tool.href}
                                className={`group relative flex flex-col p-6 rounded-2xl border bg-card transition-all duration-200 ${tool.disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:border-primary/50"
                                    }`}
                            >
                                <div className={`p-3 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110 ${tool.bg}`}>
                                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                                <p className="text-muted-foreground text-sm flex-1">{tool.description}</p>
                                {tool.disabled && (
                                    <span className="mt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted w-fit px-2 py-1 rounded">
                                        Próximamente
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="py-6 border-t mt-auto">
                <div className="text-center text-xs text-muted-foreground">
                    © 2026 arm-solutions. Herramientas diseñadas para el crecimiento.
                </div>
            </footer>
        </div>
    );
}
