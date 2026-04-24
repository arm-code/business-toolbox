import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"

import {
  ShoppingCart,
  FileText,
  Calculator,
  Receipt,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Smartphone,
} from "lucide-react"
import { ToolCard } from "@/components/tool-card"
import { Footer } from "@/components/footer"

const tools = [
  {
    title: "Punto de Venta",
    description: "Registra ventas rápidamente, gestiona productos, imprime tickets y lleva el control de tu flujo de caja diario.",
    icon: ShoppingCart,
    href: "/tools/pos",
    badge: "Free" as const,
    featured: true,
  },
  {
    title: "Generador de Notas de Venta",
    description: "Crea notas de venta rápidas y facturas desde tu teléfono o computadora en segundos.",
    icon: Receipt,
    href: "/tools/sales-note",
    badge: "Free" as const,
  },
  {
    title: "Generador de Cotizaciones",
    description: "Crea cotizaciones profesionales para tus clientes con la marca de tu negocio.",
    icon: FileText,
    href: "/tools/quotes",
    badge: "Free" as const,
  },
  {
    title: "Calculadora Financiera",
    description: "Calcula márgenes de ganancia, impuestos, puntos de equilibrio y pagos a plazos.",
    icon: Calculator,
    href: "/tools/calculator",
    badge: "Free" as const,
  },
  {
    title: "Control de Gastos",
    description: "Registra tus gastos diarios de forma sencilla y mantén el control de los gastos de tu negocio.",
    icon: Wallet,
    href: "/tools/expenses",
    badge: "Premium" as const,
  },
]

const benefits = [
  {
    icon: Zap,
    title: "Rápido y Sencillo",
    description: "Realiza tus tareas más comunes en solo 1-2 toques. No requiere entrenamiento.",
  },
  {
    icon: Smartphone,
    title: "Funciona en todos lados",
    description: "Úsalo en tu teléfono, tablet o computadora. Tus datos se sincronizan automáticamente.",
  },
  {
    icon: Shield,
    title: "Seguro y Confiable",
    description: "Tus datos comerciales están protegidos con seguridad de nivel empresarial.",
  },
]

const testimonials = [
  {
    quote: "Finalmente, software que entiende el pequeño negocio. Empecé a vender más el mismo día que lo instalé.",
    author: "Maria Garcia",
    role: "Dueña de tienda",
    rating: 5,
  },
  {
    quote: "El generador de cotizaciones me ahorró horas cada semana. A mis clientes les encanta el aspecto profesional.",
    author: "Carlos Rodriguez",
    role: "Fontanero",
    rating: 5,
  },
  {
    quote: "Puedo rastrear todo desde mi teléfono mientras estoy en el puesto de comida. Simplemente funciona.",
    author: "Ana Mendez",
    role: "Vendedora de comida",
    rating: 5,
  },
]

const stats = [
  { value: "10,000+", label: "Negocios" },
  { value: "500K+", label: "Ventas procesadas" },
  { value: "4.9/5", label: "Valoración de usuarios" },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                Herramientas sencillas para negocios reales
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Todo lo que tu pequeño negocio necesita para{" "}
                <span className="text-primary">crecer</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed md:text-xl">
                Vende más rápido, ahorra tiempo y mantente organizado con herramientas comerciales simples
                diseñadas para tiendas locales, puestos de comida y emprendedores como tú.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                  <Link href="/tools">
                    Pruébalo gratis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/register">Crear cuenta gratis</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Sin tarjeta de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Plan gratuito siempre
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Configuración en minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Usa desde tu celular
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Tu Caja de Herramientas para el Negocio
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Todo lo que necesitas para dirigir tu negocio, <span className="font-semibold">todo en un solo lugar</span>.
                Empieza gratis y mejora cuando necesites más.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.title} {...tool} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/tools" className="gap-2">
                  Ver todas las herramientas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-y border-border bg-card py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Built for Busy Business Owners
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We understand you have limited time and patience for complicated software.
                That&apos;s why we made everything ridiculously simple.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="border-0 bg-background shadow-none">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Loved by Small Business Owners
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Join thousands of entrepreneurs who transformed their daily operations.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="mb-6 text-foreground leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-primary/5 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Ready to Simplify Your Business?
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Start using our free tools today. No credit card required, no complicated setup.
                Just simple tools that help you sell more and stress less.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                  <Link href="/register">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/tools">Explore Tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
