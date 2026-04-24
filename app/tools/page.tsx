import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToolCard } from "@/components/tool-card"
import {
    ShoppingCart,
    FileText,
    Calculator,
    Receipt,
    Wallet,
    BarChart3,
    Users,
    Package,
} from "lucide-react"

const allTools = [
    {
        title: "Punto de Venta",
        description: "Registra ventas rápidamente, gestiona productos, imprime tickets y lleva el control de tu flujo de caja diario. La herramienta más completa para tus ventas diarias.",
        icon: ShoppingCart,
        href: "/tools/pos",
        badge: "Free" as const,
        featured: true,
    },
    {
        title: "Generador de Notas de Venta",
        description: "Crea notas de venta rápidas y facturas desde tu teléfono o computadora. Perfecta para transacciones sobre la marcha.",
        icon: Receipt,
        href: "/tools/sales-note",
        badge: "Free" as const,
    },
    {
        title: "Generador de Cotizaciones",
        description: "Crea cotizaciones profesionales para tus clientes. Añade el logo y los datos de tu negocio para una presentación elegante.",
        icon: FileText,
        href: "/tools/quotes",
        badge: "Free" as const,
    },
    {
        title: "Calculadora Financiera",
        description: "Calcula márgenes de ganancia, impuestos, puntos de equilibrio, pagos a plazos y estrategias de precios.",
        icon: Calculator,
        href: "/tools/calculator",
        badge: "Free" as const,
    },
    {
        title: "Control de Gastos",
        description: "Registra tus gastos diarios por categoría. Conoce exactamente a dónde va tu dinero e identifica oportunidades de ahorro.",
        icon: Wallet,
        href: "/tools/expenses",
        badge: "Premium" as const,
    },
    {
        title: "Reportes de Ventas",
        description: "Visualiza las tendencias de tus ventas, productos más vendidos e ingresos a lo largo del tiempo con gráficos sencillos.",
        icon: BarChart3,
        href: "/tools/reports",
        badge: "Premium" as const,
    },
    {
        title: "Directorio de Clientes",
        description: "Lleva un registro de tus clientes, sus compras e información de contacto en un solo lugar.",
        icon: Users,
        href: "/tools/customers",
        badge: "Premium" as const,
    },
    {
        title: "Gestión de Inventario",
        description: "Lleva un registro de tus niveles de stock, recibe alertas de bajo stock y conoce exactamente qué tienes en tu tienda.",
        icon: Package,
        href: "/tools/inventory",
        badge: "Premium" as const,
    },
]

export default function ToolsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                <section className="border-b border-border bg-card py-16 md:py-20">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                                Todas las herramientas disponibles
                            </h1>
                            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                                Todo lo que tu negocio necesita, organizado y listo para usar.
                                Empieza con herramientas gratuitas y mejora cuando necesites más.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-20">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold">Herramientas gratuitas</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Empieza a usar estas herramientas de inmediato, no necesitas cuenta</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {allTools.filter(t => t.badge === "Free").map((tool) => (
                                <ToolCard key={tool.title} {...tool} />
                            ))}
                        </div>

                        <div className="mb-8 mt-16">
                            <h2 className="text-xl font-semibold">Herramientas Premium</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Desbloquea estas potentes herramientas con una cuenta Premium</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {allTools.filter(t => t.badge === "Premium").map((tool) => (
                                <ToolCard key={tool.title} {...tool} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
