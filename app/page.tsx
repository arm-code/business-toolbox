import Link from "next/link";
import { ArrowRight, Box, Calculator, CreditCard, FileText, Receipt, Shield, ShoppingCart, Smartphone, Wallet, Zap } from "lucide-react";
import { Header } from "@/components/header";

const tools = [
  {
    title: "Point of Sale",
    description: "Register sales quickly, manage products, print tickets, and track your daily cash flow.",
    icon: ShoppingCart,
    href: "/tools/pos",
    badge: "Free" as const,
    featured: true,
  },
  {
    title: "Sales Note Generator",
    description: "Create quick sale notes and invoices from your phone or computer in seconds.",
    icon: Receipt,
    href: "/tools/sales-note",
    badge: "Free" as const,
  },
  {
    title: "Quote Generator",
    description: "Create professional quotations for your customers with your business branding.",
    icon: FileText,
    href: "/tools/quotes",
    badge: "Free" as const,
  },
  {
    title: "Financial Calculator",
    description: "Calculate profit margins, taxes, break-even points, and installment payments.",
    icon: Calculator,
    href: "/tools/calculator",
    badge: "Free" as const,
  },
  {
    title: "Expense Control",
    description: "Track your daily expenses simply and stay on top of your business spending.",
    icon: Wallet,
    href: "/tools/expenses",
    badge: "Premium" as const,
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Fast & Simple",
    description: "Complete your most common tasks in just 1-2 taps. No training required.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Use on your phone, tablet, or computer. Your data syncs automatically.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your business data is protected with enterprise-grade security.",
  },
]

const testimonials = [
  {
    quote: "Finally, software that understands small business. I started selling more the same day I installed it.",
    author: "Maria Garcia",
    role: "Corner Store Owner",
    rating: 5,
  },
  {
    quote: "The quote generator saved me hours every week. My customers love the professional look.",
    author: "Carlos Rodriguez",
    role: "Plumber",
    rating: 5,
  },
  {
    quote: "I can track everything from my phone while I&apos;m at the food stand. It just works.",
    author: "Ana Mendez",
    role: "Food Vendor",
    rating: 5,
  },
]

const stats = [
  { value: "10,000+", label: "Businesses" },
  { value: "500K+", label: "Sales Processed" },
  { value: "4.9/5", label: "User Rating" },
]


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Box className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl tracking-tighter">Business Toolbox</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/catalog">
            Herramientas
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Precios
          </Link>
        </nav>
      </header>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Todo lo que tu pequeño negocio necesita para <span className="text-primary">Crecer </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Vende más rápido, ahorra tiempo y mantente organizado con herramientas de negocio sencillas, diseñadas para tiendas locales, puestos de comida y emprendedores como tú.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/catalog"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Empezar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Ventas Rápidas</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Genera notas de venta en segundos desde tu móvil o PC.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Cotizaciones</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Envía presupuestos profesionales de manera inmediata.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl bg-background shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Sin Instalación</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Accede desde cualquier lugar como una aplicación instalada (PWA).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 Business Toolbox. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
